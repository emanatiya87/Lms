import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className=" rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition group">
      <div className="h-36 flex items-center justify-center text-white text-4xl font-bold">
        <img src={course.image} alt={course.title} />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 bg-ray-300">
          {course.title}
        </h3>
        <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          {course.category}
        </span>
        <p className="mt-2 text-gray-600 text-sm line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-500">
            👨‍🏫 {course.instructor.name}
          </span>
          <Link
            to={`/course/${course.id}`}
            className="text-sm font-medium text-blue-600 group-hover:underline"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}
