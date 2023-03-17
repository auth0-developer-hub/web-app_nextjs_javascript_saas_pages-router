import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Business() {
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const lookupBusiness = async (event) => {
    event.preventDefault();
    const organization = event.target.organization.value;

    if (organization === "") {
      setMessage("Please enter a business identifier and try again.");
    } else {
      try {
        const res = await fetch(
          "/api/business/lookup?" + new URLSearchParams({ name: organization })
        );

        if (res.ok) {
          const org = await res.json();
          setOrganization("");
          router.push("/api/auth/login?organization=" + org.id);
        } else {
          if (res.status == 400 || res.status == 404) {
            setMessage("Business not found");
          } else {
            setMessage("Error: " + res.statusText);
          }
        }
      } catch (error) {
        setMessage("Error: " + error);
      }
    }
  };

  return (
    <>
      <main className="bg-white p-4 ">
        <div className="mx-auto max-w-7xl bg-white px-4 pt-24 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-black sm:text-5xl sm:leading-tight sm:tracking-tight">
            Sign in to your organization
          </h2>
          <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">
            {message}
          </p>
          <form className="space-y-4" onSubmit={lookupBusiness}>
            <div className="w-1/2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
              <input
                type="text"
                id="organization"
                name="organization"
                placeholder="Enter your business identifier"
                value={organization}
                onChange={({ target }) => setOrganization(target?.value)}
                className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              />
            </div>
            <div className="flow-root w-1/2">
              <button
                type="submit"
                className="float-left w-1/4 text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096]  hover:text-gray-100"
              >
                Continue
              </button>
              <Link
                href="/api/auth/signup"
                className="float-right font-bold text-md p-2 min-w-[90px] text-[#EC0B5C] hover:text-[#6c9096] right-0"
              >
                I don&apos;t have an account
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
