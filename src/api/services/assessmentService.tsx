/* eslint-disable import/no-extraneous-dependencies */
import { Assessment } from "@/src/models/assessment";
import { AssessmentType } from "@/src/models/assessmentTypes";
import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const AssessmentService = {
  getAssessmentTypes: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/assessment_types?branch_id=${params.branch_id}&school_id=${params.school_id}&current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`,
      { headers: await authHeader() }
    ),
  addAssessmentType: async (assessmentType: AssessmentType) =>
    axios.post(`${API_URL}api/v1/assessment_types`, assessmentType, {
      headers: await authHeader(),
    }),
  deleteAssessmentType: async (assessmentType: AssessmentType, id: number) =>
    axios.delete(`${API_URL}api/v1/assessment_types/${id}`, {
      headers: await authHeader(),
    }),
  updateAssessmentType: async (assessmentType: AssessmentType, id: number) =>
    axios.put(`${API_URL}api/v1/assessment_types/${id}`, assessmentType, {
      headers: await authHeader(),
    }),
  getAssessmentType: async (assessmentTypeId: number) =>
    axios.get(`${API_URL}api/v1/assessment_types/${assessmentTypeId}`, {
      headers: await authHeader(),
    }),
  //   //////////////////////////////////////////////////////////////////////////
  getAssessments: async (params: QueryParams) =>
    axios.get(`${API_URL}api/v1/assessments?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),
  addAssessment: async (assessment: Assessment) =>
    axios.post(`${API_URL}api/v1/assessments`, assessment, {
      headers: await authHeader(),
    }),
  deleteAssessment: async (id: number) =>
    axios.delete(`${API_URL}api/v1/assessments/${id}`, {
      headers: await authHeader(),
    }),
  updateAssessment: async (assessment: Assessment) =>
    axios.put(`${API_URL}api/v1/assessments/${assessment.id}`, assessment, {
      headers: await authHeader(),
    }),
  getAssessment: async (assessmentId: number) =>
    axios.get(`${API_URL}api/v1/assessments/${assessmentId}`, {
      headers: await authHeader(),
    }),
  getStaffAssessmentSummary: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/assessments/summary/staffs/evaluation/lessons/assessment_summary?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
  getNotConductedAssessments: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/assessments/exercises/staff/not_conducted_assessments?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
};

export default AssessmentService;
