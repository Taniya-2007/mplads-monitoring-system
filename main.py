from fastapi import FastAPI
from pydantic import BaseModel
import joblib
app = FastAPI()
model_data = joblib.load("model/isolation_forest.pkl")
class ProjectData(BaseModel):
    estimated_cost: float
    actual_expenditure: float
    delay_days: float
    project_duration: float
@app.get("/")
@app.post("/predict")
def predict(data: ProjectData):
    if data.estimated_cost <= 0:
     return {"error": "estimated_cost must be greater than 0"}
    cost_overrun_percent = (
        (data.actual_expenditure - data.estimated_cost)
        / data.estimated_cost
    ) * 100

    features = [[
        data.estimated_cost,
        data.actual_expenditure,
        data.delay_days,
        data.project_duration,
        cost_overrun_percent
    ]]

    prediction = model_data["model"].predict(features)[0]
    anomaly_score = model_data["model"].decision_function(features)[0]

    min_score = model_data["min_score"]
    max_score = model_data["max_score"]

    risk_score = (
    (max_score - anomaly_score)
    / (max_score - min_score)
    ) * 100

    risk_score = round(risk_score, 2)

    return {
    "prediction": int(prediction),
    "anomaly_score": round(anomaly_score, 4),
    "cost_overrun_percent": round(cost_overrun_percent, 2),
    "risk_score": risk_score
     }
def home():
    return {"message": "MPLADS Risk Detection API is running"}