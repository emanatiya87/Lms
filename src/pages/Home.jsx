import React from "react";
import { useSelector } from "react-redux";
import Hero from "../components/Hero";
export default function Home() {
  const { fullName, role } = useSelector((state) => state.user);
  return (
    <>
      <Hero />
    </>
  );
}
