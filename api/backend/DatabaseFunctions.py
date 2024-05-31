# STL
from typing import Optional

# PDM
import pymongo


def create_client():
    return pymongo.MongoClient("mongodb://root:example@vns-mongo:27017")


def load(db: str, collection: str, document: Optional[dict] = None) -> list:
    client = create_client()
    selected_db = client[db]
    selected_collection = selected_db[collection]

    return list(selected_collection.find(document))


def load_notes_db(collection: str, document: Optional[dict] = None) -> list:
    return load("notes", collection, document=document)
