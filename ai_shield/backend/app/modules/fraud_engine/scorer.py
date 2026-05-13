from pydantic import BaseModel
from typing import Literal

class FraudScore(BaseModel):
    value: float # 0 to 1
    label: Literal['LOW', 'MEDIUM', 'HIGH']
    action: str
    confidence: float

def combine_scores(tabular_score: float, image_score: float, metadata_score: float, cross_verify_score: float) -> FraudScore:
    """
    Weighted combination of all scores to produce a final fraud score.
    Weights: 
    - tabular_score: 40%
    - image_score: 30%
    - metadata_score: 15%
    - cross_verify_score: 15%
    """
    final_value = (tabular_score * 0.40) + (image_score * 0.30) + (metadata_score * 0.15) + (cross_verify_score * 0.15)
    
    if final_value >= 0.70:
        label = "HIGH"
        action = "Reject or Escalate to SIU"
    elif final_value >= 0.40:
        label = "MEDIUM"
        action = "Manual Review Required"
    else:
        label = "LOW"
        action = "Auto-Approve"
        
    # Calculate confidence based on the variance/agreement of the models
    # Simplified mock confidence
    confidence = 0.92
    
    return FraudScore(
        value=round(final_value, 4),
        label=label,
        action=action,
        confidence=confidence
    )
