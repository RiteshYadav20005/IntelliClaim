from pydantic import BaseModel, Field
from typing import Optional, List

class ExtractedFields(BaseModel):
    claimant_name: Optional[str] = Field(None, description="CLAIMANT_NAME")
    policy_number: Optional[str] = Field(None, description="POLICY_NUMBER")
    hospital_name: Optional[str] = Field(None, description="HOSPITAL_NAME")
    doctor_name: Optional[str] = Field(None, description="DOCTOR_NAME")
    admission_date: Optional[str] = Field(None, description="ADMISSION_DATE")
    discharge_date: Optional[str] = Field(None, description="DISCHARGE_DATE")
    bill_amount: Optional[float] = Field(None, description="BILL_AMOUNT")
    line_items: List[dict] = Field(default_factory=list, description="LINE_ITEM")
    diagnosis_code: Optional[str] = Field(None, description="DIAGNOSIS_CODE")
    pan_number: Optional[str] = Field(None, description="PAN_NUMBER")
    aadhaar_number: Optional[str] = Field(None, description="AADHAAR_NUMBER")
    bank_account: Optional[str] = Field(None, description="BANK_ACCOUNT")
