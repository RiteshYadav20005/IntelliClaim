from fastapi import Request
from .config import get_settings

def get_db():
    # Placeholder for database session dependency
    yield "db_session"

def verify_token(request: Request):
    # Placeholder for JWT verification
    return {"user_id": "mock_user", "role": "investigator"}
