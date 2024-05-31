# STL
import json
from typing import Any
from datetime import datetime

# PDM
import fastapi.responses
from bson import ObjectId
from pydantic import BaseModel


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        if isinstance(o, BaseModel):
            return o.dict()
        if isinstance(o, ObjectId):
            return str(o)
        if isinstance(o, bytes):
            return str(o)
        return super().default(o)


class JSONResponse(fastapi.responses.JSONResponse):
    def render(self, content: Any) -> bytes:
        return json.dumps(content, cls=JSONEncoder).encode("utf-8")
