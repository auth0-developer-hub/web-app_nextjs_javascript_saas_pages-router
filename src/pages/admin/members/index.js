import AdminLayout from "@/components/layouts/admin-layout";
import RoleSelector from "@/components/role-selector";
import {
  getAllRoles,
  getInvitations,
  getMemberRoles,
  getMembers,
  getRole,
} from "@/lib/auth0-okta-utils";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

async function handleDeleteInvitation(id, router) {
  console.log("Delete Invitation ", id);
  try {
    const invitation = {
      invitation_id: id,
    };

    const res = await fetch("/api/admin/members/invitation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invitation),
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

function DeleteInvitation({ id, router }) {
  return (
    <>
      <button key={id} onClick={(event) => handleDeleteInvitation(id, router)}>
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
    </>
  );
}

async function handleDeleteMembership(id, router) {
  console.log("Delete Membership ", id);
  try {
    const membership = {
      members: [id],
    };

    const res = await fetch("/api/admin/members", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membership),
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

function DeleteMembership({ id, router }) {
  return (
    <>
      <button key={id} onClick={(event) => handleDeleteMembership(id, router)}>
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
    </>
  );
}

function EditRoles({ id }) {
  // if (viewMode) {
  return (
    <>
      <Link
        key={id}
        href={{
          pathname: "/admin/members/edit-member",
          query: { user_id: id },
        }}
      >
        <button key={id}>
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
        </button>
      </Link>
    </>
  );
}

export default function Members({ members, invites, allRoles }) {
  const router = useRouter();
  const [viewMembers, setViewMembers] = useState(members);

  function toggleViewMode(user_id, viewOnly) {
    if (user_id != undefined && viewOnly != undefined) {
      let updatedList = viewMembers.map((member) => {
        if (member.user_id == user_id) {
          return { ...member, viewMode: !viewOnly };
        }
        return member;
      });
      setViewMembers(updatedList);
    }
  }

  async function handleUpdateRole(value, action) {
    if (action.action == "remove-value") {
    } else if (action.action === "select-option") {
      let { user_id, value } = action.option;
      try {
        const member_roles = {
          user_id: user_id,
          roles: [value],
        };

        const res = await fetch("/api/admin/members/roles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(member_roles),
        });

        if (res.ok) {
          const addedRole = allRoles.filter((role) => role.id == value);
          let updatedList = viewMembers.map((member) => {
            if (member.user_id == user_id) {
              member.roles.push(addedRole[0]);
              return { ...member };
            }
            return member;
          });

          setViewMembers(updatedList);
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
  }

  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">Members</h3>
        <div className="p-6 flex font-semibold">
          <Link href="/admin/members/add-member">
            <button
              type="submit"
              className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500"
            >
              Add Member
            </button>
          </Link>
        </div>
        {/* <p className="mt-4 max-2-3xl text-lg text-[#EC0B5C] font-bold p-2 min-w-[90px] rounded-md">
          {message}
        </p> */}
        <div className="p-6 flex font-semibold h-1">Pending Invitations</div>
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr key="pending-invitations">
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Access level
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Created At
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Expires At
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {invites?.map((invite) => (
                <>
                  <tr className="hover:bg-gray-50" key={invite.id}>
                    <td className="px-6 py-4">{invite.invitee.email}</td>
                    <td className="px-6 py-4">
                      {invite.roles?.map((role) => (
                        <>
                          <table>
                            <tr key={role.id}>
                              <td>{role.name}</td>
                            </tr>
                          </table>
                        </>
                      ))}
                    </td>

                    <td className="px-6 py-4">{invite.created_at}</td>
                    <td className="px-6 py-4">{invite.expires_at}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <DeleteInvitation
                          key={invite.id}
                          id={invite.id}
                          router={router}
                        />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 flex font-semibold h-1">Active Members</div>

        <div className="overflow-visible rounded-lg border border-gray-200 shadow-md m-5 ">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr key="active-members">
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Access Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {viewMembers.map(
                ({ picture, name, email, user_id, roles, viewMode }) => (
                  <>
                    <tr className="hover:bg-gray-50" key={user_id}>
                      <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                        <div className="relative h-10 w-10">
                          <picture>
                            <img
                              // src={user.picture}
                              src={picture}
                              // src="https://ui-avatars.com/api/?name=John+Doe&background=EC0B5C&color=FFFFFF"
                              loading="lazy"
                              alt=""
                              className="h-full w-full rounded-full"
                            />
                          </picture>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-700">
                            {name}
                          </div>
                          <div className="text-gray-400">{email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="justify-start">
                          <RoleSelector
                            user_id={user_id}
                            allRoles={allRoles}
                            selectedRoles={roles}
                            onChange={handleUpdateRole}
                            viewOnly={viewMode}
                            onClick={(user_id, viewOnly) =>
                              toggleViewMode(user_id, viewOnly)
                            }
                          />
                          {/* </ClickOutside> */}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-4">
                          <EditRoles id={user_id} router={router} />
                          <DeleteMembership
                            key={user_id}
                            id={user_id}
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

Members.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    //fetch connections
    const { user } = await getSession(req, res);
    let members = await getMembers(user.org_id);

    for (let member of members) {
      let roles = await getMemberRoles(user.org_id, member.user_id);
      member.roles = roles;
      member.viewMode = true;
    }

    let invites = await getInvitations(user.org_id);

    for (let invite of invites) {
      let roles = [];
      for (let invite_role of invite.roles) {
        let role = await getRole(invite_role);
        roles.push(role);
      }
      invite.roles = roles;
    }
    const allRoles = await getAllRoles();
    return {
      props: {
        members: members,
        invites: invites,
        allRoles: allRoles,
      },
    };
  },
});
