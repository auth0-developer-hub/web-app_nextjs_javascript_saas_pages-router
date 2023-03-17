import { useState } from "react";
import Select from "react-select";

export default function RoleSelector({
  user_id,
  allRoles,
  selectedRoles,
  onChange,
  viewOnly,
  isDisabled,
}) {
  const selected = formatRoles(user_id, selectedRoles);
  const options = formatRoles(user_id, allRoles);
  const [selectedOption, setSelectedOption] = useState(selected);

  if (viewOnly) {
    return (
      <>
        <table className="w-full">
          {selected?.map((role, index) => (
            <tr key={index}>
              <td>{role.label}</td>
            </tr>
          ))}
        </table>
      </>
    );
  } else {
    return (
      <>
        <Select
          defaultValue={selectedOption}
          value={selectedRoles}
          isMulti
          isDisabled={isDisabled}
          placeholder={
            options.length
              ? "Select Role(s)..."
              : "All roles assigned to the user..."
          }
          name="roles"
          closeMenuOnSelect={false}
          hideSelectedOptions={true}
          onChange={onChange}
          options={options}
          className="w-full"
          unstyled
          classNames={{
            control: (state) =>
              state.isFocused
                ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1 ring-blue-500 border-blue-500 "
                : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-1",
            multiValue: () =>
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-1.5 gap-2",
            menu: () =>
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5",
            option: (state) =>
              state.isFocused
                ? "bg-blue-500 text-white ring-blue-500 rounded-lg border-blue-500 block w-full p-1"
                : "bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-1 ",
            noOptionsMessage: () => "hidden",
          }}
        />
      </>
    );
  }
}

function formatRoles(user_id, role_list) {
  if (!role_list) {
    return [];
  }
  const options = role_list.map((role) => {
    const option = {};
    option.user_id = user_id;
    option.value = role.id;
    option.label = role.name;
    return option;
  });

  return options;
}
