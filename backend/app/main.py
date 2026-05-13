from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import claims, fraud, dashboard, auth
from app.utils.logger import logger

app = FastAPI(title="IntelliClaim API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(claims.router, prefix="/claims", tags=["Claims"])
app.include_router(fraud.router, prefix="/fraud", tags=["Fraud"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing IntelliClaim Backend Modules...")

@app.get("/")
def root():
    return {"message": "IntelliClaim API is active. Go to /docs for Swagger."}
