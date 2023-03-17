import Link from "next/link";

export default function SettingsBar({ subscription = null, org_id = null }) {
  if (!subscription || !org_id) {
    return <></>;
  }

  const sub = subscription.split(";");
  const subscription_plan = sub[0];

  if (subscription_plan == "trial" || subscription_plan == "personal") {
    return <></>;
  }

  return (
    <>
      <div className="flex items-stretch w-full">
        <nav className="flex w-full justify-center text-black font-bold text-md min-w-[90px] bg-gray-100 text-center rounded-md py-2 border border-gray-300 h-10">
          <ul className="font-bold text-md p-2 md:min-w-[90px] text-center rounded-md py-0">
            <Link href="/admin" className="hover:underline">
              Subscription
            </Link>
          </ul>
          <ul className="font-bold text-md p-2 md:min-w-[90px] rounded-md py-0">
            <Link href="/admin/sso" className="hover:underline">
              SSO
            </Link>
          </ul>
          <ul className="font-bold text-md p-2 md:min-w-[90px] rounded-md py-0">
            <Link href="/admin/members" className="hover:underline">
              Members
            </Link>
          </ul>
          <ul className=" font-bold text-md p-2 md:min-w-[90px] bg-gray-100 text-center rounded-md py-0">
            <Link href="/admin/customization" className="hover:underline">
              Customization
            </Link>
          </ul>
        </nav>
      </div>
    </>
  );
}
