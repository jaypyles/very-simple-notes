import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Divider, Typography } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { convertDate } from "./lib";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";

const Note = () => {
  const [content, setContent] = useState<string | null>(null);
  const [note, setNote] = useState<any | null>(null);

  const { _id } = useParams();

  console.log(`_id: ${_id}`);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/get_note_content/${_id}`, {});
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data.note) {
          throw new Error("Note data is missing from response");
        }

        setNote(data.note);
        setContent(data.note.content);
      } catch (error) {
        console.error("Failed to fetch note:", error);
        setContent(null);
        setNote(null);
      }
    };

    fetchContent();
  }, [_id]);

  return (
    note && (
      <>
        <div className="flex flex-row items-center justify-between w-full">
          <Typography variant="h3" style={{ fontWeight: 600 }}>
            <h3 className="text-5xl max-sm:text-[2rem]">{note.name}</h3>
          </Typography>
          <Typography variant="body2">
            {convertDate(note.dateUploaded)}
          </Typography>
        </div>
        <div className="flex">
          <Typography variant="body1" component="p" style={{ marginRight: 4 }}>
            {note.group}
          </Typography>
          {note.tags &&
            note.tags.map((tag: string, tagIndex: number) => {
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
    )
  );
};

export default Note;
