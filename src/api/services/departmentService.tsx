/* eslint-disable import/no-extraneous-dependencies */
import { Department, DepartmentParams } from "@/src/models/department";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const DepartmentService = {
  getStudentDepartments: async (params: DepartmentParams) =>
    axios.get(
      `${API_URL}api/v1/parents/students/departments/student_departments?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
  getDepartments: async (params: DepartmentParams) =>
    axios.get(`${API_URL}api/v1/departments?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),
  addDepartment: async (department: Department) =>
    axios.post(`${API_URL}api/v1/departments`, department, {
      headers: await authHeader(),
    }),
  deleteDepartment: async (departmentId: number) =>
    axios.delete(`${API_URL}api/v1/departments/${departmentId}`, {
      headers: await authHeader(),
    }),
  updateDepartment: async (department: Department, id: number) =>
    axios.put(`${API_URL}api/v1/departments/${id}`, department, {
      headers: await authHeader(),
    }),
  getDepartment: async (departmentId: number) =>
    axios.get(`${API_URL}api/v1/departments/${departmentId}`, {
      headers: await authHeader(),
    }),
};

export default DepartmentService;
