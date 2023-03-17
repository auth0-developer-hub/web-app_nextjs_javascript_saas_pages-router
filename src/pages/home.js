import ListCourses from "@/components/courses/list-courses";
import HomeLayout from "@/components/layouts/home-layout";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import RegisterBusiness from "./home/register-business";
import banner from "/public/assets/pexels-ketut-subiyanto-4126743.jpg";

export default function UserHome() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user.subscription) {
    const sub = user.subscription.split(";");
    const plan_name = sub[0];
    const end_date = new Date(sub[1]);
    const status = sub[2];

    const now = new Date(Date.now());

    if (end_date < now) {
      return (
        <>
          <main className="bg-white ">
            <div className="flex flex-col h-96 items-center space-y-10">
              <div className="flex-initial w-2/3 text-2xl font-extrabold text-black sm:text-3xl sm:leading-tight sm:tracking-tight">
                Your <span className="underline">{plan_name}</span> subscription
                expired.
              </div>
            </div>
          </main>
        </>
      );
    }

    if (!user.org_id && (plan_name == "team" || plan_name == "enterprise")) {
      if (status == "activation") {
        return (
          <>
            <RegisterBusiness user={user}></RegisterBusiness>
          </>
        );
      } else {
        return (
          <>
            <main className="bg-white ">
              <div className="flex flex-col h-96 items-center space-y-10">
                <div className="flex-initial w-2/3 text-2xl font-extrabold text-black sm:text-3xl sm:leading-tight sm:tracking-tight">
                  You are subscribed to the{" "}
                  <span className="underline">{plan_name}</span> plan. Login
                  with your organization account.
                </div>
              </div>
            </main>
          </>
        );
      }

      // return (
      //   <>
      //     <main className="bg-white ">
      //       <div className="flex flex-col h-96 items-center space-y-10">
      //         <div className="flex-initial w-2/3 text-2xl font-extrabold text-black sm:text-3xl sm:leading-tight sm:tracking-tight">
      //           Congratulations! You have subscribed to{" "}
      //           <span className="underline">{plan_name}</span> plan.
      //         </div>
      //         <div className="h-20 w-1/2">
      //           <Link href={`/home/register-business?plan=${plan_name}`}>
      //             <button className="block w-full max-w-xs mx-auto text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
      //               <i className="mdi mdi-lock-outline mr-1"></i> Activate My
      //               Plan
      //             </button>
      //           </Link>
      //         </div>
      //       </div>
      //     </main>
      //   </>
      // );
    }
  }

  return (
    <main className="bg-white">
      <div className="w-full h-32 md:h-52 mt-2 border-gray-100 relative">
        <Image
          className="md:h-full h-28 w-full object-cover bg-no-repeat bg-bottom"
          src={banner}
          alt="Banner"
          priority={true}
        />
        <div className="absolute bg-white left-1 top-1/3 md:top-1/2 p-4 md:left-8 md:p-4 flex flex-col justify-center shadow-xl h-10 md:h-20 rounded-xl md:rounded-3xl">
          {user && (
            <>
              <h2 className="text-lg md:text-3xl font-bold">
                Welcome, {user.nickname}!
              </h2>
            </>
          )}
        </div>
      </div>
      <ListCourses />
    </main>
  );
}

UserHome.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getServerSideProps = withPageAuthRequired();
