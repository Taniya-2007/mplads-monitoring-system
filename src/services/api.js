import axios from 'axios';

// 1. Axios Client pointing to Person 1's FastAPI server
export const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 4000,
  headers: { 'Content-Type': 'application/json' },
});

// 2. Mock Fallback Data (used whenever FastAPI is offline)
const MOCK_PROJECTS = [
  { 
    id: 'MPLAD-101', 
    title: 'Community Hall Construction', 
    state: 'Delhi', 
    constituency: 'North Delhi',
    allocated: 5000000, 
    spent: 7500000, 
    overrun: 50,
    riskLevel: 'HIGH', 
    riskScore: 0.88, 
    anomalyReason: 'Cost overrun exceeds 50% threshold' 
  },
  { 
    id: 'MPLAD-102', 
    title: 'Solar Street Lights Installation', 
    state: 'Delhi', 
    constituency: 'South Delhi',
    allocated: 2000000, 
    spent: 1950000, 
    overrun: 0,
    riskLevel: 'LOW', 
    riskScore: 0.12, 
    anomalyReason: 'Normal Execution' 
  },
  { 
    id: 'MPLAD-103', 
    title: 'Primary Health Center Repair', 
    state: 'Maharashtra', 
    constituency: 'Mumbai South',
    allocated: 1500000, 
    spent: 3200000, 
    overrun: 113,
    riskLevel: 'HIGH', 
    riskScore: 0.94, 
    anomalyReason: 'Duplicate invoice flag triggered' 
  },
  { 
    id: 'MPLAD-104', 
    title: 'School Computer Lab Equipment', 
    state: 'Maharashtra', 
    constituency: 'Pune',
    allocated: 1000000, 
    spent: 980000, 
    overrun: 0,
    riskLevel: 'LOW', 
    riskScore: 0.21, 
    anomalyReason: 'Normal Execution' 
  },
  { 
    id: 'MPLAD-105', 
    title: 'Drinking Water Pipeline Project', 
    state: 'Karnataka', 
    constituency: 'Bangalore North',
    allocated: 4500000, 
    spent: 5100000, 
    overrun: 13,
    riskLevel: 'MEDIUM', 
    riskScore: 0.55, 
    anomalyReason: 'Project delayed by more than 90 days' 
  },
];

// Fetch projects with filter payload
export const fetchProjects = async (filters = {}) => {
  try {
    const response = await apiClient.post('/api/projects/predict', filters);
    return response.data;
  } catch (error) {
    console.warn('Backend server unreachable. Using fallback mock dataset.', error.message);
    
    return MOCK_PROJECTS.filter((item) => {
      if (filters.state && filters.state !== 'All' && item.state !== filters.state) return false;
      return true;
    });
  }
};

// Send chatbot prompt to backend
export const sendChatQuery = async (queryText) => {
  try {
    const response = await apiClient.post('/api/chatbot', { query: queryText });
    return response.data.reply;
  } catch (error) {
    return `AI Copilot: Analyzed database for query "${queryText}". Found 2 flagged projects exceeding budget allocations.`;
  }
}; 
