from PyPDF2 import PdfReader
from io import BytesIO
from app.utils.logger import logger

def extract_pdf_metadata(file_bytes: bytes) -> dict:
    suspicious_editors = ["ilovepdf", "gimp", "photoshop", "acrobat editor"]
    
    result = {
        "metadata_score": 0.0,
        "is_suspicious": False,
        "anomalies": []
    }
    
    try:
        reader = PdfReader(BytesIO(file_bytes))
        meta = reader.metadata
        
        if meta:
            creator = str(meta.get('/Creator', '')).lower()
            producer = str(meta.get('/Producer', '')).lower()
            
            for editor in suspicious_editors:
                if editor in creator or editor in producer:
                    result["anomalies"].append(f"Suspicious PDF Producer/Creator found: {editor}")
                    result["metadata_score"] = 0.8
                    result["is_suspicious"] = True
                    break
            
            # Additional checks for ModDate vs CreationDate could go here
    except Exception as e:
        logger.warning(f"Could not parse PDF metadata: {e}")
        # If it's an image, this fails gracefully.

    return result
