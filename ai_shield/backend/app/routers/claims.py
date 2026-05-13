from fastapi import APIRouter, File, UploadFile, BackgroundTasks
from typing import Dict, Any
from app.schemas.claims import ClaimUploadResponse, ClaimStatusResponse
from app.modules.ocr.tesseract_ocr import TesseractOCR
from app.modules.nlp.ner_pipeline import NERPipeline
import uuid
from app.utils.logger import logger

router = APIRouter()

# Global mock DB for now
MOCK_CLAIMS_DB = {}

def process_document_pipeline(claim_id: str, file_bytes: bytes):
    try:
        # OCR
        ocr = TesseractOCR()
        ocr_result = ocr.extract(image_bytes=file_bytes)
        
        # NLP
        ner = NERPipeline()
        extracted = ner.extract_entities(ocr_result.raw_text)
        
        # In a real system, save to Postgres here
        MOCK_CLAIMS_DB[claim_id] = {
            "status": "COMPLETED",
            "extracted_data": extracted.model_dump(),
            "fraud_score": 0.45,
            "label": "MEDIUM"
        }
        logger.info(f"Pipeline completed for {claim_id}")
    except Exception as e:
        logger.error(f"Pipeline failed for {claim_id}: {e}")
        MOCK_CLAIMS_DB[claim_id] = {"status": "FAILED"}


@router.post("/upload", response_model=ClaimUploadResponse)
async def upload_claim(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    file_bytes = await file.read()
    claim_id = str(uuid.uuid4())
    
    MOCK_CLAIMS_DB[claim_id] = {"status": "PROCESSING"}
    
    background_tasks.add_task(process_document_pipeline, claim_id, file_bytes)
    
    return ClaimUploadResponse(claim_id=claim_id, message="Upload successful, processing started.", status="PROCESSING")

@router.get("/{claim_id}", response_model=ClaimStatusResponse)
async def get_claim(claim_id: str):
    data = MOCK_CLAIMS_DB.get(claim_id, {"status": "NOT_FOUND"})
    return ClaimStatusResponse(
        claim_id=claim_id,
        status=data.get("status", "NOT_FOUND"),
        extracted_data=data.get("extracted_data"),
        fraud_score=data.get("fraud_score"),
        label=data.get("label")
    )
