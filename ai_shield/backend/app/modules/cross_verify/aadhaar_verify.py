import random
from .models import VerificationResult

def verify_aadhaar(aadhaar_number: str) -> VerificationResult:
    if not aadhaar_number:
        return VerificationResult(status='NOT_FOUND', message='Aadhaar missing', data={})

    rand = random.random()
    if rand < 0.05:
        return VerificationResult(status='NOT_FOUND', message='Aadhaar not found in UIDAI', data={})
    elif rand < 0.20:
        return VerificationResult(
            status='MISMATCH', 
            message='Biometric/OTP mismatch', 
            data={"masked_number": "XXXX XXXX " + aadhaar_number[-4:]}
        )
    else:
        return VerificationResult(
            status='VERIFIED', 
            message='Aadhaar OTP verified', 
            data={"masked_number": "XXXX XXXX " + aadhaar_number[-4:]}
        )
