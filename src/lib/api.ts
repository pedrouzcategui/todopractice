import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const api = {
  get: <R>(url: string) => axiosInstance.get<R>(url),
  post: <T, R>(url: string, data: T) => axiosInstance.post<R>(url, data),
  put: <T, R>(url: string, data: T) => axiosInstance.put<R>(url, data),
  delete: <R>(url: string) => axiosInstance.delete<R>(url),
};
