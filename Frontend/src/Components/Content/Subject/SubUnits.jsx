import React from "react";
import { useParams } from "react-router-dom";

function SubDetails() {
  const { subject } = useParams();
  return <div>Hello{subject}</div>;
}

export default SubDetails;
