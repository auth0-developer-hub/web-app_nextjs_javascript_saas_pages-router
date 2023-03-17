import HomeLayout from "@/components/layouts/home-layout";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { pricingPlansData } from "../../../data/pricingdata";

export default function Upgrade() {
  return (
    /* Background decoration */
    <main className="bg-white p-4">
      <h3 className="text-xl md:text-3xl font-bold md:p-3">Select a plan</h3>

      <div className="relative ">
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1"></div>
          <div className="bg-slate-50 flex-1"></div>
        </div>
        <div
          className="grid gap-6 py-1 md:py-10 mx-auto max-w-7xl px-4
         md:px-8 md:grid-cols-3 md:gap-8"
        >
          {pricingPlansData.map((plan) => (
            /* Top of the card */
            <div
              key={plan.title}
              className="border border-slate-200 shadow-lg p-4 md:p-8 bg-white rounded-2xl relative flex flex-col"
            >
              <h3 className="text-md md:text-lg font-semibold leading-5">
                {plan.title}
              </h3>

              {plan.mostPopular && (
                <p
                  className="absolute top-0 -translate-y-1/2 bg-[#EC0B5C] text-white px-3 py-0.5 text-sm
                            font-semibold tracking-wide rounded-full shadow-md"
                >
                  Most Popular
                </p>
              )}
              <p className="mt-2 md:mt-4 text-xs md:text-sm text-slate-700 leading-4 md:leading-6 ">
                {plan.description}
              </p>

              <div className="mt-2 md:mt-4 bg-slate-50 md:p-8 p-3 rounded-lg -mx-4">
                <p className="text-sm font-semibold text-slate-500 flex items-center">
                  <span>{plan.currency}</span>
                  <span className="text-xl md:text-4xl text-slate-900 ml-3">
                    ${plan.price}
                  </span>
                  <span className="ml-1.5">{plan.frequency}</span>
                </p>
              </div>
              {/* Features */}
              <ul className="mt-2 space-y-2 md:space-y-4 flex-1">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-xs md:text-sm text-slate-700 leading-4 md:leading-6 flex"
                  >
                    <svg
                      className="h-5 w-5 text-[#EC0B5C] shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path
                        d="M21 6.285l-11.16 12.733-6.84-6.018 1.319-1.49 5.341 4.686 9.865-11.196 1.475 1.285z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="ml-3">{feature}</span>
                  </li>
                ))}
              </ul>
              {/* Call to Action */}
              <Link
                href={`/home/confirm-plan?plan=${encodeURIComponent(
                  plan.title
                )}`}
                className={`text-center rounded-lg mt-4 md:mt-8 block md:px-6 md:py-4 px-3 py-2 text-sm font-semibold leading-4
                        ${
                          plan.mostPopular
                            ? "text-white bg-[#EC0B5C] hover:bg-[#cc859f] shadow-md"
                            : "text-[#EC0B5C] bg-[#ffdce9] hover:bg-[#cc859f] hover:text-white"
                        }
                        `}
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

Upgrade.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>;
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
