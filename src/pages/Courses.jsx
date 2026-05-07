import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../redux/slices/coursesSlice";
import CourseCard from "../components/CourseCard";
import { categories } from "../const/categies";

export default function Courses() {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;

      const matchesSearch =
        !searchQuery ||
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [courses, selectedCategory, searchQuery]);

  const availableCategories = useMemo(() => {
    const cats = new Set(courses.map((c) => c.category));
    return ["All", ...categories.filter((c) => c !== "All" && cats.has(c))];
  }, [courses]);

  if (loading)
    return (
      <div className="py-12 text-center text-gray-500">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-4">Loading courses...</p>
      </div>
    );

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Explore Courses
        </h1>
        <p className="text-gray-600">
          Find the perfect course to advance your skills.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {(selectedCategory !== "All" || searchQuery) && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-sm text-gray-500">Filters:</span>
          {selectedCategory !== "All" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {selectedCategory}
              <button
                onClick={() => setSelectedCategory("All")}
                className="hover:text-blue-600"
              >
                ✕
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              "{searchQuery}"
              <button
                onClick={() => setSearchQuery("")}
                className="hover:text-gray-600"
              >
                ✕
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredCourses.length} of {courses.length} courses
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">
            No courses found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
