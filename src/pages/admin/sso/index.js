import AdminLayout from "@/components/layouts/admin-layout";
import { getEnabledConnections } from "@/lib/auth0-okta-utils";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import document_icon from "/public/assets/document_icon.png";
import openid_icon from "/public/assets/openid-icon.png";

function OktaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 109.21 36">
      <path
        d="M98.97,23.67c-3.05,0-5.2-2.38-5.2-5.51s2.15-5.51,5.2-5.51,5.14,2.38,5.14,5.51-2.12,5.51-5.14,5.51Zm-.49,3.28c2.46,0,4.55-.96,5.87-2.97,.25,1.95,1.66,2.66,3.44,2.66h1.42v-3.09h-.61c-1.01,0-1.26-.49-1.26-1.64V9.69h-3.26v2.51c-1.11-1.76-3.2-2.82-5.6-2.82-4.28,0-8.21,3.59-8.21,8.78s3.94,8.78,8.21,8.78Zm-16.79-4.24c0,2.78,1.72,3.93,3.78,3.93h3.97v-3.09h-2.89c-1.2,0-1.45-.46-1.45-1.64V12.78h4.34v-3.09h-4.34V4h-3.41V22.71Zm-15.53,3.93h3.41v-7.27h1.14l5.81,7.27h4.31l-7.41-9.22,5.69-7.73h-3.84l-4.65,6.53h-1.05V4h-3.41V26.64Zm-11.07-17.26c-4.77,0-8.7,3.59-8.7,8.78s3.94,8.78,8.7,8.78,8.7-3.59,8.7-8.78-3.94-8.78-8.7-8.78Zm0,14.29c-3.05,0-5.2-2.38-5.2-5.51s2.15-5.51,5.2-5.51,5.2,2.38,5.2,5.51-2.15,5.51-5.2,5.51Z"
        fill="#191919"
      ></path>
      <path
        d="M19.8,.26l-.74,9.12c-.35-.04-.7-.06-1.06-.06-.45,0-.89,.03-1.32,.1l-.42-4.42c-.01-.14,.1-.26,.24-.26h.75l-.36-4.47c-.01-.14,.1-.26,.23-.26h2.45c.14,0,.25,.12,.23,.26h0Zm-6.18,.45c-.04-.13-.18-.21-.31-.16l-2.3,.84c-.13,.05-.19,.2-.13,.32l1.87,4.08-.71,.26c-.13,.05-.19,.2-.13,.32l1.91,4.01c.69-.38,1.44-.67,2.23-.85L13.63,.71ZM7.98,3.25l5.29,7.46c-.67,.44-1.28,.96-1.8,1.56l-3.17-3.12c-.1-.1-.09-.26,.01-.35l.58-.48-3.15-3.19c-.1-.1-.09-.26,.02-.35l1.87-1.57c.11-.09,.26-.07,.34,.04ZM3.54,7.57c-.11-.08-.27-.04-.34,.08l-1.22,2.12c-.07,.12-.02,.27,.1,.33l4.06,1.92-.38,.65c-.07,.12-.02,.28,.11,.33l4.04,1.85c.29-.75,.68-1.45,1.16-2.08L3.54,7.57ZM.55,13.33c.02-.14,.16-.22,.29-.19l8.85,2.31c-.23,.75-.36,1.54-.38,2.36l-4.43-.36c-.14-.01-.24-.14-.21-.28l.13-.74-4.47-.42c-.14-.01-.23-.14-.21-.28l.42-2.41h0Zm-.33,5.98c-.14,.01-.23,.14-.21,.28l.43,2.41c.02,.14,.16,.22,.29,.19l4.34-1.13,.13,.74c.02,.14,.16,.22,.29,.19l4.28-1.18c-.25-.74-.41-1.53-.45-2.34L.21,19.31Zm1.42,6.34c-.07-.12-.02-.27,.1-.33l8.26-3.92c.31,.74,.73,1.43,1.23,2.05l-3.62,2.58c-.11,.08-.27,.05-.34-.07l-.38-.66-3.69,2.55c-.11,.08-.27,.04-.34-.08l-1.23-2.12Zm10.01-1.72l-6.43,6.51c-.1,.1-.09,.26,.02,.35l1.88,1.57c.11,.09,.26,.07,.34-.04l2.6-3.66,.58,.49c.11,.09,.27,.07,.35-.05l2.52-3.66c-.68-.42-1.31-.93-1.85-1.51Zm-1.27,10.45c-.13-.05-.19-.2-.13-.32l3.81-8.32c.7,.36,1.46,.63,2.25,.78l-1.12,4.3c-.03,.13-.18,.21-.31,.16l-.71-.26-1.19,4.33c-.04,.13-.18,.21-.31,.16l-2.3-.84h0Zm6.56-7.75l-.74,9.12c-.01,.14,.1,.26,.23,.26h2.45c.14,0,.25-.12,.23-.26l-.36-4.47h.75c.14,0,.25-.12,.24-.26l-.42-4.42c-.43,.07-.87,.1-1.32,.1-.36,0-.71-.02-1.06-.07h0ZM25.76,1.94c.06-.13,0-.27-.13-.32l-2.3-.84c-.13-.05-.27,.03-.31,.16l-1.19,4.33-.71-.26c-.13-.05-.27,.03-.31,.16l-1.12,4.3c.8,.16,1.55,.43,2.25,.78L25.76,1.94h0Zm5.02,3.63l-6.43,6.51c-.54-.58-1.16-1.09-1.85-1.51l2.52-3.66c.08-.11,.24-.14,.35-.05l.58,.49,2.6-3.66c.08-.11,.24-.13,.34-.04l1.88,1.57c.11,.09,.11,.25,.02,.35Zm3.48,5.12c.13-.06,.17-.21,.1-.33l-1.23-2.12c-.07-.12-.23-.15-.34-.08l-3.69,2.55-.38-.65c-.07-.12-.23-.16-.34-.07l-3.62,2.58c.5,.62,.91,1.31,1.23,2.05l8.26-3.92Zm1.3,3.32l.42,2.41c.02,.14-.07,.26-.21,.28l-9.11,.85c-.04-.82-.2-1.6-.45-2.34l4.28-1.18c.13-.04,.27,.05,.29,.19l.13,.74,4.34-1.13c.13-.03,.27,.05,.29,.19h0Zm-.41,8.85c.13,.03,.27-.05,.29-.19l.42-2.41c.02-.14-.07-.26-.21-.28l-4.47-.42,.13-.74c.02-.14-.07-.26-.21-.28l-4.43-.36c-.02,.82-.15,1.61-.38,2.36l8.85,2.31h0Zm-2.36,5.5c-.07,.12-.23,.15-.34,.08l-7.53-5.2c.48-.63,.87-1.33,1.16-2.08l4.04,1.85c.13,.06,.18,.21,.11,.33l-.38,.65,4.06,1.92c.12,.06,.17,.21,.1,.33l-1.22,2.12h0Zm-10.07-3.07l5.29,7.46c.08,.11,.24,.13,.34,.04l1.87-1.57c.11-.09,.11-.25,.02-.35l-3.15-3.19,.58-.48c.11-.09,.11-.25,.01-.35l-3.17-3.12c-.53,.6-1.13,1.13-1.8,1.56h0Zm-.05,10.16c-.13,.05-.27-.03-.31-.16l-2.42-8.82c.79-.18,1.54-.47,2.23-.85l1.91,4.01c.06,.13,0,.28-.13,.32l-.71,.26,1.87,4.08c.06,.13,0,.27-.13,.32l-2.3,.84h0Z"
        fill="#191919"
        fillRule="evenodd"
      ></path>
    </svg>
  );
}

