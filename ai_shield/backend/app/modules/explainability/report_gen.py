import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from io import BytesIO

def generate_pdf_report(claim_id: str, fraud_score: dict, extracted_fields: dict, cross_verify: dict, shap_explanation: list) -> bytes:
    buffer = BytesIO()
    p = canvas.Canvas(buffer, pagesize=letter)
    
    # 1. Title & Header
    p.setFont("Helvetica-Bold", 20)
    p.drawString(50, 750, f"IntelliShield Fraud Investigation Report")
    
    p.setFont("Helvetica", 12)
    p.drawString(50, 720, f"Claim ID: {claim_id}")
    
    # 2. Score
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, 680, f"Final Risk Score: {fraud_score.get('value', 0.0)} ({fraud_score.get('label', 'UNKNOWN')})")
    p.setFont("Helvetica", 12)
    p.drawString(50, 660, f"Recommended Action: {fraud_score.get('action', 'N/A')}")
    
    # 3. Features
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, 620, "1. Extracted Entities (NLP)")
    p.setFont("Helvetica", 11)
    y = 600
    for key, val in extracted_fields.items():
        if val:
            p.drawString(60, y, f"{key}: {val}")
            y -= 20
            
    # 4. SHAP
    y -= 20
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, y, "2. Top Fraud Drivers (SHAP Explanation)")
    y -= 20
    p.setFont("Helvetica", 11)
    for expl in shap_explanation:
        p.drawString(60, y, f"- {expl['feature']}: {expl['contribution']} ({expl['effect']})")
        y -= 20
        
    # 5. Cross Verification
    y -= 20
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, y, "3. Cross-Verification Results")
    y -= 20
    p.setFont("Helvetica", 11)
    for service, result in cross_verify.items():
        p.drawString(60, y, f"- {service.upper()}: {result.get('status', 'PENDING')} | {result.get('message', '')}")
        y -= 20
        
    p.showPage()
    p.save()
    
    return buffer.getvalue()
