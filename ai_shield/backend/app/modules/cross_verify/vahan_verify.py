import random
from .models import VerificationResult

def verify_vahan(rc_number: str) -> VerificationResult:
    if not rc_number:
        return VerificationResult(status='PENDING', message='No RC provided', data={})

    rand = random.random()
    if rand < 0.05:
        return VerificationResult(status='NOT_FOUND', message='Vehicle RC not found', data={})
    elif rand < 0.20:
        return VerificationResult(
            status='MISMATCH', 
            message='Vehicle make/model mismatch', 
            data={"owner": "UNKNOWN", "make": "HONDA", "model": "CITY", "year": "2015"}
        )
    else:
        return VerificationResult(
            status='VERIFIED', 
            message='RC verified', 
            data={"owner": "VERIFIED USER", "make": "MARUTI", "model": "SWIFT", "year": "2020"}
        )
