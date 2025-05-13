/* eslint-disable import/no-extraneous-dependencies */
import { StudentOptionalCourse } from "@/src/models/optionalCourseRegistration";
import authHeader from "@/src/utilities/authHeader";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const StudentCourseRegService = {
  registerOptionalCourses: async (formData: StudentOptionalCourse[]) =>
    axios.post(`${API_URL}api/v1/student_optional_courses`, formData, {
      headers: await authHeader(),
    }),
  unregisterOptionalCourses: async (formData: StudentOptionalCourse[]) =>
    axios.delete(`${API_URL}api/v1/student_optional_courses/bulk_destroy`, {
      headers: await authHeader(),
      data: formData, // Send the payload as the request body
    }),
};
export default StudentCourseRegService;
