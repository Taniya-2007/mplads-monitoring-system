MPLADS Risk Detection API

A FastAPI-based ML backend for monitoring MPLADS projects and detecting unusual project patterns using Isolation Forest.

The API accepts project details such as estimated cost, actual expenditure, delay, and project duration, and returns an anomaly-based risk score.

Features
FastAPI backend
Isolation Forest for anomaly detection
Cost overrun calculation
Anomaly score generation
Risk score generation (0–100)
REST API endpoint for project prediction
Swagger UI for API testing
Project Structure
mplads-risk-detection-api/
│
├── data/
│   └── projects.csv
│
├── model/
│   └── isolation_forest.pkl
│
├── main.py
├── train_model.py
├── requirements.txt
└── README.md
Tech Stack
Python
FastAPI
Scikit-learn
Pandas
NumPy
Joblib
Uvicorn
Setup
1. Clone the repository
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd mplads-risk-detection-api
2. Create a virtual environment
python -m venv venv
3. Activate the virtual environment

Windows PowerShell:

.\venv\Scripts\Activate.ps1
4. Install dependencies
pip install -r requirements.txt
Run the API

Start the FastAPI server:

uvicorn main:app --reload

The API will run at:

http://127.0.0.1:8000

Swagger API documentation/testing:

http://127.0.0.1:8000/docs
API Endpoint
POST /predict

Accepts the following project data:

{
  "estimated_cost": 500000,
  "actual_expenditure": 510000,
  "delay_days": 5,
  "project_duration": 180
}
Example Response
{
  "prediction": 1,
  "anomaly_score": 0.1392,
  "cost_overrun_percent": 2,
  "risk_score": 5.51
}
Prediction Meaning
1 → Project pattern appears normal
-1 → Project pattern is flagged as anomalous

A higher risk_score indicates that the project appears more unusual compared with the training data.

Note: The risk score is an anomaly-based score and is not a probability or proof of fraud. An anomalous project should be investigated further.

ML Model

The project uses Isolation Forest, an unsupervised anomaly detection algorithm.

The model considers:

Estimated cost
Actual expenditure
Delay days
Project duration
Cost overrun percentage

Projects with unusual combinations of these values can be flagged for further investigation.

Dataset

The included projects.csv contains synthetic/demo data created for development and testing.

It should be replaced or retrained with appropriate real-world MPLADS project data for the final system.

Integration

The backend is designed to be integrated with a frontend/dashboard.

The frontend can send project data to:

POST /predict

and use the returned:

prediction
anomaly_score
cost_overrun_percent
risk_score

to display project risk information.

Team Integration Flow
Frontend / Dashboard
        ↓
POST /predict
        ↓
FastAPI Backend
        ↓
Isolation Forest Model
        ↓
Risk Score
        ↓
Frontend displays result
Disclaimer

This is a prototype developed for the Smart India Hackathon project. The anomaly detection output is intended to support project monitoring and does not independently establish fraud, corruption, or wrongdoing.
