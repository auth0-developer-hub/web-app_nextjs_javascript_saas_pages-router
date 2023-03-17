import {
  addMemberRoles,
  addMembers,
  createOrganization,
  getAllConnections,
  getAllRoles,
  updateAppMetadata,
} from "@/lib/auth0-okta-utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function organization(req, res) {
  const { org_name } = req.query;

  if (!org_name) {
    return res
      .status(400)
      .json({ msg: "Organization name identifier is required." });
  }

  const db_connection_meta = {
    name: "Username-Password-Authentication",
    strategy: "auth0",
    per_page: 1,
    page: 0,
  };

  const social_connection_meta = {
    name: "google-oauth2",
    strategy: "google-oauth2",
    per_page: 1,
    page: 0,
  };

  try {
    //scope > read:connections
    const dbConnection = await getAllConnections(db_connection_meta);
    const socialConnection = await getAllConnections(social_connection_meta);

    //scope > read:roles
    const allRoles = await getAllRoles();

    const adminRole = await allRoles.filter(
      (obj) => obj.name == "Administrator"
    );

    const session = await getSession(req, res);
    const user_id = session.user.sub;

    const startDate = new Date();
    let endDate = new Date();
    endDate.setFullYear(startDate.getFullYear() + 1);

    if (!session.user.subscription) {
      return res.status(400).json({
        msg: "Cannot find a valid subscription plan for this user",
      });
    }

    //update subscription status
    const sub = session.user.subscription.split(";");
    const plan_name = sub[0];
    const end_date = new Date(sub[1]).toISOString();

    const subscription = plan_name
      .concat(";")
      .concat(end_date)
      .concat(";")
      .concat("active");

    const organization = {
      name: org_name,
      metadata: {
        subscription: subscription,
      },
      enabled_connections: [
        {
          connection_id: dbConnection[0].id,
          assign_membership_on_login: false,
        },
        {
          connection_id: socialConnection[0].id,
          assign_membership_on_login: false,
        },
      ],
    };

    const new_org = await createOrganization(organization);
    const org_id = new_org.id;

    await addMembers(org_id, [user_id]);

    await addMemberRoles(org_id, user_id, [adminRole[0].id]);

    const app_metadata = {
      subscription: subscription,
    };

    //update user metadata
    const user = await updateAppMetadata(user_id, app_metadata);

    return res.status(200).json(new_org);
  } catch (error) {
    console.log("Failed to create organization: ", error);

    if (error.statusCode == 400) {
      return res.status(400).json({
        msg: "Invalid organization name. It may contain lowercase alphabetical characters, numbers, underscores (_), and dashes (-). Can start with a number. Must be between 3 and 50 characters.",
      });
    }

    if (error.statusCode == 404) {
      return res.status(404).json({ msg: "Failed to create organization." });
    }

    if (error.statusCode == 409) {
      return res.status(409).json({ msg: error.message });
    }
    return res.status(500).json({ msg: "Internal error" });
  }
});
