import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function saml(req, res) {
  if (req.method === "POST") {
    //add new SSO connection
  } else if (req.method === "PUT") {
    //update connection
  } else if (req.method === "DELETE") {
    //delete connection
  } else if (req.method === "GET") {
    //fetch connections
  } else {
    //not supported
  }

  const { org_name } = req.query;

  if (!org_name) {
    return res
      .status(400)
      .json({ msg: "Organization name identifier is required." });
  }
});
