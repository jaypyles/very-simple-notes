# PDM
from pydantic import BaseModel


class GetContent(BaseModel):
    note_id: str
