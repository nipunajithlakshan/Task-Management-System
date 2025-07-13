import axios from "./axiosInstance";

export const fetchTasks = async (params) => {
  return await axios.get("/tasks", { params });
};

export const getEvent = async (id) => {
  return await axios.get(`/${id}`);
};

export const createTask = async (data) => {
  return await axios.post("/create-task", data);
};

export const updateTask = async (_id, data) => {
  return await axios.put(`/edit-task?taskId=${_id}`, data);
};

export const deleteEvent = async (_id) => {
  return await axios.delete(`/delete-task?taskId=${_id}`);
};

export const registerAttendee = async (id, data) => {
  return await axios.post(`/register-attendee/${id}`, data);
};

export const getAnalytics = async (id) => {
  return await axios.get(`/analytics/${id}`);
};

export const getAttendees = async (id) => {
  return await axios.get(`/attendees/${id}`);
};

