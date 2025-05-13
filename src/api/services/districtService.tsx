/* eslint-disable import/no-extraneous-dependencies */
import authHeader from "@/src/utilities/authHeader";
import queryStringFormatter from "@/src/utilities/queryStringFormatter";
import axios from "axios";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const DistrictService = {
  getDistricts: async (params: any) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/regions/${
        params.region_id
      }/districts?${queryStringFormatter(params)}`,
      { headers }
    );
  },
  addDistrict: async (district: any) => {
    const headers = await authHeader();
    return axios.post(
      `${API_URL}api/v1/regions/${district.region_id}/districts`,
      district,
      { headers }
    );
  },
  deleteDistrict: async (district: any) => {
    const headers = await authHeader();
    return axios.delete(
      `${API_URL}api/v1/regions/${district.region_id}/districts/${district.id}`,
      { headers }
    );
  },
  updateDistrict: async (district: any) => {
    const headers = await authHeader();
    return axios.put(
      `${API_URL}api/v1/regions/${district.region_id}/districts/${district.id}`,
      district,
      { headers }
    );
  },
  getDistrict: async (district: any) => {
    const headers = await authHeader();
    return axios.get(
      `${API_URL}api/v1/regions/${district.region_id}/districts/${district.id}`,
      { headers }
    );
  },
};

export default DistrictService;
