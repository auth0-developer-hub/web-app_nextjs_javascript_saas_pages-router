import AdminLayout from "@/components/layouts/admin-layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import openid_icon from "/public/assets/openid-icon.png";

export default function AddEditOIDC({ user }) {
  const router = useRouter();
  const [connectionName, setConnectionName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [issuerUrl, setIssuerUrl] = useState("");
  const [clientID, setClientID] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [autoMembership, setAutoMembership] = useState(false);
  const [domain, setDomain] = useState("");

  const [message, setMessage] = useState("");

  const createOIDCConnection = async (event) => {
    event.preventDefault();
    const connectionName = event.target.connectionName.value;
    const displayName = event.target.displayName.value;
    const issuerUrl = event.target.issuerUrl.value;
    const logoUrl = event.target.logoUrl.value;
    const clientID = event.target.clientID.value;
    const clientSecret = event.target.clientSecret.value;
    const autoMembership = event.target.autoMembership.value;
    const domain = event.target.domain.value;

    if (
      connectionName == "" ||
      displayName == "" ||
      issuerUrl == "" ||
      clientID == "" ||
      clientSecret == "" ||
      domain == ""
    ) {
      setMessage("Error. All fields are required.");
    } else {
      try {
        const connection = {
          name: connectionName,
          display_name: displayName,
          strategy: "oidc",
          discovery_url: issuerUrl,
          logo_url: logoUrl,
          client_id: clientID,
          client_secret: clientSecret,
          auto_membership: autoMembership,
          domain: domain,
        };

        const res = await fetch("/api/admin/sso/oidc", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(connection),
        });

        if (res.ok) {
          setConnectionName("");
          setDisplayName("");
          setIssuerUrl("");
          setClientID("");
          setLogoUrl("");
          setAutoMembership("");
          setDomain("");
          setMessage("New OIDC Connection created");
          const route = "/admin/sso";
          router.push(route);
        } else {
          if (res.status == 400 || res.status == 404 || res.status == 409) {
            const errMsg = await res.json();
            setMessage(errMsg.msg);
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
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">SSO</h3>
        <div className="flex flex-row gap-4 p-6">
          <div className="flex border w-8 h-8 items-center justify-center bg-gray-100">
            <Image
              src={openid_icon}
              className="h-6 w-6 object-cover bg-no-repeat bg-bottom"
              alt={"OpenID Connect"}
            />
          </div>
          <div className="flex font-semibold">
            New OpenID Connect Connection
          </div>
        </div>
        <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">
          {message}
        </p>
        <div className="max-w-2xl mx-auto bg-white p-16">
          <form className="space-y-4" onSubmit={createOIDCConnection}>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Connection Name Identifier
                </span>
                <input
                  type="text"
                  id="connectionName"
                  value={connectionName}
                  onChange={({ target }) => setConnectionName(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="connection-123"
                  required
                />
                <span className="text-gray-400 text-sm">
                  Enter the Connection Name Identifier.
                </span>
              </div>
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Display Name
                </span>
                <input
                  type="text"
                  id="displayName"
                  value={displayName}
                  onChange={({ target }) => setDisplayName(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="My Connection"
                  required
                />
                <span className="text-gray-400 text-sm">
                  Enter the Connection Display Name that will be visible for
                  users in the Login Page.
                </span>
              </div>
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Login Button Logo URL (Optional)
                </span>
                <input
                  type="text"
                  id="logoUrl"
                  value={logoUrl}
                  onChange={({ target }) => setLogoUrl(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="https://mycompany.com/my-company-logo.svg"
                />
                <span className="text-gray-400 text-sm">
                  Enter the Login button Logo URL. Image will be displayed as a
                  20x20px square.
                </span>
              </div>
            </div>

            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Issuer URL
                </span>
                <input
                  type="text"
                  id="issuerUrl"
                  value={issuerUrl}
                  onChange={({ target }) => setIssuerUrl(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="id.mydomain.com/.well-known/openid-configuration"
                  required
                />
                <span className="text-gray-400 text-sm">
                  Enter the URL of the discovery document of the OpenID Connect
                  provider you want to connect with.
                </span>
              </div>
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Client ID
                </span>
                <input
                  type="text"
                  id="clientID"
                  value={clientID}
                  onChange={({ target }) => setClientID(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  required
                />
                <span className="text-gray-400 text-sm">
                  Obtaining the Client ID differs across providers. Please check
                  your provider&apos;s documentation.
                </span>
              </div>
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Client Secret
                </span>
                <input
                  type="password"
                  id="clientSecret"
                  value={clientSecret}
                  onChange={({ target }) => setClientSecret(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  required
                />
                <span className="text-gray-400 text-sm">
                  Enter the client secret.
                </span>
              </div>
              <div className="grid gap-6 mb-6 lg:grid-cols-1">
                <div>
                  <span className="block mb-2 text-sm font-medium text-gray-900 ">
                    Identity Provider domain
                  </span>
                  <input
                    type="text"
                    id="domain"
                    value={domain}
                    onChange={({ target }) => setDomain(target?.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="email.com"
                  />

                  <span className="text-gray-400 text-sm">
                    Domain used for authentication with this connection
                  </span>
                </div>
              </div>

              <div className="grid gap-6 mb-6 lg:grid-cols-1">
                <div>
                  <input
                    className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-gray-500 checked:bg-[#EC0B5C] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100  after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                    type="checkbox"
                    role="switch"
                    id="autoMembership"
                    value={autoMembership}
                    onChange={({ target }) => setAutoMembership(target.checked)}
                  />
                  <span className="inline-block pl-[0.15rem] hover:cursor-pointer mb-2 text-sm font-medium text-gray-900 ">
                    Auto-Membership at Login
                  </span>
                  <div>
                    <span className="text-gray-400 text-sm">
                      When true, all users that log in with this connection will
                      be automatically granted access to the application. When
                      false, users must be granted access before log in.
                    </span>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

AddEditOIDC.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired();
