import { Branch, BranchParams } from "@/src/models/branch";
import { SchoolParams } from "@/src/models/school";
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";

import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";


const SchoolService = {
  addCategory: async (category: any) => {
    const headers = await authHeader();
    return axios.post(`${API_URL}api/v1/categories`, category, { headers });
  },
  updateCategory: async (category: any) => axios.put(`${API_URL}api/v1/categories/${category.id}`, category, { headers: await authHeader() }),  
  deleteCategory: async (id: any) => {
    const headers = await authHeader();
    return axios.delete(`${API_URL}api/v1/categories/${id}`, { headers });
  },
  addOwnershipCategory: async (category: any) => axios.post(`${API_URL}api/v1/ownership_categories`, category, { headers: await authHeader() }),  
  updateOwnershipCategory: async (category: any) => axios.put(`${API_URL}api/v1/ownership_categories/${category.id}`, category, { headers: await authHeader() }), 
  deleteOwnershipCategory: async (id: Number) => axios.delete(`${API_URL}api/v1/ownership_categories/${id}`, { headers: await authHeader() }),  
  addLevel: async (level: any) => axios.post(`${API_URL}api/v1/levels`, level, { headers: await authHeader() }),  
  updateLevel: async (level: any) => axios.put(`${API_URL}api/v1/levels/${level.id}`, level, { headers: await authHeader() }),  
  deleteLevel: async (id: any) => axios.delete(`${API_URL}api/v1/levels/${id}`, { headers: await authHeader() }),  
  addReligiousAffiliation: async (affiliation: any) => axios.post(`${API_URL}api/v1/religious_affiliations`, affiliation, { headers: await authHeader() }), 
  updateReligiousAffiliation: async (affiliation: any) => axios.put(`${API_URL}api/v1/religious_affiliations/${affiliation.id}`, affiliation, { headers: await authHeader() }),                                                             
  deleteReligiousAffiliation: async (id: any) => axios.delete(`${API_URL}api/v1/religious_affiliations/${id}`, { headers: await authHeader() }),                                                                                                                                                                                                                                                                                                                          
  getSchools: async (params: SchoolParams) => axios.get(`${API_URL}api/v1/schools?${queryStringFormatter(params)}`, { headers: await authHeader() }),

  addBranch: async (branch: Branch) => axios.post(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches`, branch, { headers: await authHeader() }),

  getBranches: async (params: BranchParams) => axios.get(`${API_URL}api/v1/schools/${params.school_id}/circuits/${params.circuit_id}/branches?${queryStringFormatter(params)}`, { headers: await authHeader() }),

  addSchool: async (school: FormData) => {
    return axios.post(`${API_URL}api/v1/schools`, school, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...await authHeader(),
      },
    });
  },
  getSchoolList: async (params: any) => axios.get(`${API_URL}api/v1/schools/subscriptions/school_subscriptions/schools_list?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  getStudentBranches: async (params: any) => axios.get(`${API_URL}api/v1/branches/parents/students/student_branches?${queryStringFormatter(params)}`, { headers: await authHeader() }),  
  getStudentSchools: async (params: any) => axios.get(`${API_URL}api/v1/schools/parents/my_wards/Student_schools?${queryStringFormatter(params)}`, { headers: await authHeader() }),
  getSchool: async (school_id: number) => axios.get(`${API_URL}api/v1/schools/${school_id}`, { headers: await authHeader() }),
  getCategories: async () => axios.get(`${API_URL}api/v1/schools/:school_id/categories`, { headers: await authHeader() }),
  getOwnershipCategories: async () => axios.get(`${API_URL}api/v1/ownership_categories`, { headers: await authHeader() }),
  getLevels: async () => axios.get(`${API_URL}api/v1/levels`, { headers: await authHeader() }),
  getReligiousAffiliation: async () => axios.get(`${API_URL}api/v1/schools/:school_id/religious_affiliations`, { headers: await authHeader() }),
  updateSchool: async (school: FormData) => axios.put(`${API_URL}api/v1/schools/${school.get('school[id]')}`, school, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...await authHeader(),
    },
  }),
  updateBranch: async (branch: Branch) => axios.put(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches/${branch.id}`, branch, { headers: await authHeader() }), 
  deleteBranch: async (branch: Branch) => axios.delete(`${API_URL}api/v1/schools/${branch.school_id}/circuits/${branch.circuit_id}/branches/${branch.id}`, { headers: await authHeader() }), 
  
};

export default SchoolService;
