import { mktCoursesData } from "../../../data/mktcourses.js";
import Course from "./course";

export default function ListCourses() {
  // const { user, isLoading } = useUser();

  return (
    <>
      <div className="flex flex-col items-start mx-4 md:mx-8 space-y-3 mt-7 mb-8">
        <h2 className="text-2xl md:text-4xl font-bold">
          A great variety of courses
        </h2>
        <h3 className="text-xl md:py-2">
          Choose from 200,000 online courses, completely updated.
        </h3>
        <div className="text-xs lg:text-lg flex space-x-10 ml-1 font-bold text-gray-500 cursor-pointer h-10 py-2">
          <h3>Business</h3>
          <h3>Software Development</h3>
          <h3 className="hidden md:block">Artificial Intelligence</h3>
          <h3 className="text-black underline">Marketing</h3>
          <h3 className="hidden md:block">Data Science</h3>
          <h3 className="hidden md:block">Sales</h3>
        </div>
        <div className="text-left w-full border border-gray-300 p-7">
          <h2 className="text-xl md:text-2xl mb-2 font-bold">
            Develop the skills you need to build, manage & optimize digital
            campaigns.
          </h2>
          <h3>
            Master the basics of digital marketing, all created and curated by
            top industry experts. There are 30 modules to explore, packed full
            of practical exercises and real-world examples to help you turn
            knowledge into action.
          </h3>
          <button className="border border-gray-50 font-semibold text-sm p-3 mt-4 mb-8 hover:bg-[#EC0B5C] shadow hover:text-gray-100 transition duration-200">
            Explore Marketing
          </button>
          {/* courses */}
          <div className="flex gap-4 flex-wrap lg:flex-nowrap mx-16 items-baseline">
            {mktCoursesData?.map((course) => (
              <div className="w-60 h-60" key={course.id}>
                <Course {...{ course }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
