import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/src/api/redux/store";
import { SchoolParams } from "@/src/models/school";
import UserSession from "@/src/utilities/userSession";
import {
  getCategories,
  getLevels,
  getOwnershipCategories,
  getSchools,
} from "@/src/api/redux/slices/schoolSlice";
import { debounce } from "lodash";
// import MainNavigator from "@/src/components/navigation/MainNavigator";
import SchoolDropdowns from "@/src/components/dropdowns/SchoolDropdowns";
import SchoolCard from "@/src/components/administration/SchoolCard";
import MainNavigator from "@/src/components/navigation/MainNavigator";

const Schools = () => {
  const { schools, pagination } = useSelector(
    (state: RootState) => state.school
  );
  const dispatch = useDispatch<AppDispatch>();
  const [roles, setRoles] = useState<string[]>([]);
  const [params, setParams] = useState<SchoolParams>({
    // ...initial params...
    school_id: 0,
    level_id: 0,
    category_id: 0,
    ownership_category_id: 0,
    religious_affiliation_id: 0,
    region_id: 0,
    district_id: 0,
    circuit_id: 0,
    user_id: 0,
    parent_id: 0,
    student_id: 0,
    paginate: true,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
    },
  });

  const debouncedGetSchools = useCallback(
    debounce((p) => dispatch(getSchools(p)), 300),
    [dispatch]
  );
  // console.log("roles:", roles);
  const isPrivileged = roles.some((r) =>
    ["owner", "admin", "staff", "secretary", "principal", "vice_principal"].includes(r)
  );
  // console.log("isPrivileged:", isPrivileged);
  useEffect(() => {
    debouncedGetSchools(params);
    UserSession.getRoles().then(setRoles);
  }, [params, debouncedGetSchools]);

  const handleInputChange = (field: keyof any, value: string) => {
    if (field === "religious_affiliation_id") dispatch(getCategories());
    if (field === "category_id") dispatch(getOwnershipCategories());
    if (field === "ownership_category_id") dispatch(getLevels());
    setParams((prev) => ({ ...prev, [field]: value }));
  };

  const handlePageChange = (page: number) =>
    setParams((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, current_page: page },
    }));

  const handleItemsPerPageChange = (perPage: number) =>
    setParams((prev) => ({
      ...prev,
      pagination: { ...prev.pagination, per_page: perPage },
    }));

 

  const [showPerPage, setShowPerPage] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <MainNavigator />
      <Text style={styles.header}>Schools</Text>
      {!isPrivileged && (
        <View style={styles.dropdownContainer}>
          <SchoolDropdowns onChange={handleInputChange} />
        </View>
      )}

      {schools.map((school: any, i: any) => (
        <SchoolCard key={i} params={params} school={{ ...school, tags: [] }} />
      ))}

      {/* Pagination */}
      <View style={styles.paginationRow}>
        <TouchableOpacity
          disabled={(params.pagination.current_page || 1) <= 1}
          onPress={() => handlePageChange((params.pagination.current_page || 1) - 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageButtonText}>Prev</Text>
        </TouchableOpacity>
        <Text style={styles.pageInfo}>
          Page {params.pagination.current_page} of {pagination.total_pages}
        </Text>
        <TouchableOpacity
          disabled={(params.pagination.current_page ?? 1) >= (pagination.total_pages ?? 1)}
          onPress={() => handlePageChange((params.pagination.current_page ?? 1) + 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Items-per-page dropdown */}
      <View style={styles.dropdownButtonContainer}>
        <TouchableOpacity
          style={styles.perPageTrigger}
          onPress={() => setShowPerPage(true)}
        >
          <Text>Items per page: {params.pagination.per_page}</Text>
        </TouchableOpacity>

        <Modal
          transparent
          visible={showPerPage}
          onRequestClose={() => setShowPerPage(false)}
          animationType="fade"
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setShowPerPage(false)}
          >
            <View style={styles.modalContent}>
              {[5, 10, 20].map((n) => (
                <TouchableOpacity
                  key={n}
                  onPress={() => {
                    handleItemsPerPageChange(n);
                    setShowPerPage(false);
                  }}
                  style={styles.modalItem}
                >
                  <Text>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </ScrollView>
  )
}

export default Schools


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 28, color: "#6c757d", fontWeight: "bold" },
  dropdownContainer: { marginVertical: 12 },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  pageButton: { padding: 8, backgroundColor: "#007AFF", borderRadius: 4 },
  pageButtonText: { color: "#fff" },
  pageInfo: { fontSize: 16 },
  dropdownButtonContainer: { marginBottom: 20 },
  perPageTrigger: { padding: 8, backgroundColor: "#eee", borderRadius: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
  },
  modalItem: { padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
});
