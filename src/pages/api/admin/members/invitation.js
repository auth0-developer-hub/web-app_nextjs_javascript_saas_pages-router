import { deleteInvitation, inviteMembers } from "@/lib/auth0-okta-utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function oidc(req, res) {
  const { user } = await getSession(req, res);
  if (req.method === "POST") {
    //invite new Member

    try {
      const invite = req.body;

      const email = invite.email;
      const roles = invite.roles;
      const connectionId = invite.connection;

      const invitation = await inviteMembers(
        user.name,
        user.org_id,
        email,
        roles,
        connectionId
      );

      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to invite user: ", error);

      return res
        .status(500)
        .json({ msg: "Internal error. Server returned " + error.statusCode });
    }
  } else if (req.method === "PUT") {
    //update member
  } else if (req.method === "DELETE") {
    //delete invitation
    console.log("Delete invitation");
    try {
      const invitation = req.body;
      const invitation_id = invitation.invitation_id;

      await deleteInvitation(user.org_id, invitation_id);

      return res.status(200).json({ msg: "Success" });
    } catch (error) {
      console.log("Failed to invite user: ", error);

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
