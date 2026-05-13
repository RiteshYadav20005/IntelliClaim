import random
from .models import VerificationResult

def verify_bank(account_number: str, ifsc: str) -> VerificationResult:
    if not account_number or not ifsc:
        return VerificationResult(status='PENDING', message='Bank details missing', data={})

    rand = random.random()
    if rand < 0.05:
        return VerificationResult(status='NOT_FOUND', message='Account does not exist', data={})
    elif rand < 0.20:
        return VerificationResult(
            status='MISMATCH', 
            message='Beneficiary name mismatch via penny drop', 
            data={"beneficiary": "UNKNOWN ALIAS"}
        )
    else:
        return VerificationResult(
            status='VERIFIED', 
            message='Penny drop successful', 
            data={"beneficiary": "MATCHED NAME"}
        )
