import AdminLayout from "@/components/layouts/admin-layout";
import Image from "next/image";
import document_icon from "/public/assets/document_icon.png";

export default function AddSAML() {
  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">SSO</h3>
        <div className="flex flex-row gap-4 p-6">
          <div className="flex border w-8 h-8 items-center justify-center bg-gray-100">
            <Image
              src={document_icon}
              className="h-6 w-6 object-cover bg-no-repeat bg-bottom"
              alt={"SAML"}
            />
          </div>
          <div className="flex font-semibold">New SAML Connection</div>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-16">
          <form>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Sign In URL
                  <input
                    type="text"
                    id="signin_url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="https://samlp.example.com/login"
                    required
                  />
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  X509 Signing Certificate
                  <input
                    type="file"
                    id="x509certificate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder=""
                    required
                  />
                </label>
              </div>
              <div>
                <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                  <input
                    className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[#EC0B5C]  before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                    type="checkbox"
                    role="switch"
                    id="enableSignOut"
                    defaultChecked
                  />
                  Enable Sign Out
                </label>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Sign Out URL
                  <input
                    type="text"
                    id="signout_url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="https://samlp.example.com/logout"
                  />
                </label>
                <span className="text-gray-400 text-sm">
                  Optional: when empty this field defaults to the Sign In URL
                </span>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  User ID Attribute
                  <input
                    type="text"
                    id="userid_attribute"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="https://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                  />
                </label>
                <span className="text-gray-400 text-sm">
                  Optional: This is the attribute in the SAML token that will be
                  mapped to the user_id property
                </span>
              </div>
              <div className="">
                <div className="">
                  <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                    <input
                      className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[#EC0B5C] before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                      type="checkbox"
                      role="switch"
                      id="enableSignRequest"
                      defaultChecked
                    />
                    Sign Request
                  </label>
                </div>
                <span className="text-gray-400 text-sm">
                  When enabled, the SAML authentication request will be signed.
                  Download the certificate and give it to SAMLP that will
                  receive the signed assertion so it can validate the signature.
                </span>
              </div>
              <div>
                <div className="mb-3 xl:w-96">
                  <label className="hover:cursor-pointer">
                    Sign Request Algorithm
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      data-te-select-init
                      id="signRequestAlg"
                    >
                      <option value=""></option>
                      <option value="RSA-SHA256">RSA-SHA256</option>
                      <option value="RSA-SHA1">RSA-SHA1</option>
                    </select>
                  </label>
                </div>
              </div>
              <div>
                <div className="mb-3 xl:w-96">
                  <label className="hover:cursor-pointer">
                    Sign Request Algorithm Digest
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      data-te-select-init
                      id="signRequestAlgDig"
                    >
                      <option value=""></option>
                      <option value="SHA256">SHA256</option>
                      <option value="SHA1">SHA1</option>
                    </select>
                  </label>
                </div>
              </div>
              <div>
                <div className="mb-3 xl:w-96">
                  <label className="hover:cursor-pointer">
                    Protocol Binding
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      data-te-select-init
                      id="protocolBinding"
                    >
                      <option value=""></option>
                      <option value="HTTP-Redirect">HTTP-Redirect</option>
                      <option value="HTTP-POST">HTTP-POST</option>
                    </select>
                  </label>
                </div>
                <span className="text-gray-400 text-sm">
                  Applies only to the SAML Request Binding. The SAML Response
                  Binding only supports HTTP-POST.
                </span>
              </div>
              <div>
                <label className="inline-block pl-[0.15rem] hover:cursor-pointer">
                  <input
                    className="mt-[0.3rem] mr-2 h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[#EC0B5C]  before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
                    type="checkbox"
                    role="switch"
                    id="syncUserProfileLogin"
                    defaultChecked
                  />
                  Sync user profile attributes at each login
                </label>
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

AddSAML.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();
