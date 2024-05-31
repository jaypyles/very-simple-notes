import React from "react";
import { useParams, useLocation } from "react-router-dom";

const Note = () => {
  const location = useLocation();
  const { state } = location;
  const { name, tags, groups, content } = state || {};

  return <></>;
};

export default Note;
