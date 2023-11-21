import Link from "next/link";
import { useState } from "react";
import Logo from "../logo";
import ProfileAvatar from "../profile-avatar";

export default function HomeNavBar({
  picture_url,
  user_name,
  user_role = "Administrator",
}) {
  const [mobileView, setMobileView] = useState(false);
  const is_admin = Boolean(user_role === "Administrator");

  return (
    <>
      <nav className="relative px-4 py-4 flex justify-between items-baseline bg-white">
        {/* Logo */}
        <div className="flex gap-1">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`w-1/3 items-start flex flex-col ${mobileView ? "block" : "hidden"}`}
        >
          <ul>
            <li>
              <Link href="/home" className="hover:underline">
                My Learning
              </Link>
            </li>
            {is_admin && (
              <li>
                <Link href="/admin" className="hover:underline">
                  Settings
                </Link>
              </li>
            )}
            <li>
              <Link href="/api/auth/logout">
                <button className="hover:underline">Sign out</button>
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:hidden md:hidden flex">
          <button
            className="flex items-center p-3"
            onClick={() => setMobileView(!mobileView)}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
          <ProfileAvatar picture_url={picture_url} name={user_name} />
        </div>

        {/* Regular Menu */}
        <ul
          className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:items-center lg:w-auto lg:space-x-6 md:flex md:items-center md:w-auto md:space-x-6 align-bottom"
        >
          <div className="flex gap-6 items-center">
            {is_admin && (
              <li style={{ left: '84%' }}>
                <Link href="/admin" className="hover:underline">
                  Settings
                </Link>
              </li>
            )}
          </div>
        </ul>
        <div className="space-x-4 hidden md:inline lg:inline">
          <div className="flex items-center gap-2">
            <div>
              <ProfileAvatar picture_url={picture_url} name={user_name} />
            </div>
            <div className="text-white">
              <Link href="/api/auth/logout">
                <button
                  className="text-white font-bold text-md p-2 min-w-[90px] rounded-md"
                  style={{
                    background: 'linear-gradient(90deg, #3864B3 0%, #2F5597 31%, #EC73FF 83%)',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background 0.3s ease',
                  }}
                >
                  Sign out
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
