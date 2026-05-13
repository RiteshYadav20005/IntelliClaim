import os
import joblib
import pandas as pd
from app.utils.logger import logger

class TabularFraudModel:
    def __init__(self, model_path: str = "models/tabular_model.joblib"):
        self.model_path = model_path
        self.model = None
        self._load_model()

    def _load_model(self):
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                logger.info("Loaded Tabular Fraud Model successfully.")
            except Exception as e:
                logger.error(f"Failed to load model from {self.model_path}: {e}")
        else:
            logger.warning(f"No model found at {self.model_path}. Please train the model first.")

    def predict(self, feature_dict: dict) -> float:
        """
        Takes a dictionary of 25 features and returns a fraud probability (0 to 1).
        """
        if not self.model:
            # If no model is trained, return an arbitrary score for testing
            return 0.15 
            
        df = pd.DataFrame([feature_dict])
        
        # Expected features handling would go here (one-hot encoding etc. depending on training pipeline)
        # Assuming the model pipeline handles preprocessing via sklearn Pipeline
        
        try:
            prob = self.model.predict_proba(df)[0][1]
            return float(prob)
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return 0.5
