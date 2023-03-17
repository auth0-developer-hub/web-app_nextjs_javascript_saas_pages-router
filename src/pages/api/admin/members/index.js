import { removeMembers } from "@/lib/auth0-okta-utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function oidc(req, res) {
  const { user } = await getSession(req, res);
  // if (req.method === "POST") {
  //   //invite new Member
  // } else if (req.method === "PUT") {
  //   //update member
  // } else
  if (req.method === "DELETE") {
    //delete member
    try {
      const membership = req.body;
      const userIds = membership.members;

      await removeMembers(user.org_id, userIds);

      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to remove membership: ", error);

      return res
        .status(500)
        .json({ msg: "Internal error. Server returned " + error.statusCode });
    }

    // } else if (req.method === "GET") {
    //   //fetch members
  } else {
    //not supported
  }
});
