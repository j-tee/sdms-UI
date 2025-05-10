import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/api/redux/store";
import { getRegions } from "@/src/api/redux/slices/regionSlice";
import { getDistricts } from "@/src/api/redux/slices/districtSlice";
import { getCircuits } from "@/src/api/redux/slices/circuitSlice";

type AnyType = {
  [key: string]: string;
};

interface LocationDropDownProps {
  onLocationChange: (field: keyof AnyType, value: string) => void;
}

const LocationDropDown: React.FC<LocationDropDownProps> = ({
  onLocationChange,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const regions = useSelector((state: RootState) => state.region.regions);
  const districts = useSelector((state: RootState) => state.district.districts);
  const circuits = useSelector((state: RootState) => state.circuit.circuits);

  const [params, setParams] = useState({
    region_id: 0,
    district_id: 0,
    circuit_id: 0,
    current_page: 1,
    per_page: 10,
  });

  useEffect(() => {
    dispatch(
      getRegions({
        current_page: params.current_page,
        per_page: params.per_page,
      })
    );
  }, [dispatch, params.current_page, params.per_page]);

  useEffect(() => {
    if (params.region_id > 0) {
      dispatch(
        getDistricts({
          region_id: params.region_id,
          current_page: 1,
          per_page: 10,
        })
      );
    }
  }, [dispatch, params.region_id]);

  useEffect(() => {
    if (params.district_id > 0) {
      dispatch(
        getCircuits({
          district_id: params.district_id,
          current_page: 1,
          per_page: 10,
        })
      );
    }
  }, [dispatch, params.district_id]);

  const handleRegionChange = (value: number) => {
    setParams((prev) => ({
      ...prev,
      region_id: value,
      district_id: 0,
      circuit_id: 0,
    }));
    onLocationChange("region_id", value.toString());
  };

  const handleDistrictChange = (value: number) => {
    setParams((prev) => ({ ...prev, district_id: value, circuit_id: 0 }));
    onLocationChange("district_id", value.toString());
  };

  const handleCircuitChange = (value: number) => {
    setParams((prev) => ({ ...prev, circuit_id: value }));
    onLocationChange("circuit_id", value.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Region</Text>
      {regions.length > 0 ? (
        <Picker
          selectedValue={params.region_id}
          onValueChange={handleRegionChange}
          style={styles.picker}
        >
          <Picker.Item label="---Select---" value={0} />
          {regions.map((region: { id: unknown; name: string | undefined }) => (
            <Picker.Item
              key={region.id as string | number}
              label={region.name}
              value={region.id}
            />
          ))}
        </Picker>
      ) : (
        <ActivityIndicator />
      )}

      <Text style={styles.label}>District</Text>
      {districts.length > 0 ? (
        <Picker
          selectedValue={params.district_id}
          onValueChange={handleDistrictChange}
          style={styles.picker}
        >
          <Picker.Item label="---Select---" value={0} />
          {districts.map(
            (district: { id: unknown; name: string | undefined }) => (
              <Picker.Item
                key={district.id as string | number}
                label={district.name}
                value={district.id}
              />
            )
          )}
        </Picker>
      ) : (
        <ActivityIndicator />
      )}

      <Text style={styles.label}>Circuit</Text>
      {circuits.length > 0 ? (
        <Picker
          selectedValue={params.circuit_id}
          onValueChange={handleCircuitChange}
          style={styles.picker}
        >
          <Picker.Item label="---Select---" value={0} />
          {circuits.map(
            (circuit: { id: unknown; name: string | undefined }) => (
              <Picker.Item
                key={circuit.id as string | number}
                label={circuit.name}
                value={circuit.id}
              />
            )
          )}
        </Picker>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
});

export default LocationDropDown;
