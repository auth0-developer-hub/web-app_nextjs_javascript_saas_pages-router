import Image from "next/image";
import Link from "next/link";
import companyA from "../../public/companyA.svg";
import companyB from "../../public/companyB.svg";
import companyC from "../../public/companyC.svg";
import companyD from "../../public/companyD.svg";
import companyE from "../../public/companyE.svg";
import heroImg from "../../public/hero.png";
import Container from "./container";

export default function Hero() {
  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2 md:w-2/3 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight">
              <p>
                The next era of business thrives on
                <span className="text-[#EC0B5C]"> learning</span>
              </p>
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl ">
              We are the integrated learning solution that delivers impactful
              programs for everyone.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link href="/pricing">
                <button className="text-white font-bold text-md p-2 min-w-[90px] rounded-md bg-[#EC0B5C] hover:bg-[#6c9096] shadow  hover:text-gray-100 transition duration-500">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full sm:w-1/3 lg:w-1/2">
          <div>
            <Image
              src={heroImg}
              alt="My Learning"
              width={450}
              height="auto"
              priority={true}
            />
          </div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700">
            Trusted by <span className="font-semibold">enterprise leaders</span>
            , trusted by <span className="font-semibold">you</span>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-10 md:justify-around align-bottom text-center ">
            <div className="pt-2 text-gray-400">
              <Image src={companyC} alt="Company C" width={110} height="auto" />
            </div>
            <div className="text-gray-400">
              <Image src={companyB} alt="Company B" width={75} height="auto" />
            </div>
            <div className="text-gray-400">
              <Image src={companyD} alt="Company D" width={55} height="auto" />
            </div>
            <div className="pt-1 text-gray-400">
              <Image src={companyA} alt="Company A" width={95} height="auto" />
            </div>
            <div className="pt-2 text-gray-400">
              <Image src={companyE} alt="Company E" width={65} height="auto" />
              {/* <span>TwistCart</span> */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
