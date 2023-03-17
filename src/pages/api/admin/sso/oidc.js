import {
  addEnabledConnectionToOrg,
  createConnection,
  deleteConnection,
} from "@/lib/auth0-okta-utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

const createOIDCConnection = async (
  orgId,
  connectionName,
  displayName,
  discoveryURL,
  clientId,
  clientSecret,
  domain
) => {
  const connections_data = {
    strategy: "oidc",
    name: connectionName,
    display_name: displayName,
    show_as_button: true,
    options: {
      type: "back_channel",
      discovery_url: discoveryURL,
      client_id: clientId,
      client_secret: clientSecret,
      scopes: "openid profile email",
      domain_aliases: [domain],
    },
  };

  const connection = await createConnection(connections_data);
  return connection;
};

export default withApiAuthRequired(async function oidc(req, res) {
  const { user } = await getSession(req, res);

  if (req.method === "POST") {
    //add new SSO connection
    const connection = req.body;
    const connectionName = connection.name;
    const displayName = connection.display_name;
    const connectionStrategy = connection.strategy;
    const discoveryURL = connection.discovery_url;
    const clientId = connection.client_id;
    const clientSecret = connection.client_secret;
    const syncUsersProfile = connection.sync_users_profile;
    const domain = connection.domain;
    const autoMembership = connection.auto_membership.toLowerCase() === "true";

    // const clientSecret = "";
    if (connectionStrategy != "oidc") {
      return res.status(400).json({ msg: "Invalid connection type" });
    }

    if (
      connectionName == "" ||
      displayName == "" ||
      discoveryURL == "" ||
      clientId == "" ||
      clientSecret == "" ||
      syncUsersProfile == "" ||
      domain == ""
    ) {
      return res
        .status(400)
        .json({ msg: "Invalid body. All fields are required." });
    }
    try {
      const new_connection = await createOIDCConnection(
        user.org_id,
        connectionName,
        displayName,
        discoveryURL,
        clientId,
        clientSecret,
        domain
      );

      const enabledConn = await addEnabledConnectionToOrg(
        new_connection.id,
        user.org_id,
        autoMembership
      );

      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to create oidc connection for organization: ", error);

      if (error.statusCode == 400) {
        return res.status(400).json({
          msg: "Invalid payload. Server returned " + error.message,
        });
      }

      return res
        .status(500)
        .json({ msg: "Internal error. Server returned " + error.statusCode });
    }
  } else if (req.method === "PUT") {
    //update connection
  } else if (req.method === "DELETE") {
    //delete connection
    try {
      const connection = req.body;
      const connectionId = connection.connection_id;
      await deleteConnection(connectionId);
      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to delete oidc connection: ", error);

      return res
        .status(500)
        .json({ msg: "Internal error. Server returned " + error.statusCode });
    }
  } else if (req.method === "GET") {
    //fetch connections
  } else {
    //not supported
  }
});
