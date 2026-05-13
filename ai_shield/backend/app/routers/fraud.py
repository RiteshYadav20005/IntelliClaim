from fastapi import APIRouter, Response
from fastapi.responses import Response
from app.modules.explainability.report_gen import generate_pdf_report
from app.modules.explainability.shap_explainer import ShapExplainer
from app.modules.fraud_engine.scorer import FraudScore

router = APIRouter()
explainer = ShapExplainer()

@router.get("/score/{claim_id}")
async def get_fraud_score(claim_id: str):
    return {
        "claim_id": claim_id,
        "score": 0.72,
        "label": "HIGH",
        "action": "Escalate to SIU",
        "confidence": 0.94
    }

@router.get("/report/{claim_id}")
async def get_fraud_report(claim_id: str):
    shap_vals = explainer.explain({"dummy": 1})
    return {
        "claim_id": claim_id,
        "shap_explanation": shap_vals,
        "cross_verification": {
            "pan": {"status": "VERIFIED"},
            "aadhaar": {"status": "MISMATCH"},
            "bank": {"status": "VERIFIED"}
        }
    }

@router.get("/report/{claim_id}/download")
async def download_report(claim_id: str):
    # Generates a dummy report for now
    pdf_bytes = generate_pdf_report(
        claim_id=claim_id,
        fraud_score={"value": 0.72, "label": "HIGH", "action": "Escalate to SIU"},
        extracted_fields={"claimant_name": "Ritesh Yadav", "bill_amount": "50000"},
        cross_verify={"pan": {"status": "VERIFIED"}},
        shap_explanation=explainer.explain({})
    )
    return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": f"attachment; filename=report_{claim_id}.pdf"})
