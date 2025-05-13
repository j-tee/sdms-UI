/* eslint-disable import/no-extraneous-dependencies */
import { Staff, StaffParams } from "@/src/models/staff";
import authHeader from "@/src/utilities/authHeader";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const StaffService = {
  getStaffs: async (params: StaffParams) =>
    axios.get(
      `${API_URL}api/v1/staffs?branch_id=${params.branch_id}&department_id=${params.department_id}&program_id=${params.program_id}&current_page=${params.pagination?.current_page}&per_page=${params.pagination?.per_page}&paginate=${params.paginate}`,
      { headers: await authHeader() }
    ),
  addStaff: async (staff: FormData) =>
    axios.post(`${API_URL}api/v1/staffs`, staff, {
      headers: await authHeader(),
    }),
  deleteStaff: async (staff: Staff) =>
    axios.delete(`${API_URL}api/v1/staffs/${staff.id}`, {
      headers: await authHeader(),
    }),
  updateStaff: async (staff: FormData) =>
    axios.put(`${API_URL}api/v1/staffs/${staff.get("staff[id]")}`, staff, {
      headers: await authHeader(),
    }),
  getStaff: async (id: number) =>
    axios.get(`${API_URL}api/v1/staffs/${id}`, { headers: await authHeader() }),
};
export default StaffService;
