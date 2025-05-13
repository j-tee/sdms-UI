/* eslint-disable import/no-extraneous-dependencies */
import {
  AcademicTerm,
  AcademicTermViewModel,
  YearParams,
} from "@/src/models/calendar";
import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const CalendarService = {
  getTermCount: async (branch_id: number) =>
    axios.get(
      `${API_URL}api/v1/academic_years/registration/admission/current_academic_year/get_term_count/${branch_id}`,
      { headers: await authHeader() }
    ),
  getCurrentAcademicYear: async (branch_id: number) =>
    axios.get(
      `${API_URL}api/v1/academic_years/registration/admission/current_academic_year/${branch_id}`,
      { headers: await authHeader() }
    ),
  getCurrentTerm: async (branch_id: number) =>
    axios.get(
      `${API_URL}api/v1/academic_terms/terms/current_term/${branch_id}`,
      { headers: await authHeader() }
    ),
  getAcademicYears: async (params: YearParams) =>
    axios.get(
      `${API_URL}api/v1/academic_years?${queryStringFormatter(params)}`,
      { headers: await authHeader() }
    ),
  addAcademicYear: async (year: any) =>
    axios.post(`${API_URL}api/v1/academic_years`, year, {
      headers: await authHeader(),
    }),
  deleteAcaemicYear: async (year: any) =>
    axios.delete(`${API_URL}api/v1/academic_years/${year.id}`, {
      headers: await authHeader(),
    }),
  updateAcademicYear: async (year: any) =>
    axios.put(`${API_URL}api/v1/academic_years/${year.id}`, year, {
      headers: await authHeader(),
    }),
  getAcademicYear: async (id: number) =>
    axios.get(`${API_URL}api/v1/academic_years/${id}`, {
      headers: await authHeader(),
    }),
  getAcademicTerms: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/academic_years/${params.academic_year_id}/academic_terms?current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}`,
      { headers: await authHeader() }
    ),
  addAcademicTerm: async (term: AcademicTerm) =>
    axios.post(
      `${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms`,
      term,
      { headers: await authHeader() }
    ),
  deleteAcademicTerm: async (term: AcademicTermViewModel) =>
    axios.delete(
      `${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms/${term.id}`,
      { headers: await authHeader() }
    ),
  updateAcademicTerm: async (term: AcademicTerm, id: number) =>
    axios.put(
      `${API_URL}api/v1/academic_years/${term.academic_year_id}/academic_terms/${id}`,
      term,
      { headers: await authHeader() }
    ),
  getAcademicTerm: async (id: number) =>
    axios.get(`${API_URL}api/v1/academic_years/${id}`, {
      headers: await authHeader(),
    }),
  getStudentAcademicYears: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/schools/student/registration/student_academic_years?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
};

export default CalendarService;
