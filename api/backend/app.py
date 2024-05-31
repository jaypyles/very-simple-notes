# STL
import logging

# PDM
from fastapi import FastAPI
from backend.utils import JSONResponse
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from backend.DatabaseFunctions import load_notes_db

LOG = logging.getLogger(__name__)

app = FastAPI(title="api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="./build/static"), name="static")


@app.get("/")
def read_root():
    return FileResponse("./build/index.html")


@app.get("/api/get_notes")
def get_notes():
    notes = load_notes_db("note")
    return JSONResponse(notes)


@app.get("/api/get_groups")
def get_groups():
    groups = load_notes_db("group")
    return JSONResponse(groups)
