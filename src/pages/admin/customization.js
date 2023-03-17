import AdminLayout from "@/components/layouts/admin-layout";
import { useState } from "react";

export default function Customization() {
  const [organization, setOrganization] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [organizationLogoURL, setOrganizationLogoURL] = useState("");
  const [organizationPrimaryColor, setOrganizationPrimaryColor] = useState("");
  const [organizationBackgroundColor, setOrganizationBackgroundColor] =
    useState("");
  const [message, setMessage] = useState("");

  const updateBusinessAccount = async (event) => {
    event.preventDefault();

    if (
      organization == "" ||
      organizationName == "" ||
      organizationLogoURL == "" ||
      organizationPrimaryColor == "" ||
      organizationBackgroundColor == ""
    ) {
      setMessage("All fields are required.");
    } else {
      //TODO
      setMessage("Feature not available yet.");
    }
  };

  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">Customization</h3>
        <div className="p-6 space-y-4">
          <p className="text-lg text-[#EC0B5C] font-bold min-w-[90px] rounded-md">
            {message}
          </p>
          <form className="space-y-4 flex" onSubmit={updateBusinessAccount}>
            {/* <div className="w-1/2 rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400 items-stretch"> */}
            <div className="w-full flex-col space-y-10">
              <div className="space-y-2">
                <div className="text-sm font-bold text-black sm:text-sm sm:leading-tight sm:tracking-tight">
                  Organization identifier
                </div>
                <div className="relative mb-4 flex w-1/3 flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C]">
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    placeholder="companyid"
                    value={organization}
                    onChange={({ target }) => setOrganization(target?.value)}
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-md px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3] "
                  />
                  <span
                    className="flex items-center whitespace-nowrap bg-transparent rounded-md outline-none focus:outline-none px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] "
                    id="basic-addon2"
                  >
                    .mylearning.app
                  </span>
                </div>
                <p className="flex-wrap w-2/3 text-gray-400 text-sm">
                  Choose a identifier for the organization
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-bold text-black sm:text-sm sm:leading-tight sm:tracking-tight">
                  Organization Name
                </div>
                <div className="relative mb-4 flex w-1/3 flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C]">
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    placeholder="My Company"
                    value={organizationName}
                    onChange={({ target }) =>
                      setOrganizationName(target?.value)
                    }
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-md px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3] "
                    // className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                  />
                </div>
                <p className="flex-wrap w-2/3 text-gray-400 text-sm">
                  Choose a name that will be displayed to end-users
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-bold text-black sm:text-sm sm:leading-tight sm:tracking-tight">
                  Organization Logo
                </div>
                <div className="relative mb-4 flex w-1/3 flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C]">
                  <input
                    type="text"
                    id="organizationLogoURL"
                    name="organizationLogoURL"
                    placeholder="Organization Logo URL"
                    value={organizationLogoURL}
                    onChange={({ target }) =>
                      setOrganizationLogoURL(target?.value)
                    }
                    className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-md px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3] "
                    // className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                  />
                </div>
                <p className="flex-wrap w-2/3 text-gray-400 text-sm">
                  If set, this logo will be displayed to end-users
                </p>
              </div>

              <div className="flex flex-row">
                <div className="space-y-2">
                  <div className="text-sm font-bold text-black sm:text-sm sm:leading-tight sm:tracking-tight">
                    Primary Color
                  </div>
                  <div className="relative mb-4 flex w-1/3 flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C]">
                    <input
                      type="text"
                      id="organizationPrimaryColor"
                      name="organizationPrimaryColor"
                      placeholder="#EC0B5C"
                      value={organizationPrimaryColor}
                      onChange={({ target }) =>
                        setOrganizationPrimaryColor(target?.value)
                      }
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-md px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3] "
                      // className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                  </div>
                  <p className="flex-wrap w-2/3 text-gray-400 text-sm">
                    If set, this color will be applied to login button in the
                    organization authentication flow
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-bold text-black sm:text-sm sm:leading-tight sm:tracking-tight">
                    Page Background Color
                  </div>
                  <div className="relative mb-4 flex w-1/3 flex-wrap items-stretch rounded-md bg-gray-50 px-0 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C]">
                    <input
                      type="text"
                      id="organizationBackgroundColor"
                      name="organizationBackgroundColor"
                      placeholder="#FFFFFF"
                      value={organizationBackgroundColor}
                      onChange={({ target }) =>
                        setOrganizationBackgroundColor(target?.value)
                      }
                      className="relative m-0 block w-[1px] min-w-0 flex-auto rounded-md px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition ease-in-out focus:z-[3] "
                      // className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                  </div>
                  <p className="flex-wrap w-2/3 text-gray-400 text-sm">
                    If set, this color will be applied to login form in the
                    organization authentication flow
                  </p>
                </div>
              </div>

              <div className="">
                <button
                  type="submit"
                  className="w-1/6 py-[0.25rem] text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096]  hover:text-gray-100"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

Customization.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();
