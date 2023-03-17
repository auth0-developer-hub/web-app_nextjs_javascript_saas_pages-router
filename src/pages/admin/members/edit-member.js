import AdminLayout from "@/components/layouts/admin-layout";
import RoleSelector from "@/components/role-selector";
import { getAllRoles, getMemberRoles, getUser } from "@/lib/auth0-okta-utils";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";
import { useState } from "react";

async function handleDeleteMemberRole(user_id, role_id, router) {
  try {
    const member_roles = {
      user_id: user_id,
      roles: [role_id],
    };

    const res = await fetch("/api/admin/members/roles", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(member_roles),
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

function DeleteRole({ id, user_id, role_id, router }) {
  return (
    <>
      <button
        key={id}
        onClick={(event) => handleDeleteMemberRole(user_id, role_id, router)}
      >
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

export default function EditMembership({
  userRoles,
  userData,
  availableRoles,
  defaultSelectedRoles,
}) {
  const router = useRouter();
  const [selectedRoles, setSelectedRoles] = useState(defaultSelectedRoles);

  //   const [selectedRoles, setSelectedRoles] = useState("");
  const [message, setMessage] = useState("");

  const { error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  //submit new member role
  const handleAddMemberRole = async (event) => {
    event.preventDefault();
    const user_id = event.target.user_id.value;
    let decoratedRoles = [];

    if (selectedRoles != "") {
      decoratedRoles = selectedRoles?.map((selectOption) => {
        return selectOption.value;
      });
    }

    if (decoratedRoles.length == 0) {
      setMessage("Error. Check required fields.");
    } else {
      try {
        const member_roles = {
          user_id: user_id,
          roles: decoratedRoles,
        };

        const res = await fetch("/api/admin/members/roles", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(member_roles),
        });

        if (res.ok) {
          setSelectedRoles(defaultSelectedRoles);
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
  };

  return (
    <>
      <main className="bg-white p-4">
        <h3 className="text-3xl font-bold p-3">Edit Membership</h3>
        <div className="flex gap-4 mt-8">
          <div className="flex-none">
            <picture>
              <img
                src={userData.picture}
                loading="lazy"
                alt={userData.name}
                className="rounded-full w-12 h-12"
              />
            </picture>
          </div>
          <div className="flex-initial">
            <p className="font-bold font-custom ">{userData.name}</p>
            <p className="text-gray-400 ">{userData.email}</p>
          </div>
        </div>

        <form onSubmit={(event) => handleAddMemberRole(event)}>
          <input type="hidden" name="user_id" value={userData.user_id} />
          <div className="flex flex-row gap-4 m-5">
            <div className="p-6 basis-1/4 font-semibold text-2xl h-0">
              Role(s)
            </div>
            <div className="basis-1/4"></div>
            <div className="relative lg:max-w-sm grow">
              <RoleSelector
                allRoles={availableRoles}
                selectedRoles={selectedRoles}
                onChange={setSelectedRoles}
                isDisabled={availableRoles.length == 0}
              />
            </div>
            <div className="font-semibold justify-end grow-0">
              <button
                type="submit"
                className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] disabled:bg-[#6c9096] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500"
                disabled={availableRoles.length == 0}
              >
                Assign New Role
              </button>
            </div>
          </div>
        </form>

        <div className="overflow-visible rounded-lg border border-gray-200 shadow-md m-5 ">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Name
                </th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Description
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {userRoles.map(({ id, name, description }) => (
                <>
                  <tr className="hover:bg-gray-50" key={id}>
                    <td className="gap-3 px-6 py-4 font-normal text-sm text-gray-900">
                      <div className="font-medium text-gray-700">{name}</div>
                    </td>
                    <td className="gap-3 px-6 py-4 font-normal text-sm text-gray-900">
                      <div className="font-medium text-gray-700">
                        {description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="justify-end gap-4">
                        <DeleteRole
                          key={id}
                          user_id={userData.user_id}
                          role_id={id}
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
      </main>
    </>
  );
}

EditMembership.getLayout = function (page) {
  return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res, query }) {
    const { user } = await getSession(req, res);
    const { user_id } = query;

    const allRoles = await getAllRoles();
    const userRoles = await getMemberRoles(user.org_id, user_id);
    const userData = await getUser(user_id);

    let availableRoles = [];
    if (allRoles != null && allRoles.length > 0) {
      allRoles.forEach((role) => {
        const index = userRoles.findIndex((r) => r.id == role.id);
        if (index === -1) {
          availableRoles.push(role);
        }
      });
    }
    return {
      props: {
        userRoles: userRoles,
        userData: userData,
        availableRoles: availableRoles,
        defaultSelectedRoles: [],
      },
    };
  },
});
