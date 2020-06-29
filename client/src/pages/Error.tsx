import React from "react";
import { Link } from "react-router-dom";
export default function Error() {
  return (
    <div>
      <h1>Ooops!! your are lost</h1>
      <Link to="/todos">Go Back Todos Page</Link>
    </div>
  );
}
