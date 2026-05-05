import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/slices/coursesSlice";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading)
    return (
      <div className="py-12 text-center text-gray-500">Loading courses...</div>
    );
  if (error)
    return (
      <div className="py-12 text-center text-red-500">
        Failed to load: {error}
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Explore Courses</h1>
      <p className="text-gray-600 mb-8">
        Find the perfect course to advance your skills.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No courses available yet.
        </div>
      )}
    </div>
  );
}
