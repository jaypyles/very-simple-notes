import React from "react";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { Divider, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { convertDate } from "./lib";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

const Note = () => {
  const location = useLocation();
  const { state } = location;
  const { name, tags, group, content, dateUploaded } = state || {};

  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body2">{convertDate(dateUploaded)}</Typography>
      </div>
      <div className="flex">
        <Typography variant="body1" component="p" style={{ marginRight: 4 }}>
          {group}
        </Typography>
        {tags &&
          tags.map((tag: string, tagIndex: number) => {
            return (
              <div
                id="tag"
                key={tagIndex}
                className="bg-gray-500 rounded-lg mr-1 p-0.5"
              >
                <Typography variant="caption" component="p">
                  #{tag}
                </Typography>
              </div>
            );
          })}
      </div>
      <Divider
        sx={{ borderBottomWidth: 5, marginBottom: 2, marginTop: 1 }}
      ></Divider>
      <div className="">
        <Markdown
          children={content}
          rehypePlugins={[rehypeRaw]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dracula}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        />
      </div>
    </>
  );
};

export default Note;
