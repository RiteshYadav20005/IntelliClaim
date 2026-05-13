from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class ClaimUploadResponse(BaseModel):
    claim_id: str
    message: str
    status: str

class ClaimStatusResponse(BaseModel):
    claim_id: str
    status: str 
    extracted_data: Optional[Dict[str, Any]]
    fraud_score: Optional[float]
    label: Optional[str]

class DashboardStats(BaseModel):
    total_claims_today: int
    fraud_detected: int
    auto_approved: int
    manual_review: int

class RecentClaim(BaseModel):
    claim_id: str
    timestamp: datetime
    status: str
    score: float
    label: str