function ConnectionLogo({ name, strategy }) {
  if (
    name == "Username-Password-Authentication" ||
    name == "google-oauth2" ||
    strategy == "samlp"
  ) {
    return (
      <Image
        src={document_icon}
        className="h-6 w-6 object-cover bg-no-repeat bg-bottom"
        alt={"SAML"}
      />
    );
  }

  if (strategy == "oidc") {
    return (
      <>
        <Image
          src={openid_icon}
          className="h-6 w-6 object-cover bg-no-repeat bg-bottom"
          alt={"OpenID Connect"}
        />
      </>
    );
  }

  if (strategy == "okta") {
    return (
      <>
        <OktaIcon />
      </>
    );
  }
}

async function handleDelete(id, router) {
  try {
    const connection = {
      connection_id: id,
    };

    const res = await fetch("/api/admin/sso/oidc", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(connection),
    });

    if (res.ok) {
      router.replace(router.asPath);
    } else {
      if (res.status == 400 || res.status == 404 || res.status == 409) {
        const errMsg = await res.json();
        console.log(errMsg);
      } else {
        console.log("Error: " + res.statusText);
      }
    }
  } catch (error) {
    console.log("Error: " + error);
  }
}

function handleEdit(name) {
  console.log("Edit connection " + name);
}

function EditDeleteConnection({ name, id, router }) {
  if (name == "Username-Password-Authentication" || name == "google-oauth2") {
    return <></>;
  } else {
    return (
      <>
        <button key={id} onClick={(event) => handleDelete(id, router)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            x-tooltip="tooltip"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        {/* <a x-data="{ tooltip: 'Edit' }" href="/admin/sso/add-edit-oidc">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6"
            x-tooltip="tooltip"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </a> */}
      </>
    );
  }
}

export default function SSO({ connections }) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">SSO</h3>
        <div className="p-6 flex font-semibold h-1">Add a new connection</div>
        <div className="">
          <nav className="w-2/3">
            <table className="border-separate border-spacing-2 border-gray-400 m-4 w-full">
              <tbody>
                <tr className="h-5 relative">
                  <td className="flex flex-1 w-auto absolute gap-2">
                    <div className="flex border w-8 h-8 items-center justify-center bg-gray-100">
                      <Image
                        src={document_icon}
                        className="h-6 w-6 object-cover bg-no-repeat bg-bottom"
                        alt={"SAML"}
                      />
                    </div>
                    SAML
                  </td>
                  <td className="flex-none w-10 text-center justify-center border-slate-400 absolute right-0 ">
                    <Link
                      href="/admin/sso/add-saml"
                      className="hover:underline text-xl"
                    >
                      <button className="w-10 border border-slate-400 text-center hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
                        +
                      </button>
                    </Link>
                  </td>
                </tr>
                {/* <hr className="w-full my-3" /> */}
                <div className="w-full my-3 border-b border-gray-200" />
                <tr className="h-5 relative">
                  <td className="flex flex-1 w-auto absolute gap-2">
                    <div className="flex border w-8 h-8 items-center justify-center bg-gray-100">
                      <Image
                        src={openid_icon}
                        className="h-6 w-6 object-cover bg-no-repeat bg-bottom"
                        alt={"OpenID Connect"}
                      />
                    </div>
                    OpenID Connect
                  </td>
                  <td className="flex-none w-10 text-center justify-center absolute right-0 ">
                    <Link
                      href="/admin/sso/add-edit-oidc"
                      className="hover:underline text-xl"
                    >
                      <button className="w-10 border border-slate-400 text-center hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
                        +
                      </button>
                    </Link>
                  </td>
                </tr>
                {/* <hr className="w-full my-3" /> */}
                <div className="w-full my-3 border-b border-gray-200" />
                <tr className="h-5 relative">
                  <td className="flex flex-1 w-auto absolute gap-2">
                    <div className="flex border w-8 h-8 items-center justify-center bg-gray-100">
                      <OktaIcon />
                    </div>
                    Okta Workforce
                  </td>
                  <td className="flex-none w-10 text-center justify-center absolute right-0 ">
                    <Link
                      href="/admin/sso/add-okta"
                      className="hover:underline text-xl"
                    >
                      <button className="w-10 border border-slate-400 text-center hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
                        +
                      </button>
                    </Link>
                  </td>
                </tr>
                {/* <hr className="w-full my-3" /> */}
                <div className="w-full my-3 border-b border-gray-200" />
              </tbody>
            </table>
          </nav>
        </div>
        <div className="p-6 flex font-semibold h-1">
          Active Connections
          <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">
            {message}
          </p>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>

                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Login Method
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Auto-Membership
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {connections?.map((connection) =>
                connection.connection.name ==
                  "Username-Password-Authentication" ||
                connection.connection.name == "google-oauth2" ? (
                  ""
                ) : (
                  <>
                    <tr
                      className="hover:bg-gray-50"
                      key={connection.connection_id}
                    >
                      <td className="px-6 py-4">
                        {connection.connection.name}
                      </td>
                      <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          <ConnectionLogo
                            name={connection.connection.name}
                            strategy={connection.connection.strategy}
                          />
                        </div>
                        {/* <div className="text-sm">
                            <div className="font-medium text-gray-700">
                              {connection.connection.strategy}
                            </div>
                          </div> */}
                      </td>
                      <td className="px-6 py-4">
                        {connection.assign_membership_on_login ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-4">
                          <EditDeleteConnection
                            name={connection.connection.name}
                            id={connection.connection_id}
                            router={router}
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                )
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}

SSO.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    //fetch connections
    const { user } = await getSession(req, res);
    const connections = await getEnabledConnections(user.org_id);

    return {
      props: {
        connections: connections,
      },
    };
  },
});
