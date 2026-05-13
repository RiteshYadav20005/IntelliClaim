import random
from .models import VerificationResult

def verify_sarathi(dl_number: str) -> VerificationResult:
    if not dl_number:
        return VerificationResult(status='PENDING', message='No DL provided', data={})

    rand = random.random()
    if rand < 0.05:
        return VerificationResult(status='NOT_FOUND', message='Driving License not found', data={})
    elif rand < 0.20:
        return VerificationResult(
            status='MISMATCH', 
            message='DL expired or name mismatch', 
            data={"name": "UNKNOWN", "status": "EXPIRED"}
        )
    else:
        return VerificationResult(
            status='VERIFIED', 
            message='DL verified and ACTIVE', 
            data={"name": "VERIFIED USER", "status": "ACTIVE"}
        )
