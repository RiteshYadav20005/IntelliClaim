from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class AuthRequest(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(req: AuthRequest):
    return {"access_token": "mocked_jwt_token", "token_type": "bearer"}

@router.post("/register")
async def register(req: AuthRequest):
    return {"message": "User registered successfully"}

@router.get("/me")
async def get_me():
    return {"username": "investigator_01", "role": "admin"}
