import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";

interface Note {
  name: string;
  tags: Array<string>;
  group: string;
  content: string;
}

const NotePage = () => {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/get_notes");
      const data = await response.json();
      setNotes(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOnClickNote = (note: Note) => {
    navigate(`/note/${note.name}`, { state: note });
  };

  useEffect(() => {
    const getNotes = async () => {
      fetchNotes();
    };
    getNotes();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-between">
          <h1 className="mr-4">Note Logo Placeholder</h1>
          <div className="flex">
            <TextField label="search"></TextField>
          </div>
        </div>
      </div>
      <div>
        <List>
          {notes &&
            notes.map((note, index) => {
              return (
                <ListItem key={index} divider={true}>
                  <div id="primary">
                    <Typography variant="body1">
                      <p
                        className="m-0 hover:text-sky-500 hover:cursor-pointer"
                        onClick={() => {
                          handleOnClickNote(note);
                        }}
                      >
                        {note.name}
                      </p>
                    </Typography>
                    <div id="secondary">
                      <Typography variant="body2">{note.group}</Typography>
                      <div id="tags" className="flex">
                        {note.tags &&
                          note.tags.map((tag, index) => {
                            return (
                              <div
                                id="tag"
                                className="bg-gray-500 rounded-lg mr-1 p-0.5"
                              >
                                <Typography
                                  key={index}
                                  variant="caption"
                                  component="p"
                                >
                                  #{tag}
                                </Typography>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </ListItem>
              );
            })}
        </List>
      </div>
    </>
  );
};

export default NotePage;
