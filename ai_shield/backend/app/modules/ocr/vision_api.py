import os
from google.cloud import vision
from app.schemas.ocr import OCRResult, OCRWord, BoundingBox
from app.utils.logger import logger

class VisionAPI:
    def __init__(self):
        # Client initialized based on GOOGLE_APPLICATION_CREDENTIALS in env
        try:
            self.client = vision.ImageAnnotatorClient()
        except Exception as e:
            logger.warning(f"Vision API init failed: {e}. Will mock if called.")
            self.client = None

    def extract(self, image_path: str = None, image_bytes: bytes = None) -> OCRResult:
        logger.info("Falling back to Google Vision API due to low Tesseract confidence.")
        
        if not self.client:
            # Provide mock response if environment is not set up
            return OCRResult(
                raw_text="MOCK VISION API EXTRACTED TEXT FROM HIGH QUALITY GOOGLE GCP.",
                words=[OCRWord(text="MOCK", confidence=0.99, box=BoundingBox(x=0,y=0,w=10,h=10))],
                average_confidence=0.99,
                engine_used="vision_api_mock"
            )

        if image_path:
            with open(image_path, "rb") as image_file:
                content = image_file.content
        elif image_bytes:
            content = image_bytes
            
        image = vision.Image(content=content)
        response = self.client.text_detection(image=image)
        
        if response.error.message:
            raise Exception(f"Vision API Error: {response.error.message}")

        texts = response.text_annotations
        raw_text = texts[0].description if texts else ""
        
        words = []
        # Exclude the first element as it contains the entire text
        for text in texts[1:]:
            vertices = text.bounding_poly.vertices
            x = min(v.x for v in vertices)
            y = min(v.y for v in vertices)
            w = max(v.x for v in vertices) - x
            h = max(v.y for v in vertices) - y
            
            # Google vision doesn't provide word-level confidence natively in text_detection
            # document_text_detection does, but text_detection is fine for a general estimate
            words.append(
                OCRWord(
                    text=text.description,
                    confidence=0.95, # Mocked confidence for word level
                    box=BoundingBox(x=x, y=y, w=w, h=h)
                )
            )
            
        return OCRResult(
            raw_text=raw_text,
            words=words,
            average_confidence=0.95,
            engine_used="vision_api"
        )
