import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const api = {
  get: <R>(url: string) => axiosInstance.get<R>(url),
  post: <R>(url: string, data: unknown = undefined) =>
    axiosInstance.post<R>(url, data),
  put: <R>(url: string, data: unknown = undefined) =>
    axiosInstance.put<R>(url, data),
  delete: <R>(url: string) => axiosInstance.delete<R>(url),
};
