import HomeLayout from "@/components/layouts/home-layout";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ConfirmPlan() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { plan } = router.query;

  const isPersonalPlan = Boolean(plan === "Personal");

  const subscribe = async (event) => {
    event.preventDefault();
    try {
      const url_param = new URLSearchParams({ plan: plan });

      const res = await fetch("/api/subscription/subscribe?" + url_param);
      if (res.ok) {
        let route =
          "/api/auth/login?returnTo=/home/register-business?" + url_param;
        if (isPersonalPlan) {
          route =
            "/api/auth/login?returnTo=/home/register-personal?" + url_param;
        }
        router.push(route);
      } else {
        if (res.status == 400 || res.status == 404) {
          setMessage("User not found");
        } else {
          setMessage("Error: " + res.statusText);
        }
      }
    } catch (error) {
      setMessage("Error: " + error);
    }
  };

  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">Confirm Subscription</h3>
        <div className="p-6 flex align-text-bottom ring-1 rounded-md ring-gray-200 relative bg-gray-50 justify-start">
          <span className="text-2xl">Selected Plan:&nbsp;</span>
          <span className="text-2xl font-bold">{plan}</span>
        </div>

        <form onSubmit={subscribe}>
          <div className="relative mb-4 flex w-full flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-1 ring-gray-200 focus-within:ring-[#EC0B5C]">
            <div className="w-full mx-auto rounded-lg bg-white shadow-sm p-5 text-gray-700 ">
              <div className="mb-0 h-10">
                <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">
                  {message}
                </p>
              </div>
              <div className="">
                <div className="mb-3 flex-col">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Payment method
                  </label>
                </div>

                <div className="mb-3 flex -mx-2">
                  <div className="px-2">
                    <label
                      htmlFor="type1"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type1"
                        defaultChecked
                        readOnly
                      />
                      <div className="h-7 w-40 rounded-full relative">
                        <Image
                          fill
                          src="/assets/credit_cards.png"
                          className="h-8 ml-3"
                          alt="Credit Cards"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="px-10">
                    <label
                      htmlFor="type2"
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        className="form-radio h-5 w-5 text-indigo-500"
                        name="type"
                        id="type2"
                      />
                      <div className="h-7 w-10 rounded-full relative">
                        <Image
                          fill
                          src="/assets/paypal.png"
                          className="h-8 ml-3"
                          alt="PayPal"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">
                  Name on card
                </label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#EC0B5C] transition-colors cursor-pointer"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="font-bold text-sm mb-2 ml-1">
                  Card number
                </label>
                <div>
                  <input
                    className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#EC0B5C] transition-colors cursor-pointer"
                    placeholder="0000 0000 0000 0000"
                    type="text"
                  />
                </div>
              </div>
              <div className="mb-3 -mx-2 flex items-end">
                <div className="px-2 w-1/2">
                  <label className="font-bold text-sm mb-2 ml-1">
                    Expiration date
                  </label>
                  <div>
                    <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#EC0B5C] transition-colors cursor-pointer">
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#EC0B5C] transition-colors cursor-pointer">
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                  </select>
                </div>
              </div>
              <div className="mb-10">
                <label className="font-bold text-sm mb-2 ml-1">
                  Security code
                </label>
                <div>
                  <input
                    className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-[#EC0B5C] transition-colors"
                    placeholder="000"
                    type="text"
                  />
                </div>
              </div>
              <div>
                <button className="block w-full max-w-xs mx-auto text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
                  <i className="mdi mdi-lock-outline mr-1"></i> Confirm
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}

ConfirmPlan.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>;
};

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();
