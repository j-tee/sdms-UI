import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/api/redux/store";
import { addBranch } from "@/src/api/redux/slices/schoolSlice";
import { showToast } from "@/src/utilities/toast";
import LocationDropDown from "../dropdowns/LocationDropDown";
import BranchForm from "./BranchForm";

interface AddBranchProps {
  isVisible: boolean;
  onClose: () => void;
  schoolId: number;
  setAddBranchModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBranch: React.FC<AddBranchProps> = ({
  setAddBranchModalOpen,
  isVisible,
  onClose,
  schoolId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<any>({
    branch_name: "",
    postal_address: "",
    website: "",
    email_address: "",
    residential_address: "",
    phone1: "",
    phone2: "",
    school_id: schoolId,
    circuit_id: 0,
  });

  useEffect(() => {
    setFormData((prev: any) => ({ ...prev, school_id: schoolId }));
  }, [schoolId]);

  const handleInputChange = (field: string | number, value: string) => {
    if (field === "region_id" || field === "district_id") return;
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const res: any = await dispatch(addBranch(formData));
      if (res.meta.requestStatus === "fulfilled") {
        showToast("success", "Branch successfully added");
        onClose();
        setFormData({
          branch_name: "",
          postal_address: "",
          website: "",
          email_address: "",
          residential_address: "",
          phone1: "",
          phone2: "",
          school_id: schoolId,
          circuit_id: 0,
        });
      } else {
        showToast(
          "error",
          `Failed to add new branch: ${res.payload?.error || ""}`
        );
      }
    } catch (error) {
      showToast("error", "An unexpected error occurred.");
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Add New Branch</Text>
            <LocationDropDown onLocationChange={handleInputChange} />
            <BranchForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    maxHeight: "90%",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});


export default AddBranch;
