import React from "react";
import { fetchCourses } from "../redux/slices/coursesSlice";
import CourseCard from "./CourseCard";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
export default function SomeCourses() {
  const dispatch = useDispatch();

  const { courses, loading, error } = useSelector((state) => state.courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  const { fullName, role } = useSelector((state) => state.user);
  const selectedCourses = courses.slice(0, 5);
  if (error)
    return (
      <div className="py-12 text-center text-red-500">
        <p className="font-medium">Failed to load courses</p>
        <p className="text-sm mt-1">{error}</p>
        <button
          onClick={() => dispatch(fetchCourses())}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <>
      <div className="max-w-[80%] mx-auto mt-3">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome{" "}
            {role && (
              <>
                {role}: {fullName}
              </>
            )}{" "}
            , Explore Courses
          </h1>
          <p className="text-gray-600">
            Find the perfect course to advance your skills.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </>
  );
}
