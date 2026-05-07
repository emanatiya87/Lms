import React, { useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Rating,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  deleteCourse,
  setSelectedCourse,
  clearSelectedCourse,
} from "../redux/slices/coursesSlice";
import CourseForm from "../components/forms/coursesForm";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [courseToDelete, setCourseToDelete] = React.useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEdit = (course) => {
    dispatch(setSelectedCourse(course));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (courseToDelete) {
      try {
        await dispatch(deleteCourse(courseToDelete.id)).unwrap();
        setDeleteDialogOpen(false);
        setCourseToDelete(null);
      } catch (error) {
        console.error("Failed to delete course:", error);
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCourseToDelete(null);
  };

  const getSafeValue = (obj, path, defaultValue = "") => {
    return (
      path.split(".").reduce((acc, part) => acc?.[part], obj) ?? defaultValue
    );
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Web Development": "bg-blue-100 text-blue-800",
      "Mobile Development": "bg-purple-100 text-purple-800",
      "Data Science": "bg-green-100 text-green-800",
      "AI & Machine Learning": "bg-indigo-100 text-indigo-800",
      Design: "bg-pink-100 text-pink-800",
      Business: "bg-yellow-100 text-yellow-800",
      Marketing: "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  if (loading && courses.length === 0) {
    return (
      <Box className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Typography
          variant="h4"
          className="text-gray-800 font-bold mb-8"
          sx={{ fontWeight: 700 }}
        >
          Course Management Dashboard
        </Typography>

        {error && (
          <Alert severity="error" className="mb-6">
            {error}
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course List */}
          <div className="lg:col-span-2">
            <Box className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <Typography
                  variant="h6"
                  className="text-gray-800 font-semibold"
                >
                  Your courses
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {courses.length} total
                </Typography>
              </div>

              {loading ? (
                <Box className="flex justify-center py-8">
                  <CircularProgress size={40} />
                </Box>
              ) : courses.length === 0 ? (
                <Box className="text-center py-12 text-gray-500">
                  <Typography>
                    No courses found. Create your first course!
                  </Typography>
                </Box>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => {
                    // Safe access to all course properties
                    const title = course?.title || "Untitled Course";
                    const subtitle = course?.subtitle || "";
                    const image =
                      course?.image ||
                      "https://via.placeholder.com/400x225?text=No+Image";
                    const category = course?.category || "Uncategorized";
                    const level = course?.level || "All Levels";
                    const price = course?.price ?? 0;
                    const rating = course?.rating ?? 0;
                    const reviewCount = course?.reviewCount ?? 0;
                    const enrolledCount = course?.enrolledCount ?? 0;
                    const instructor = course?.instructor || {};
                    const instructorName = instructor?.name || "Unknown";
                    const instructorAvatar =
                      instructor?.avatar || "https://via.placeholder.com/40";

                    return (
                      <Box
                        key={course?.id || Math.random()}
                        className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-white"
                      >
                        <img
                          src={image}
                          alt={title}
                          className="w-24 h-16 object-cover rounded-lg shrink-0"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x225?text=Image+Error";
                          }}
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Typography
                                variant="subtitle1"
                                className="font-semibold text-gray-800 truncate"
                              >
                                {title}
                              </Typography>
                              {subtitle && (
                                <Typography
                                  variant="body2"
                                  className="text-gray-500 text-sm truncate"
                                >
                                  {subtitle}
                                </Typography>
                              )}
                            </div>
                            <Chip
                              label={level}
                              size="small"
                              className={`text-xs font-medium ${
                                level === "Beginner"
                                  ? "bg-green-100 text-green-800"
                                  : level === "Intermediate"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            />
                          </div>

                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <Chip
                              label={category}
                              size="small"
                              className={getCategoryColor(category)}
                            />
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <StarIcon
                                className="text-yellow-500"
                                fontSize="small"
                              />
                              <span>{rating.toFixed(1)}</span>
                              <span className="text-gray-400">
                                ({reviewCount.toLocaleString()})
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <PeopleIcon fontSize="small" />
                              <span>
                                {enrolledCount.toLocaleString()} enrolled
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <img
                                src={instructorAvatar}
                                alt={instructorName}
                                className="w-6 h-6 rounded-full object-cover"
                                onError={(e) => {
                                  e.target.src =
                                    "https://via.placeholder.com/24";
                                }}
                              />
                              <Typography
                                variant="caption"
                                className="text-gray-500"
                              >
                                {instructorName}
                              </Typography>
                            </div>
                            <Typography
                              variant="h6"
                              className="font-bold text-blue-600"
                            >
                              ${price.toFixed(2)}
                            </Typography>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1 justify-center">
                          <IconButton
                            onClick={() => handleEdit(course)}
                            size="small"
                            className="text-blue-600 hover:bg-blue-50"
                            title="Edit course"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(course)}
                            size="small"
                            className="text-red-600 hover:bg-red-50"
                            title="Delete course"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </Box>
                    );
                  })}
                </div>
              )}
            </Box>
          </div>

          {/* Course Form */}
          <div className="lg:col-span-1">
            <CourseForm />
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "
            {courseToDelete?.title || "this course"}"? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;
