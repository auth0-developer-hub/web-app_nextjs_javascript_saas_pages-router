import { updateAppMetadata } from "@/lib/auth0-okta-utils";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function subscribe(req, res) {
  const { plan } = req.query;
  const plan_name = plan.toLowerCase() || "";
  const allowedPlans = ["personal", "team", "enterprise"];

  if (!allowedPlans.includes(plan_name)) {
    return res.status(400).json({ error: "Invalid plan name: " + plan_name });
  }

  const session = await getSession(req, res);
  const user_id = session.user.sub;

  try {
    const date = new Date();
    date.setFullYear(new Date().getFullYear() + 1);

    const status = "activation";
    const subscription = plan_name
      .concat(";")
      .concat(date.toISOString())
      .concat(";")
      .concat(status);

    const app_metadata = {
      subscription: subscription,
    };

    const user = await updateAppMetadata(user_id, app_metadata);
    return res.status(200).json(user);
  } catch (error) {
    console.log("Internal error ", error);

    if (error.statusCode == 404) {
      return res
        .status(404)
        .json({ msg: "Error updating subscription. User not found" });
    }

    return res.status(500).json({ msg: "Error updating subscription" });
  }
});
