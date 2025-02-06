import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router";
import { convertDate } from "./lib";
import {
  List,
  ListItem,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface Note {
  _id: string;
  name: string;
  tags: Array<string>;
  group: string;
  dateUploaded: string;
}

const NotePage = () => {
  const [notes, setNotes] = useState<Array<Note>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("name");

  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const response = await fetch("/api/get_notes");
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOnClickNote = useCallback(
    (note: Note) => {
      navigate(`/note/${note._id}`, { state: note });
    },
    [navigate]
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback((event: SelectChangeEvent) => {
    setSearchCategory(event.target.value as string);
  }, []);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      if (searchCategory === "name") {
        return note.name.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (searchCategory === "tags") {
        return note.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else if (searchCategory === "group") {
        return note.group.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return false;
    });
  }, [notes, searchCategory, searchQuery]);

  return (
    <>
      <div className="flex flex-col mb-2">
        <div className="flex items-center">
          <TextField
            label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="!mr-2 w-3/4 max-sm:w-1/2"
          />
          <FormControl className="w-1/4 max-sm:w-1/2">
            <InputLabel>Search by</InputLabel>
            <Select
              value={searchCategory}
              onChange={handleCategoryChange}
              label="Search by"
            >
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="tags">Tag</MenuItem>
              <MenuItem value="group">Group</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <List>
          {filteredNotes &&
            filteredNotes.reverse().map((note: Note, index: number) => (
              <ListItem
                key={index}
                divider={true}
                className="flex flex-col !items-start"
              >
                <div
                  id="primary"
                  className="flex flex-row justify-between w-full align-middle"
                >
                  <p
                    className="m-0 hover:text-sky-500 hover:cursor-pointer !font-bold"
                    onClick={() => {
                      handleOnClickNote(note);
                    }}
                  >
                    {note.name}
                  </p>
                  <Typography variant="body2">
                    <p className="m-0">{convertDate(note.dateUploaded)}</p>
                  </Typography>
                </div>
                <div id="secondary">
                  <Typography variant="body2">{note.group}</Typography>
                  <div id="tags" className="flex">
                    {note.tags &&
                      note.tags.map((tag, tagIndex) => (
                        <div
                          id="tag"
                          key={tagIndex}
                          className="bg-gray-500 rounded-lg mr-1 p-0.5"
                        >
                          <Typography variant="caption" component="p">
                            #{tag}
                          </Typography>
                        </div>
                      ))}
                  </div>
                </div>
              </ListItem>
            ))}
        </List>
      </div>
    </>
  );
};

export default NotePage;
