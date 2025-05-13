/* eslint-disable import/no-extraneous-dependencies */
import { Attendance } from "@/src/models/attendance";
import { QueryParams } from "@/src/models/queryParams";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const AttendanceService = {
  getAttendees: async (params: QueryParams) =>
    axios.get(
      `${API_URL}api/v1/student_registrations/registrations/class_groups/attendees/registered_students_attendance?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
  getAttendances: async (params: QueryParams) =>
    axios.get(`${API_URL}api/v1/attendances?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),
  addAttendance: async (attendance: Attendance[]) =>
    axios.post(`${API_URL}api/v1/attendances`, attendance, {
      headers: await authHeader(),
    }),
  deleteAttendance: async (attendanceId: number) =>
    axios.delete(`${API_URL}api/v1/attendances/${attendanceId}`, {
      headers: await authHeader(),
    }),
  updateAttendance: async (attendance: Attendance, id: number) =>
    axios.put(`${API_URL}api/v1/attendances/${id}`, attendance, {
      headers: await authHeader(),
    }),
  getAttendance: async (attendanceId: number) =>
    axios.get(`${API_URL}api/v1/attendances/${attendanceId}`, {
      headers: await authHeader(),
    }),
};

export default AttendanceService;
