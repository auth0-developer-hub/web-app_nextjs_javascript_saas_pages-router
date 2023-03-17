import AdminLayout from "@/components/layouts/admin-layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Subscription({ user }) {
  const currentUsers = 1;

  const sub = user.subscription.split(";");
  const currentPlan = sub[0].charAt(0).toUpperCase() + sub[0].slice(1);

  const maxUsers = currentPlan === "Trial" ? 1 : 10000;
  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">Current Plan</h3>
        <div className="p-6 flex gap-8 h-32 align-text-bottom border border-gray-100 relative bg-gray-50 justify-start py-10">
          <span className="text-3xl">{currentPlan}</span>
          <span className="text-3xl">|</span>
          <span className="text-sm relative">Usage</span>
          <div className="align-bottom m-1 flex gap-2 absolute py-2 px-56">
            <span className="text-2xl font-bold">
              {Intl.NumberFormat().format(currentUsers)}
            </span>
            <span className="text-sm align-super">
              /{Intl.NumberFormat().format(maxUsers)} user(s)
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

Subscription.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();
