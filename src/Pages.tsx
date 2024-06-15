import React from "react";
import Layout from "./Layout";
import Note from "./Note";
import NotePage from "./NotePage";

export const NoteList = () => {
  return (
    <Layout>
      <NotePage />
    </Layout>
  );
};

export const SingleNote = () => {
  return (
    <Layout>
      <Note />
    </Layout>
  );
};
