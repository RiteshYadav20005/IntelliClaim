from pydantic import BaseModel
from typing import List, Optional

class BoundingBox(BaseModel):
    x: int
    y: int
    w: int
    h: int

class OCRWord(BaseModel):
    text: str
    confidence: float
    box: BoundingBox

class OCRResult(BaseModel):
    raw_text: str
    words: List[OCRWord]
    average_confidence: float
    engine_used: str = "tesseract"
