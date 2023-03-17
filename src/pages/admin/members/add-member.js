import AdminLayout from "@/components/layouts/admin-layout";
import RoleSelector from "@/components/role-selector";
import { getAllRoles, getEnabledConnections } from "@/lib/auth0-okta-utils";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AddMember({ user, roles, connections }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [connection, setConnection] = useState("");
  const [selectedRoles, setSelectedRoles] = useState("");
  const [message, setMessage] = useState("");

  let decoratedRoles = [];

  const inviteUser = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const connection = event.target.connection.value;

    if (selectedRoles != "") {
      decoratedRoles = selectedRoles?.map((option) => {
        return option.value;
      });
    }

    if (email == "" || decoratedRoles.length == 0 || connection == "") {
      setMessage("Error. Check required fields.");
    } else {
      try {
        const invitation = {
          email: email,
          roles: decoratedRoles,
          connection: connection,
        };

        const res = await fetch("/api/admin/members/invitation", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invitation),
        });

        if (res.ok) {
          setEmail("");
          setSelectedRoles(roles);
          setConnection("");
          setMessage("Invite sent");
          const route = "/admin/members";
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
        <h3 className="text-3xl font-bold p-3">Invite Member</h3>
        <div className="flex flex-row gap-4 p-6">
          <div className="flex font-semibold">New Invitation</div>
        </div>
        <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">
          {message}
        </p>
        <div className="max-w-2xl mx-auto bg-white p-16">
          <form className="space-y-4" onSubmit={inviteUser}>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </span>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={({ target }) => setEmail(target?.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="john.doe@email.com"
                  required
                />
                <span className="text-gray-400 text-sm">
                  Enter the E-mail of the user you want to invite
                </span>
              </div>
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Access Level
                </span>
                <div className="relative w-full lg:max-w-sm">
                  <RoleSelector
                    allRoles={roles}
                    selectedRoles={selectedRoles}
                    onChange={setSelectedRoles}
                  />
                </div>

                <span className="text-gray-400 text-sm">
                  Select the user role(s).
                </span>
              </div>
            </div>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
              <div>
                <span className="block mb-2 text-sm font-medium text-gray-900 ">
                  Connection
                </span>
                <div className="relative w-full lg:max-w-sm">
                  <select
                    key="connection"
                    id="connection"
                    value={connection}
                    onChange={({ target }) => setConnection(target?.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option key="select">Please choose one option</option>
                    {connections.map((obj) => (
                      <option
                        key={obj.connection_id}
                        value={obj.connection_id}
                        className="ui-active:bg-blue-500 ui-active:text-white
            ui-not-active:bg-white ui-not-active:text-black"
                      >
                        {obj.connection.name}
                      </option>
                    ))}
                  </select>
                </div>

                <span className="text-gray-400 text-sm">
                  Select the connection.
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

AddMember.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const { user } = await getSession(req, res);
    const connections = await getEnabledConnections(user.org_id);
    let roles = await getAllRoles();

    return {
      props: {
        roles: roles,
        connections: connections,
      },
    };
  },
});
