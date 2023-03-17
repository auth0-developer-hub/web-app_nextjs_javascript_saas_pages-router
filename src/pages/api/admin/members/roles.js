import { addMemberRoles, removeMemberRoles } from "@/lib/auth0-okta-utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function oidc(req, res) {
  const { user } = await getSession(req, res);
  if (req.method === "POST") {
    //add new role
    try {
      const member_roles = req.body;
      const user_id = member_roles.user_id;
      const roles = member_roles.roles;

      await addMemberRoles(user.org_id, user_id, roles);

      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to add member role: ", error);

      return res
        .status(500)
        .json({ msg: "Internal error. Server returned " + error.statusCode });
    }
  } else if (req.method === "PUT") {
    //update member
  } else if (req.method === "DELETE") {
    //delete invitation
    try {
      const member_roles = req.body;
      const user_id = member_roles.user_id;
      const roles = member_roles.roles;

      await removeMemberRoles(user.org_id, user_id, roles);

      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to remove member role: ", error);

      return res
        .status(500)
        .json({ msg: "Internal error. Server returned " + error.statusCode });
    }
  } else if (req.method === "GET") {
    //fetch members
  } else {
    //not supported
  }
});
