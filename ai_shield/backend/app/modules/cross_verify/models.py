from pydantic import BaseModel
from typing import Literal, Dict, Any

class VerificationResult(BaseModel):
    status: Literal['VERIFIED', 'MISMATCH', 'NOT_FOUND', 'PENDING']
    message: str
    data: Dict[str, Any]
