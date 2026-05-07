import { GraduationCap } from "lucide-react";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-lg">
      <span
        className="grid place-items-center w-9 h-9 rounded-xl text-primary-foreground"
        style={{ background: "var(--gradient-primary)" }}
      >
        <GraduationCap className="w-5 h-5" />
      </span>
      <span className="tracking-tight">
        <span className="text-primary">Courses App</span>
      </span>
    </Link>
  );
}
