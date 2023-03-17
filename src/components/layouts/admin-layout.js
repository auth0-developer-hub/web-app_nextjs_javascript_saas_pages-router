import SettingsBar from "../navbars/admin-settingsbar";
import HomeNavBar from "../navbars/home-navbar";

export default function AdminLayout({ children }) {
  const picture_url = children.props.user?.picture;
  const user_name = children.props.user?.name;
  const user_role = children.props.user?.role;
  const subscription = children.props.user?.subscription;
  const org_id = children.props.user?.org_id;

  return (
    <>
      <div className="mx-auto md:max-w-7xl max-w-full flex flex-col max-h-screen">
        <div className="h-20">
          <HomeNavBar
            picture_url={picture_url}
            user_name={user_name}
            user_role={user_role}
          />
        </div>
        <div className="h-8 w-full flex-auto">
          <SettingsBar subscription={subscription} org_id={org_id} />
        </div>
        <div className="mb-auto p-2">{children}</div>
        <div className="h-10">
          <p className="my-8 mt-8 text-xs text-center text-gray-400 align-bottom">
            <span>Copyright © 2023</span>
          </p>
        </div>
      </div>
    </>
  );
}
