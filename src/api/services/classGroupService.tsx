/* eslint-disable import/no-extraneous-dependencies */
import axios from "axios";
import { getStudentClassGroup } from "../redux/slices/classGroupSlice";
import authHeader from "@/src/utilities/authHeader";
import { ClassGroup, ClassGroupParams } from "@/src/models/classGroup";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const ClassGroupService = {
  getStudentClassGroups: async (params: ClassGroupParams) =>
    axios.get(
      `${API_URL}api/v1/schools/class_groups/student_class_groups?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),

  getClassGroups: async (params: ClassGroupParams) =>
    axios.get(`${API_URL}api/v1/class_groups?${queryStringFormatter(params)}`, {
      headers: await authHeader(),
    }),

  addClassGroup: async (class_group: ClassGroup) =>
    axios.post(`${API_URL}api/v1/class_groups`, class_group, {
      headers: await authHeader(),
    }),

  deleteClassGroup: async (class_groupId: number) =>
    axios.delete(`${API_URL}api/v1/class_groups/${class_groupId}`, {
      headers: await authHeader(),
    }),

  updateClassGroup: async (class_group: ClassGroup, id: number) =>
    axios.put(`${API_URL}api/v1/class_groups/${id}`, class_group, {
      headers: await authHeader(),
    }),

  getClassGroup: async (class_groupId: number) =>
    axios.get(`${API_URL}api/v1/class_groups/${class_groupId}`, {
      headers: await authHeader(),
    }),

  getClassGroupList: async (params: ClassGroupParams) =>
    axios.get(
      `${API_URL}api/v1/class_groups/program_subjects/lessons/class_group_list?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&paginate=false`,
      { headers: await authHeader() }
    ),

  getStudentClassGroup: async (params: any) =>
    axios.get(
      `${API_URL}api/v1/schools/class_groups/student_class_group?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),

  getStaffClassGroups: async (params: any) =>
    axios.get(
      `${API_URL}api/v1/class_groups/program_subjects/lessons/staff_class_group_list?${queryStringFormatter(
        params
      )}`,
      { headers: await authHeader() }
    ),
};

export default ClassGroupService;
