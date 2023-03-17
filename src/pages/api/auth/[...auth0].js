// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export default handleAuth({
  signup: async (req, res) => {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          screen_hint: "signup",
        },
        returnTo: "/home",
      });
    } catch (error) {
      console.error(error);
    }
  },
  /* logic for > "/pages/api/auth/login" */
  login: async (req, res) => {
    try {
      const { organization, invitation, organization_name } = req.query;

      if (!organization) {
        /* standard login flow for trial/individuals */
        await handleLogin(req, res);
      } else {
        /* business login flow using organizations */
        await handleLogin(req, res, {
          authorizationParams: {
            organization,
            invitation,
            organization_name,
            scope: "openid profile email",
          },
          returnTo: "/home",
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
});
