/* eslint-disable import/no-extraneous-dependencies */
import { ProgramSubject, ProgramSubjectParams } from "@/src/models/subject";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const ProgramSubjectService = {
  getCourseOptions: async (params: ProgramSubjectParams) =>
    axios.get(
      `${API_URL}api/v1/program_subjects?${queryStringFormatter(params)}`,
      { headers: await authHeader() }
    ),
  addCourseOption: async (subject: ProgramSubject) =>
    axios.post(`${API_URL}api/v1/program_subjects`, subject, {
      headers: await authHeader(),
    }),
  deleteCourseOption: async (subjectId: number) =>
    axios.delete(`${API_URL}api/v1/program_subjects/${subjectId}`, {
      headers: await authHeader(),
    }),
  updateCourseOption: async (subject: ProgramSubject) =>
    axios.put(`${API_URL}api/v1/program_subjects/${subject.id}`, subject, {
      headers: await authHeader(),
    }),
  getCourseOption: async (params: any) =>
    axios.get(
      `${API_URL}api/v1/program_subjects/lessons/student_course_option?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
};
export default ProgramSubjectService;
