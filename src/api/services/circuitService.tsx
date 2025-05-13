/* eslint-disable import/no-extraneous-dependencies */
import authHeader from "@/src/utilities/authHeader";
import axios from "axios";
// import authHeader from '../utility/authHeader';
import Constants from "expo-constants";
const API_URL = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

const CircuitService = {
  getCircuits: async (params: any) =>
    axios.get(
      `${API_URL}api/v1/regions/${params.region_id}/districts/${params.district_id}/circuits/?current_page=${params.current_page}&per_page=${params.per_page}&paginate=${params.paginate}`,
      { headers: await authHeader() }
    ),
  addCircuit: async (circuit: any) =>
    axios.post(
      `${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits`,
      circuit,
      { headers: await authHeader() }
    ),
  deleteCircuit: async (circuit: any) =>
    axios.delete(
      `${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`,
      { headers: await authHeader() }
    ),
  updateCircuit: async (circuit: any) =>
    axios.put(
      `${API_URL}api/v1/regions/${circuit.circuit.region_id}/districts/${circuit.circuit.district_id}/circuits/${circuit.circuit.id}`,
      circuit,
      { headers: await authHeader() }
    ),
  getCircuit: async (circuit: any) =>
    axios.get(
      `${API_URL}api/v1/regions/${circuit.region_id}/districts/${circuit.district_id}/circuits/${circuit.id}`,
      { headers: await authHeader() }
    ),
};

export default CircuitService;
