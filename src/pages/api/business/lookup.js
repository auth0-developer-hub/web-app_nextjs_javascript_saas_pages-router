import { getOrganizationByName } from "@/lib/auth0-okta-utils";

export default async function lookupBusiness(req, res) {
  const { name } = req.query;

  if (name === "" || name == null) {
    return res.status(400).json({ msg: "Business name is required." });
  }

  try {
    const org = await getOrganizationByName(name);
    return res.status(200).json(org);
  } catch (error) {
    if (error.statusCode == 404) {
      return res.status(404).json({ msg: "Business not found" });
    }
    console.log("Internal error ", error);
    return res.status(500).json({ msg: "Internal error." });
  }
}
