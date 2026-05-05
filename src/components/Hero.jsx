import React from "react";
import { Sparkles } from "lucide-react";
import { Search } from "lucide-react";
import Input from "./input";
import { Link } from "react-router";
import heroImg from "../assets/hero.jpg";
import Button from "@mui/material/Button";
import { PlayCircle, ArrowRight } from "lucide-react";
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 ">
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Learn skills that{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              change your future
            </span>
          </h1>
          <p className="text-lg text-gray-700 max-w-xl ">
            Master in-demand skills with practical, project-based courses taught
            by industry experts. Learn at your own pace.
          </p>

          <div
            className="flex items-center gap-2 p-2 bg-card rounded-2xl border max-w-xl border-gray-300"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <Search className="w-5 h-5 ml-3 text-gray-500 shrink-0" />
            <Input
              placeholder="What do you want to learn today?"
              className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
            />
            <Button
              variant="contained"
              component={Link}
              to="/courses"
              endIcon={<ArrowRight className="w-4 h-4" />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                paddingX: 2.5,
                paddingY: 1.2,
                borderRadius: "10px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="contained"
              component={Link}
              to="/courses"
              endIcon={<ArrowRight className="w-4 h-4" />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                paddingX: 2.5,
                paddingY: 1.2,
                borderRadius: "10px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#115293",
                },
              }}
            >
              Start Learning
            </Button>

            <Button
              variant="outlined"
              startIcon={<PlayCircle className="w-4 h-4" />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                paddingX: 2.5,
                paddingY: 1.2,
                borderRadius: "10px",
                borderWidth: 2,
                "&:hover": {
                  borderWidth: 2,
                  backgroundColor: "rgba(25,118,210,0.08)",
                },
              }}
            >
              Watch Demo
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div
            className="absolute -inset-4 rounded-3xl opacity-40"
            style={{
              background: "var(--gradient-primary)",
              filter: "blur(60px)",
            }}
          />
          <img
            src={heroImg}
            alt="Online learning illustration"
            width={1280}
            height={960}
            className="relative rounded-3xl w-full"
            style={{ boxShadow: "var(--shadow-glow)" }}
          />
        </div>
      </div>
    </section>
  );
}
