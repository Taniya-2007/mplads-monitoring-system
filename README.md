# MPLADS Monitoring System

An AI-powered dashboard and risk detection system for monitoring MPLADS projects.

## Project Overview

This project combines a React + Vite frontend dashboard with a FastAPI + Machine Learning backend.

The system helps monitor project information, visualize risk indicators, and detect unusual project patterns using Isolation Forest.

## Features

- React-based monitoring dashboard
- Project statistics and risk visualization
- FastAPI backend
- Isolation Forest anomaly detection
- Cost overrun calculation
- Risk score generation
- REST API endpoint for project prediction
- Swagger UI for API testing

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- Tailwind CSS
- Recharts

### Backend
- Python
- FastAPI
- Scikit-learn
- Pandas
- NumPy
- Joblib
- Uvicorn

## Project Structure

```text
mplads-monitoring-system/
│
├── src/
│   ├── components/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── main.py
├── train_model.py
├── projects.csv
├── isolation_forest.pkl
├── requirements.txt
├── package.json
└── README.md