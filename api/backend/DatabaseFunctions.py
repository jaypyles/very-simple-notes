# STL
from typing import Any, Optional, TypedDict, cast  # type: ignore [reportAny]

# PDM
import pymongo
from pymongo.mongo_client import MongoClient


class Document(TypedDict):
    ...


class Note(Document):
    name: str
    tags: list[str]
    group: str
    dateUploaded: str


def create_client() -> MongoClient[Any]:
    return pymongo.MongoClient("mongodb://root:example@vns-mongo:27017")


def load(
    db: str,
    collection: str,
    document: Optional[dict[str, Any]] = None,
    fields: Optional[dict[str, int]] = None,
) -> list[Document]:
    client = create_client()
    selected_db = client[db]
    selected_collection = selected_db[collection]

    return list(selected_collection.find(document, fields))


def load_notes_db(
    collection: str,
    document: Optional[dict[str, Any]] = None,
    fields: Optional[dict[str, int]] = None,
) -> list[Note]:
    documents = load("notes", collection, document=document, fields=fields)
    notes = cast(list[Note], documents)

    return notes


def get_note_content(note_id: str):
    client = create_client()
    note_db = client["note"]
    note_collection = note_db["note"]

    note = note_collection.find_one({"_id": note_id}, {"content": 1})
    return note["content"]
