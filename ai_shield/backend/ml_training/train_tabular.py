import os
import pandas as pd
import joblib
import xgboost as xgb
from sklearn.ensemble import RandomForestClassifier, VotingClassifier
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.metrics import precision_score, recall_score, roc_auc_score, classification_report

def train_tabular_model(data_path="Insurance_Fraud_Dataset.csv", model_path="models/tabular_model.joblib"):
    print(f"Loading data from {data_path}...")
    
    # Mock data generation if file doesn't exist
    if not os.path.exists(data_path):
        import numpy as np
        print("Dataset not found. Generating mock training data...")
        n_samples = 500
        df = pd.DataFrame({
            "claim_amount": np.random.randint(5000, 500000, n_samples),
            "stay_days": np.random.randint(1, 30, n_samples),
            "prior_claims_count": np.random.randint(0, 10, n_samples),
            "line_item_sum": np.random.randint(5000, 500000, n_samples),
            "amount_delta": np.random.randint(0, 50000, n_samples),
            "admission_to_discharge_days": np.random.randint(1, 30, n_samples),
            "days_since_last_claim": np.random.randint(10, 1000, n_samples),
            "claim_type": np.random.choice(["Health", "Motor"], n_samples),
            "state": np.random.choice(["MH", "DL", "KA", "UP"], n_samples),
            "insurer": np.random.choice(["LIC", "HDFC", "ICICI"], n_samples),
            "risk_tier": np.random.choice(["Low", "Medium", "High"], n_samples),
            "date_anomaly_flag": np.random.choice([0, 1], n_samples, p=[0.9, 0.1]),
            "total_mismatch_flag": np.random.choice([0, 1], n_samples, p=[0.85, 0.15]),
            "duplicate_pan_flag": np.random.choice([0, 1], n_samples, p=[0.95, 0.05]),
            "suspicious_hospital_flag": np.random.choice([0, 1], n_samples, p=[0.9, 0.1]),
            "Is_Fraud": np.random.choice([0, 1], n_samples, p=[0.8, 0.2])
        })
    else:
        df = pd.read_csv(data_path)

    # Separate features and target
    X = df.drop("Is_Fraud", axis=1)
    y = df["Is_Fraud"]

    # Define numeric and categorical features based on df
    numeric_features = X.select_dtypes(include=['int64', 'float64']).columns
    categorical_features = X.select_dtypes(include=['object']).columns

    # Create preprocessing pipelines
    numeric_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='median')),
        ('scaler', StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numeric_transformer, numeric_features),
            ('cat', categorical_transformer, categorical_features)
        ])

    # Model definitions
    xgb_clf = xgb.XGBClassifier(n_estimators=300, max_depth=6, learning_rate=0.05, use_label_encoder=False, eval_metric='logloss')
    rf_clf = RandomForestClassifier(n_estimators=200, random_state=42)

    # Voting Classifier (Ensemble)
    ensemble = VotingClassifier(
        estimators=[('xgb', xgb_clf), ('rf', rf_clf)],
        voting='soft'
    )

    # Full pipeline
    clf = Pipeline(steps=[('preprocessor', preprocessor),
                          ('classifier', ensemble)])

    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)

    # Train
    print("Training XGBoost + RF ensemble...")
    clf.fit(X_train, y_train)

    # Evaluate
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]

    print("\n--- Evaluation Metrics ---")
    print(f"Precision: {precision_score(y_test, y_pred):.4f} (Target: >= 0.92)")
    print(f"Recall: {recall_score(y_test, y_pred):.4f} (Target: >= 0.88)")
    print(f"AUC-ROC: {roc_auc_score(y_test, y_prob):.4f} (Target: >= 0.95)")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    # Save model
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    joblib.dump(clf, model_path)
    print(f"Model saved to {model_path}")

if __name__ == "__main__":
    train_tabular_model()
