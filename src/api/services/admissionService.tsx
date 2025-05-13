/* eslint-disable import/no-extraneous-dependencies */
import { Admission, AdmissionParams } from "@/src/models/admission";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const AdmissionService = {
  getVacancies: async (params: AdmissionParams) =>
    axios.get(
      `${API_URL}api/v1/admissions/registrations/vacancies?branch_id=${params.branch_id}&department_id=${params.department_id}&stage_id=${params.stage_id}&academic_term_id=${params.academic_term_id}&program_id=${params.program_id}&school_id=${params.school_id}`,
      { headers: await authHeader() }
    ),

  getAdmissions: async (params: AdmissionParams) =>
    axios.get(`${API_URL}api/v1/admissions?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),

  addAdmission: async (admission: Admission) =>
    axios.post(`${API_URL}api/v1/admissions`, admission, {
      headers: await authHeader(),
    }),

  deleteAdmission: async (admission: Admission, id: number) =>
    axios.delete(`${API_URL}api/v1/admissions/${id}`, {
      headers: await authHeader(),
    }),

  updateAdmission: async (admission: Admission, id: number) =>
    axios.put(`${API_URL}api/v1/admissions/${id}`, admission, {
      headers: await authHeader(),
    }),
    
  getAdmission: async (admissionId: number) =>
    axios.get(`${API_URL}api/v1/admissions/${admissionId}`, {
      headers: await authHeader(),
    }),
};

export default AdmissionService;
