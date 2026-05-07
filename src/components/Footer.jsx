import { Typography, Link, Container, Box, Divider } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className=" text-gray-800 py-8 border-t border-gray-300  mt-4">
      <Container maxWidth="lg">
        <Box className="flex justify-center md:justify-end gap-6 mb-4">
          <Link
            href="#"
            color="inherit"
            underline="hover"
            className="hover:text-white transition-colors text-sm"
          >
            About Us
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            className="hover:text-white transition-colors text-sm"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            className="hover:text-white transition-colors text-sm"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            color="inherit"
            underline="hover"
            className="hover:text-white transition-colors text-sm"
          >
            Contact Support
          </Link>
        </Box>

        <Divider className="bg-gray-800" />

        <Box className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <Typography variant="body2" className="text-sm">
            &copy; {currentYear}{" "}
            <span className="text-white font-semibold">CoursesApp</span>. All
            rights reserved.
          </Typography>

          <Typography variant="caption" className="text-gray-500 text-xs">
            Built with React, Redux, Tailwind & MUI
          </Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
