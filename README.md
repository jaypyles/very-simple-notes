# Very Simple Notes

It's in the name. A tool used to generate and render static-webpages using markdown content.

[Companion Obsidian Plugin](https://github.com/jaypyles/very-simple-notes-obsidian)

## How does this work?

All notes are stored in MongoDB and delivered to the webapp, rendering the content to the page using `React-Markdown`.

## Features

- Search notes by name, group, or tag

![List of notes](https://github.com/jaypyles/very-simple-notes/blob/master/docs/NoteList.png)

- View individual note content

![Individual note](https://github.com/jaypyles/very-simple-notes/blob/master/docs/SingleNote.png)

## Deployment Guide

`make build up` will deploy the container and start it.
