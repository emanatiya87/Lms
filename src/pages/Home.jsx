import React from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const { fullName, role } = useSelector((state) => state.user);
  return (
    <div>
      home name: <h1>{fullName}</h1>
      <p>{role}</p>
    </div>
  );
}
