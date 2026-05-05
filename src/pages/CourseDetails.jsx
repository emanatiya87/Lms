import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Rating,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FavoriteBorder, AccessTime, Star, People } from "@mui/icons-material";

export default function CourseDetails() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/mockCourses/${id}`);

        if (!res.ok) throw new Error("Failed to fetch course");

        const data = await res.json();
        setCourseData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!courseData) return <p>No course found.</p>;
  return (
    <div
      className="max-w-dvw flex justify-center items-center "
      style={{ background: "var(--gradient-hero)" }}
    >
      {" "}
      <Box className="min-h-screen ">
        <Box className="flex justify-center items-center text-dark">
          <Container maxWidth="xl" className="py-8 md:py-12">
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={7}>
                <Stack spacing={3}>
                  <Chip
                    label={courseData.category}
                    className="bg-white/20 text-white font-medium w-fit"
                    size="small"
                  />

                  <Typography
                    variant={isMobile ? "h4" : "h3"}
                    className="font-bold"
                  >
                    {courseData.title}
                  </Typography>

                  <Typography variant="body1" className="text-gray-800 text-lg">
                    {courseData.subtitle}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={3}
                    flexWrap="wrap"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Star className="text-yellow-400" />
                      <Typography variant="body1" className="font-semibold">
                        {courseData.rating}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        ({courseData.reviewCount.toLocaleString()} students)
                      </Typography>
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <People className="text-gray-700" />

                      <Typography variant="body2">
                        {courseData.enrolledCount.toLocaleString()} enrolled
                      </Typography>
                    </Stack>

                    <Chip
                      label={courseData.level}
                      className="bg-white/20 text-gray-700 font-medium w-fit"
                      size="small"
                    />
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar
                      src={courseData.instructor.avatar}
                      alt={courseData.instructor.name}
                      className="w-10 h-10 border-2 border-white"
                    />
                    <Box>
                      <Typography
                        variant="caption"
                        className="text-blue-900 block font-bold text-xl"
                      >
                        Instructor:
                      </Typography>
                      <Typography variant="body1" className="font-semibold">
                        {courseData.instructor.name}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>

              <Grid item xs={12} md={5}>
                <Card className="shadow-2xl">
                  <CardContent className="p-0">
                    {/*img to do */}
                    <Box className="relative bg-gray-900 aspect-video flex items-center justify-center group cursor-pointer">
                      <Box className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                      {/* <Box className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <PlayCircleOutline className="text-blue-600 w-8 h-8 ml-1" />
                    </Box> */}
                    </Box>

                    <Box className="p-6">
                      <Typography
                        variant="h4"
                        className="font-bold text-center mb-4 text-blue-600"
                      >
                        ${courseData.price}
                      </Typography>
                      <Link to={`/enroll/${courseData.id}`}>
                        <Button
                          variant="contained"
                          size="large"
                          className="bg-gray-900 hover:bg-gray-800 mb-3 py-3 text-base font-semibold w-2xs"
                        >
                          Enroll Now
                        </Button>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Container maxWidth="xl" className="py-8 md:py-12">
          <Grid container spacing={4}>
            {/* Left Column - About & Curriculum */}
            <Grid item xs={12} lg={8}>
              <Stack spacing={4}>
                {/* About This Course */}
                <Paper className="p-6 shadow-sm">
                  <Typography
                    variant="h6"
                    className="font-semibold mb-4 text-gray-800"
                  >
                    About This Course
                  </Typography>
                  <Typography
                    variant="body1"
                    className="text-gray-600 leading-relaxed"
                  >
                    {courseData.description}
                  </Typography>
                </Paper>

                {/* Course Curriculum */}
                <Paper className="p-6 shadow-sm">
                  <Typography
                    variant="h6"
                    className="font-semibold mb-4 text-gray-800"
                  >
                    Course Curriculum
                  </Typography>
                  <List className="divide-y divide-gray-100">
                    {courseData.curriculum.map((item, index) => (
                      <ListItem
                        key={item.id}
                        className="py-4 px-0 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <ListItemIcon className="min-w-8 mr-4">
                          <Box className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={item.title}
                          primaryTypographyProps={{
                            className: "font-medium text-gray-800",
                          }}
                        />
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          className="text-gray-500"
                        >
                          <AccessTime className="w-4 h-4" />
                          <Typography variant="body2">
                            {item.duration}
                          </Typography>
                        </Stack>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Stack>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper
                elevation={3}
                className="w-full p-6 rounded-2xl shadow-md sticky top-4 bg-white"
                sx={{
                  borderRadius: "16px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 2 }}
                  className="text-gray-900"
                >
                  Instructor
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center" mb={4}>
                  <Avatar
                    src={courseData.instructor.avatar}
                    alt={courseData.instructor.name}
                    sx={{ width: 64, height: 64 }}
                  />

                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 600 }}
                      className="text-gray-900"
                    >
                      {courseData.instructor.name}
                    </Typography>
                    <Typography variant="body2" className="text-gray-500">
                      Course Instructor
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 4 }} />

                <Stack spacing={2}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <Typography
                      variant="body2"
                      className="text-gray-700"
                      sx={{ fontWeight: 500 }}
                    >
                      <span className="font-semibold text-gray-900">
                        {courseData.instructor.rating}
                      </span>{" "}
                      Instructor Rating
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <People className="w-5 h-5 text-gray-400" />
                    <Typography variant="body2" className="text-gray-700">
                      {courseData.instructor.students.toLocaleString()} Students
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
