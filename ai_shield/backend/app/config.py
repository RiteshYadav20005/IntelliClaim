from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    GEMINI_API_KEY: str = ""
    MONGODB_URL: str = "mongodb://mongodb:27017/"
    POSTGRES_URL: str = "postgresql+asyncpg://postgres:postgres@postgres:5432/intellishield"
    REDIS_URL: str = "redis://redis:6379/0"
    
    JWT_SECRET: str = "your_strong_jwt_secret_key"
    JWT_ALGORITHM: str = "HS256"
    
    # Mock IPs or file paths
    GOOGLE_APPLICATION_CREDENTIALS: str = ""
    MOCK_NSDL_API_KEY: str = "mock"
    MOCK_UIDAI_API_KEY: str = "mock"
    
    model_config = SettingsConfigDict(env_file="../../.env", env_file_encoding="utf-8", extra="ignore")

@lru_cache()
def get_settings() -> Settings:
    return Settings()
