import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// -------- Dashboard Summary API ----------
export const getDashboardSummary = async () => {
  const res = await API.get("/students/dashboard/summary");
  return res.data;
};

// -------- Students List API ----------
export const getStudents = async () => {
  const res = await API.get("/students/");
  return res.data;
};

//------- Folder API
export const getFolderTree = async () => {
  const res = await API.get("/folders/tree");
  return res.data;
};

