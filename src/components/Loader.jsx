import React from "react";

export default function Loader() {
  return (
    <div className="emptyPage d-flex align-items-center">
      <div className="spinner-border text-light" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
