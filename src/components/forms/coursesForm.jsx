import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Paper,
  IconButton,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  updateCourse,
  clearSelectedCourse,
} from "../../redux/slices/coursesSlice";
import { categories } from "../../const/categies";

const levels = ["Beginner", "Intermediate", "Advanced", "All Levels"];

const CourseForm = () => {
  const dispatch = useDispatch();
  const { selectedCourse, loading } = useSelector((state) => state.courses);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    category: "Web Development",
    level: "Beginner",
    price: "",
    image: "",
    instructorName: "",
    instructorAvatar: "",
    curriculum: [],
  });

  const [errors, setErrors] = useState({});
  const [newModule, setNewModule] = useState({ title: "", duration: "" });

  useEffect(() => {
    if (selectedCourse) {
      setFormData({
        title: selectedCourse.title || "",
        subtitle: selectedCourse.subtitle || "",
        description: selectedCourse.description || "",
        category: selectedCourse.category || "Web Development",
        level: selectedCourse.level || "Beginner",
        price: selectedCourse.price?.toString() || "",
        image:
          selectedCourse.image ||
          "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y291cnNlfGVufDB8fDB8fHww",
        instructorName: selectedCourse.instructor?.name || "",
        instructorAvatar:
          selectedCourse.instructor?.avatar ||
          "https://plus.unsplash.com/premium_photo-1682787494977-d013bb5a8773?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y291cnNlfGVufDB8fDB8fHww",
        curriculum: selectedCourse.curriculum || [],
      });
    } else {
      resetForm();
    }
  }, [selectedCourse]);

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      category: "Web Development",
      level: "Beginner",
      price: "",
      image: "",
      instructorName: "",
      instructorAvatar: "",
      curriculum: [],
    });
    setErrors({});
    setNewModule({ title: "", duration: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCurriculumChange = (index, field, value) => {
    const updated = [...formData.curriculum];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, curriculum: updated }));
  };

  const addCurriculumModule = () => {
    if (newModule.title.trim()) {
      setFormData((prev) => ({
        ...prev,
        curriculum: [
          ...prev.curriculum,
          {
            id: Date.now(),
            title: newModule.title,
            duration: newModule.duration || "30min",
          },
        ],
      }));
      setNewModule({ title: "", duration: "" });
    }
  };

  const removeCurriculumModule = (index) => {
    setFormData((prev) => ({
      ...prev,
      curriculum: prev.curriculum.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const courseData = {
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      category: formData.category,
      level: formData.level,
      price: parseFloat(formData.price),
      image:
        formData.image ||
        `https://via.placeholder.com/400x225/3b82f6/ffffff?text=${encodeURIComponent(formData.title.substring(0, 20))}`,

      id: selectedCourse?.id,
      rating: selectedCourse?.rating || 0,
      reviewCount: selectedCourse?.reviewCount || 0,
      enrolledCount: selectedCourse?.enrolledCount || 0,

      instructor: {
        name:
          formData.instructorName ||
          selectedCourse?.instructor?.name ||
          "Unknown",
        avatar:
          formData.instructorAvatar ||
          selectedCourse?.instructor?.avatar ||
          "https://media.istockphoto.com/id/2269936899/photo/smiling-3d-businessman-character-pointing-and-giving-thumbs-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=OmuMG2Exnv9LpfbOYZPOBnF1ByXbd5iQDvnKAxXSIxI=",
        rating: selectedCourse?.instructor?.rating || 0,
        students: selectedCourse?.instructor?.students || 0,
      },

      curriculum:
        formData.curriculum.length > 0
          ? formData.curriculum
          : selectedCourse?.curriculum || [],

      createdAt: selectedCourse?.createdAt || new Date().toISOString(),
    };

    try {
      if (selectedCourse) {
        await dispatch(
          updateCourse({ id: selectedCourse.id, courseData }),
        ).unwrap();
      } else {
        await dispatch(createCourse(courseData)).unwrap();
      }
      resetForm();
      dispatch(clearSelectedCourse());
    } catch (error) {
      console.error("Failed to save course:", error);
    }
  };

  const handleCancel = () => {
    resetForm();
    dispatch(clearSelectedCourse());
  };

  return (
    <Paper
      elevation={3}
      className="p-6 rounded-xl bg-white  "
      sx={{ borderRadius: 3 }}
    >
      <div className="flex justify-between items-center mb-6 sticky top-0 bg-white pb-4">
        <Typography variant="h6" className="text-gray-800 font-semibold">
          {selectedCourse ? "Edit Course" : "Add new course"}
        </Typography>
        {selectedCourse && (
          <IconButton onClick={handleCancel} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          label="Title *"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
          placeholder="e.g. React Native Mobile Development"
          variant="outlined"
          size="small"
        />

        <TextField
          fullWidth
          label="Subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          placeholder="e.g. Cross-platform mobile apps with React Native"
          variant="outlined"
          size="small"
          sx={{ mt: 2 }}
        />

        <TextField
          fullWidth
          label="Description *"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          placeholder="What will students learn?"
          multiline
          rows={3}
          variant="outlined"
          sx={{ mt: 2 }}
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            variant="outlined"
            size="small"
          >
            {levels.map((lvl) => (
              <MenuItem key={lvl} value={lvl}>
                {lvl}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <TextField
            fullWidth
            label="Price ($)"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            variant="outlined"
            size="small"
          />

          <TextField
            fullWidth
            label="Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
            variant="outlined"
            size="small"
          />
        </div>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2" className="font-medium">
              Instructor Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="space-y-3">
            <TextField
              fullWidth
              label="Instructor Name"
              name="instructorName"
              value={formData.instructorName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="e.g. Lisa Anderson"
            />
            <TextField
              fullWidth
              label="Instructor Avatar URL"
              name="instructorAvatar"
              value={formData.instructorAvatar}
              onChange={handleChange}
              variant="outlined"
              size="small"
              placeholder="https://..."
              sx={{ mt: 2 }}
            />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2" className="font-medium">
              Curriculum ({formData.curriculum.length} modules)
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="space-y-3">
            {formData.curriculum.map((module, index) => (
              <Box
                key={module.id || index}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                <Box className="flex-1 grid grid-cols-2 gap-2">
                  <TextField
                    size="small"
                    placeholder="Module title"
                    value={module.title}
                    onChange={(e) =>
                      handleCurriculumChange(index, "title", e.target.value)
                    }
                  />
                  <TextField
                    size="small"
                    placeholder="Duration"
                    value={module.duration}
                    onChange={(e) =>
                      handleCurriculumChange(index, "duration", e.target.value)
                    }
                  />
                </Box>
                <IconButton
                  size="small"
                  onClick={() => removeCurriculumModule(index)}
                  className="text-red-500"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}

            <Box className="flex gap-2">
              <TextField
                size="small"
                placeholder="New module title"
                value={newModule.title}
                onChange={(e) =>
                  setNewModule((prev) => ({ ...prev, title: e.target.value }))
                }
                className="flex-1"
              />
              <TextField
                size="small"
                placeholder="Duration"
                value={newModule.duration}
                onChange={(e) =>
                  setNewModule((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                sx={{ width: 100 }}
              />
              <Button
                variant="outlined"
                size="small"
                onClick={addCurriculumModule}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box className="flex gap-3 mt-6 pt-4 border-t">
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            sx={{
              bgcolor: "primary.main",
              "&:hover": { bgcolor: "primary.dark" },
              textTransform: "none",
              fontWeight: 600,
              py: 1.5,
            }}
          >
            {loading
              ? "Saving..."
              : selectedCourse
                ? "Update Course"
                : "Publish course"}
          </Button>

          {selectedCourse && (
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              disabled={loading}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                py: 1.5,
                px: 3,
              }}
            >
              Cancel
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default CourseForm;
