import os
import pandas as pd
from pymongo import MongoClient

def seed_database():
    print("Connecting to MongoDB...")
    # Typically loaded from config, hardcoded purely for local testing
    client = MongoClient("mongodb://root:example@mongodb:27017/")
    db = client["intellishield"]
    collection = db["claims"]
    
    data_path = "Insurance_Fraud_Dataset.csv"
    if not os.path.exists(data_path):
        import numpy as np
        print("Dataset not found. Generating mock seed data...")
        n_samples = 200
        df = pd.DataFrame({
            "claim_amount": np.random.randint(5000, 500000, n_samples),
            "stay_days": np.random.randint(1, 30, n_samples),
            "claim_type": np.random.choice(["Health", "Motor"], n_samples),
            "Is_Fraud": np.random.choice([0, 1], n_samples, p=[0.8, 0.2])
        })
    else:
        df = pd.read_csv(data_path)
        
    records = df.to_dict("records")
    
    print(f"Inserting {len(records)} records into MongoDB...")
    # Drop existing for clean seed
    collection.drop()
    collection.insert_many(records)
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_database()
