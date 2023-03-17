import Layout from "@/components/layouts/layout";
import { getSession } from "@auth0/nextjs-auth0";
import Hero from "../components/hero";

export default function Index() {
  return (
    <main className="bg-white p-4">
      <Hero />
    </main>
  );
}

Index.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps({ req, res }) {
  const user_session = await getSession(req, res);
  let user_props = {};

  if (user_session) {
    user_props = { user: user_session.user };
  }

  return {
    props: user_props,
  };
}
