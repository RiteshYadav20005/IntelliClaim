from fastapi import APIRouter
from app.schemas.claims import DashboardStats, RecentClaim
from datetime import datetime

router = APIRouter()

@router.get("/stats", response_model=DashboardStats)
async def get_stats():
    return DashboardStats(
        total_claims_today=1240,
        fraud_detected=62,
        auto_approved=850,
        manual_review=328
    )

@router.get("/feed")
async def get_feed():
    return [
        RecentClaim(claim_id="CLM-001", timestamp=datetime.now(), status="COMPLETED", score=0.88, label="HIGH").model_dump(),
        RecentClaim(claim_id="CLM-002", timestamp=datetime.now(), status="COMPLETED", score=0.12, label="LOW").model_dump(),
        RecentClaim(claim_id="CLM-003", timestamp=datetime.now(), status="PROCESSING", score=0, label="PENDING").model_dump()
    ]
