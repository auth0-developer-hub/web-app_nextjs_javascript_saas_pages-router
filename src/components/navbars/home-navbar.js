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
  const is_admin = Boolean(user_role == "Administrator");
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
          className={` w-1/3 items-start flex flex-col  ${
            mobileView ? "block" : "hidden"
          }`}
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
          <div></div>
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
          className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2
        lg:flex lg:items-center lg:w-auto lg:space-x-6
        md:flex md:items-center md:w-auto md:space-x-6
        align-bottom"
        >
          <div className="flex gap-6 items-center">
            {/* Center Links */}
            <li>
              <Link href="/home" className="hover:underline">
                Explore
              </Link>
            </li>
            <li>
              <Link href="/home" className="hover:underline">
                My Learning
              </Link>
            </li>
            <li>
              <div className="flex justify-center">
                <div className="rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-[#EC0B5C] w-60">
                  <input
                    type="search"
                    className="my-0 border-none bg-transparent outline-none focus:outline-none w-60 py-1"
                    id="searchBar"
                    placeholder="Start your search"
                  />
                </div>
              </div>
            </li>
            {is_admin && (
              <li>
                <Link href="/admin" className="hover:underline px-11">
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
            <div className=" text-white">
              <Link href="/api/auth/logout">
                <button className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
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
