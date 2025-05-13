/* eslint-disable import/no-extraneous-dependencies */
import { Stage, StageParams, StageViewModel } from "@/src/models/stage";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const StageService = {
  getStudentStages: async (params: StageParams) =>
    axios.get(
      `${API_URL}api/v1/parents/students/stages/student_stages?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
  getStages: async (params: StageParams) =>
    axios.get(
      `${API_URL}api/v1/stages?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`,
      { headers: await authHeader() }
    ),
  addStage: async (stage: Stage) =>
    axios.post(`${API_URL}api/v1/stages`, stage, {
      headers: await authHeader(),
    }),
  deleteStage: async (stage: StageViewModel) =>
    axios.delete(`${API_URL}api/v1/stages/${stage.id}`, {
      headers: await authHeader(),
    }),
  updateStage: async (stage: Stage, id: number) =>
    axios.put(`${API_URL}api/v1/stages/${id}`, stage, {
      headers: await authHeader(),
    }),
  getStage: async (id: number) =>
    axios.get(`${API_URL}api/v1/stages/${id}`, { headers: await authHeader() }),
  getStageList: async (params: StageParams) =>
    axios.get(
      `${API_URL}api/v1/stages/program_subjects/lessons/stage_list?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&paginate=false`,
      { headers: await authHeader() }
    ),
};
export default StageService;
