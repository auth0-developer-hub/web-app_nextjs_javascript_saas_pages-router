/* eslint-disable react/prop-types */
import ExpirationBar from "../navbars/expirationbar";
import NavBar from "../navbars/navbar";
import SessionNavBar from "../navbars/session-navbar";

const Layout = ({ children }) => {
  const picture_url = children.props.user?.picture;
  const user_name = children.props.user?.name;
  const user_role = children.props.user?.role;
  const subscription = children.props.user?.subscription;

  if (user_name) {
    return (
      <>
        <div className="mx-auto md:px-4 md:max-w-7xl flex flex-col max-h-screen">
          <div className="h-20">
            <SessionNavBar
              picture_url={picture_url}
              user_name={user_name}
              user_role={user_role}
            />
          </div>
          <div className="h-8 w-full flex-auto">
            <ExpirationBar subscription={subscription} />
          </div>
          <div className="mb-auto p-2">{children}</div>
          <div className="h-10">
            <p className="my-4 mt-8 text-xs text-center text-gray-400 align-bottom">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="mx-auto md:px-4 md:max-w-7xl flex flex-col max-h-screen">
          <div className="h-20 ">
            <NavBar />
          </div>
          <div className="mb-auto">{children}</div>
          <div className="h-10">
            <p className="my-4 text-xs text-center text-gray-400 align-bottom">
              <span>Copyright © 2023</span>
            </p>
          </div>
        </div>
      </>
    );
  }
};

export default Layout;
