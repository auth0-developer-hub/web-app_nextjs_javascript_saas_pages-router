import Image from "next/image";
import Link from "next/link";

export default function ProfileAvatar({
  picture_url = "https://ui-avatars.com/api/?name=John+Doe&background=EC0B5C&color=FFFFFF",
  name = "John Doe",
}) {
  return (
    <>
      <Link href="/home/profile">
        <button className="rounded-full text-white font-bold bg-[#EC0B5C] text-md  hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
          <span className="sr-only">Profile</span>
          <div className="h-8 w-8 rounded-full relative">
            <Image
              src={picture_url}
              className="rounded-full relative"
              alt={name}
              fill
            ></Image>
          </div>
        </button>
      </Link>
    </>
  );
}
