import HomeLayout from "@/components/layouts/home-layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RegisterPersonal({ user }) {
  const router = useRouter();
  const { plan } = router.query;

  return (
    <>
      <main className="bg-white p-4">
        <div className="mx-auto max-w-7xl bg-white px-4 pt-24 sm:px-6 lg:px-8 py-2">
          <div className="text-xl md:text-3xl font-extrabold text-black sm:text-3xl md:leading-tight sm:tracking-tight h-20">
            Congratulations! You subscribed to a{" "}
            <span className="underline">{plan}</span> plan.
          </div>
          <Link href={`/home`}>
            <button
              type="submit"
              className="w-1/6 text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096]  hover:text-gray-100"
            >
              Continue
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}

RegisterPersonal.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>;
};

import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();
