import re
from transformers import pipeline
from app.modules.nlp.field_schema import ExtractedFields
from app.utils.logger import logger

class NERPipeline:
    def __init__(self):
        # We use a mocked/standard BERT model for initialization. In production, 
        # this would be fine-tuned on insurance documents to extract specific labels.
        logger.info("Initializing BERT NER Pipeline")
        try:
            self.nlp = pipeline('ner', model='dslim/bert-base-NER', aggregation_strategy="simple")
        except Exception as e:
            logger.warning(f"Could not load specified HF model: {e}. Falling back to default NER.")
            self.nlp = None

    def extract_entities(self, text: str) -> ExtractedFields:
        # 1. Base BERT Extraction
        entities = {}
        if self.nlp:
            try:
                hf_entities = self.nlp(text)
                # Map standard PER, ORG, LOC to our custom needs loosely
                for ent in hf_entities:
                    if ent['entity_group'] == 'PER' and not entities.get('claimant_name'):
                        entities['claimant_name'] = ent['word']
                    elif ent['entity_group'] == 'ORG' and not entities.get('hospital_name'):
                        entities['hospital_name'] = ent['word']
            except Exception as e:
                logger.error(f"NER Extraction failed {e}")

        # 2. Post-processing: Regex fallback for structured fields
        extracted = ExtractedFields(**entities)
        
        # PAN (regex: [A-Z]{5}[0-9]{4}[A-Z])
        pan_match = re.search(r"[A-Z]{5}[0-9]{4}[A-Z]", text)
        if pan_match:
            extracted.pan_number = pan_match.group(0)

        # Aadhaar (regex: \d{4}\s\d{4}\s\d{4} or similar)
        aadhaar_match = re.search(r"\b\d{4}\s?\d{4}\s?\d{4}\b", text)
        if aadhaar_match:
            extracted.aadhaar_number = aadhaar_match.group(0).replace(" ", "")

        # Dates (DD/MM/YYYY, YYYY-MM-DD)
        date_pattern = r"\b(\d{2}/\d{2}/\d{4}|\d{4}-\d{2}-\d{2})\b"
        dates = re.findall(date_pattern, text)
        if len(dates) >= 1:
            extracted.admission_date = dates[0]
        if len(dates) >= 2:
            extracted.discharge_date = dates[1]

        # Amounts (₹ patterns) - rough approximation
        amount_match = re.search(r"(?:₹|Rs\.?|INR)\s*([\d,]+\.?\d{0,2})", text, re.IGNORECASE)
        if amount_match:
            try:
                clean_amt = amount_match.group(1).replace(",", "")
                extracted.bill_amount = float(clean_amt)
            except ValueError:
                pass
                
        return extracted
