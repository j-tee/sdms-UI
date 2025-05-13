/* eslint-disable import/no-extraneous-dependencies */
import { Lesson, LessonParams, LessonViewModel } from "@/src/models/Lesson";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const LessonService = {
  getLessons: (params: LessonParams) =>
    authHeader().then((headers) =>
      axios.get(`${API_URL}api/v1/lessons?${queryStringFormatter(params)}`, {
        headers,
      })
    ),

  getStudentLessons: async (params: any) =>
    axios.get(`${API_URL}api/v1/lessons?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),
  addLesson: async (lesson: Lesson) =>
    axios.post(`${API_URL}api/v1/lessons`, lesson, {
      headers: await authHeader(),
    }),
  deleteLesson: async (lesson: LessonViewModel) =>
    axios.delete(`${API_URL}api/v1/lessons/${lesson.id}`, {
      headers: await authHeader(),
    }),
  updateLesson: async (lesson: Lesson, id: number) =>
    axios.put(`${API_URL}api/v1/lessons/${id}`, lesson, {
      headers: await authHeader(),
    }),
  getLesson: async (id: number) =>
    axios.get(`${API_URL}api/v1/lessons/${id}`, {
      headers: await authHeader(),
    }),
};
export default LessonService;
