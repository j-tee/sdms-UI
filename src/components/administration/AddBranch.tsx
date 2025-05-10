import React, { useEffect, useState, useContext } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
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
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView>
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
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AddBranch;
