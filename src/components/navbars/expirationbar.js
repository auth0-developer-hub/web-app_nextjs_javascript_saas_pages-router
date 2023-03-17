import Link from "next/link";

export default function ExpirationBar({ subscription = "" }) {
  let subscription_plan;
  let end_date;
  if (subscription) {
    const sub = subscription.split(";");
    subscription_plan = sub[0];
    end_date = new Date(sub[1]);
  }

  const now = new Date(Date.now());

  const diff_time = end_date.getTime() - new Date(now).getTime();
  const remaining_days = Math.ceil(diff_time / (1000 * 3600 * 24));
  const hasExpired = end_date < now;

  if (subscription_plan.toLowerCase() !== "trial") {
    return <></>;
  }

  return (
    <>
      <div className="flex items-stretch w-full">
        <nav className="flex-auto">
          <h4 className=" text-black font-bold text-xs md:text-lg p-2 min-w-[90px] bg-gray-100 text-center rounded-md py-1 sm:py-2 border border-gray-300 h-10">
            {hasExpired && <>Your {subscription_plan} subscription expired.</>}
            {!hasExpired && (
              <>
                You have {Intl.NumberFormat().format(remaining_days)} day(s)
                left on your {subscription_plan} subscription.
              </>
            )}{" "}
            Click{" "}
            <Link href="/home/upgrade-plan" className="underline">
              here
            </Link>{" "}
            to subscribe to a plan.
          </h4>
        </nav>
      </div>
    </>
  );
}
