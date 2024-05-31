import React from "react";
import { useParams, useLocation } from "react-router-dom";
import Markdown from "react-markdown";

const Note = () => {
  const location = useLocation();
  const { state } = location;
  const { name, tags, groups, content } = state || {};

  console.log(`CONTENT: ${content}`);

  return (
    <>
      <div className="">
        <Markdown>{content}</Markdown>
      </div>
    </>
  );
};

export default Note;
