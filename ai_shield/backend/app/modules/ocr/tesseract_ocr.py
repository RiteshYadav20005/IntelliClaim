import cv2
import numpy as np
import pytesseract
from PIL import Image
from app.schemas.ocr import OCRResult, OCRWord, BoundingBox
from app.utils.logger import logger

class TesseractOCR:
    def __init__(self):
        # Configure tesseract for English and Hindi
        self.lang = "eng+hin"
        self.config = "--psm 3"
        
    def preprocess_image(self, image_np: np.ndarray) -> np.ndarray:
        """
        Grayscale, deskew, and denoise image using OpenCV before Tesseract.
        """
        # Convert to grayscale
        gray = cv2.cvtColor(image_np, cv2.COLOR_BGR2GRAY)
        
        # Denoise
        denoised = cv2.fastNlMeansDenoising(gray, h=30)
        
        # Thresholding
        _, thresh = cv2.threshold(denoised, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
        return thresh

    def extract(self, image_path: str = None, image_bytes: bytes = None) -> OCRResult:
        if image_path:
            img = cv2.imread(image_path)
        elif image_bytes:
            nparr = np.frombuffer(image_bytes, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        else:
            raise ValueError("Provide image_path or image_bytes")

        # Basic DPI Normalisation (simulate resolution check via size)
        h, w = img.shape[:2]
        if w < 1000:
            scale = 1000 / w
            img = cv2.resize(img, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)

        processed_img = self.preprocess_image(img)
        
        data = pytesseract.image_to_data(processed_img, lang=self.lang, config=self.config, output_type=pytesseract.Output.DICT)
        
        words = []
        confidences = []
        raw_text_parts = []
        
        n_boxes = len(data['text'])
        for i in range(n_boxes):
            text = data['text'][i].strip()
            conf = int(data['conf'][i])
            
            if conf > 0 and len(text) > 0:
                words.append(
                    OCRWord(
                        text=text,
                        confidence=conf / 100.0,
                        box=BoundingBox(
                            x=data['left'][i],
                            y=data['top'][i],
                            w=data['width'][i],
                            h=data['height'][i]
                        )
                    )
                )
                confidences.append(conf / 100.0)
                raw_text_parts.append(text)
                
        avg_conf = sum(confidences) / len(confidences) if confidences else 0.0
        logger.info(f"Tesseract extraction complete. Avg Confidence: {avg_conf:.2f}")
        
        return OCRResult(
            raw_text=" ".join(raw_text_parts),
            words=words,
            average_confidence=avg_conf,
            engine_used="tesseract"
        )
