import pandas as pd
from sklearn.ensemble import IsolationForest
df = pd.read_csv("data/projects.csv")

#print(df.head())
#print("Shape:", df.shape)
#print("Missing values:")
#print(df.isnull().sum())
df["cost_overrun_percent"] = (
    (df["actual_expenditure"] - df["estimated_cost"])
    / df["estimated_cost"]
) * 100

#print(df[["project_id", "cost_overrun_percent"]])
features = [
    "estimated_cost",
    "actual_expenditure",
    "delay_days",
    "project_duration",
    "cost_overrun_percent"
]

X = df[features]
model = IsolationForest(
    contamination=0.20,
    random_state=42
)

model.fit(X)

df["prediction"] = model.predict(X)

#print(df[["project_id", "prediction"]])
df["anomaly_score"] = model.decision_function(X)
min_score = df["anomaly_score"].min()
max_score = df["anomaly_score"].max()

df["risk_score"] = (
    (max_score - df["anomaly_score"])
    / (max_score - min_score)
) * 100

df["risk_score"] = df["risk_score"].round(2)

print(df[["project_id", "prediction", "anomaly_score", "risk_score"]])
import joblib

artifact = {
    "model": model,
    "min_score": min_score,
    "max_score": max_score,
    "features": features
}

joblib.dump(artifact, "model/isolation_forest.pkl")

print("Model saved successfully!")

#print(df[["project_id", "prediction", "anomaly_score"]])
print(X.head())