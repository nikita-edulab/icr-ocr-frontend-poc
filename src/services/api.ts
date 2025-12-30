import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Helper to add token to requests
const getAuthHeaders = (token?: string) => {
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
};

// -------- Dashboard Summary API ----------
export const getDashboardSummary = async (token?: string) => {
  const res = await API.get("/students/dashboard/summary", {
    headers: getAuthHeaders(token),
  });
  return res.data;
};

// -------- Students List API ----------
export const getStudents = async (token?: string) => {
  const res = await API.get("/students/", {
    headers: getAuthHeaders(token),
  });
  return res.data;
};

//------- Folder API
export const getFolderTree = async (token?: string) => {
  const res = await API.get("/folders/tree", {
    headers: getAuthHeaders(token),
  });
  return res.data;
};

