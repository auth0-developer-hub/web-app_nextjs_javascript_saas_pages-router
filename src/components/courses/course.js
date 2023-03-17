export default function Course({ course }) {
  return (
    <>
      <div className="flex flex-col items-start space-y-[1px] hover:cursor-pointer">
        <h2 className="font-bold text-md pt-1">{course.title}</h2>
        <img src={course.image} alt={course.title} className="h-32 w-full" />
        <h2 className="text-xs text-gray-700">{course.author}</h2>

        <div className="flex space-x-1 items-center">
          <h3 className="text-[#EC0B5C] font-bold text-sm">{course.votes}</h3>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-4 w-4 text-orange-400"
            >
              <path
                fillRule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-xs text-gray-700">({course.students})</h3>
        </div>
      </div>
    </>
  );
}
