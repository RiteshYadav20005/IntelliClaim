import random
import re
from .models import VerificationResult

def verify_pan(pan_number: str, claimant_name: str) -> VerificationResult:
    if not pan_number or not re.match(r"[A-Z]{5}[0-9]{4}[A-Z]", pan_number):
        return VerificationResult(status='NOT_FOUND', message='Invalid PAN format', data={})
        
    rand = random.random()
    if rand < 0.05: # 5% NOT FOUND
        return VerificationResult(status='NOT_FOUND', message='PAN not found in NSDL DB', data={})
    elif rand < 0.20: # 15% MISMATCH
        return VerificationResult(
            status='MISMATCH', 
            message='Name mismatch with NSDL records', 
            data={"registered_name": "JOHN DOE", "dob": "01/01/1980"}
        )
    else:
        return VerificationResult(
            status='VERIFIED', 
            message='PAN verified successfully', 
            data={"registered_name": claimant_name.upper() if claimant_name else "MOCKED NAME", "dob": "01/01/1980"}
        )
