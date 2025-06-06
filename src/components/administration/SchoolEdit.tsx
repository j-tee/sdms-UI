import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { launchImageLibrary } from "react-native-image-picker";
import { updateSchool } from "@/src/api/redux/slices/schoolSlice";
import { AppDispatch } from "@/src/api/redux/store";
import { showToast } from "@/src/utilities/toast";

type SchoolEditProps = {
  isVisible: boolean;
  onClose: () => void;
  school: any;
  params: any;
  setSchoolEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SchoolEdit: React.FC<SchoolEditProps> = ({
  setSchoolEditModalOpen,
  isVisible,
  onClose,
  school,
  params,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [schoolName, setSchoolName] = useState(school.school_name);
  const [crestImage, setCrestImage] = useState<any>(null);
  const [backgroundImage, setBackgroundImage] = useState<any>(null);
  const [crestPreview, setCrestPreview] = useState(school.crest_image_url);
  const [backgroundPreview, setBackgroundPreview] = useState(
    school.bg_image_url
  );

  useEffect(() => {
    setSchoolName(school.school_name);
    setCrestPreview(school.crest_image_url);
    setBackgroundPreview(school.bg_image_url);
  }, [school]);

  const selectImage = async (
    setter: React.Dispatch<React.SetStateAction<any>>,
    previewSetter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      quality: 0.5,
    });
    if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      if (asset.fileSize && asset.fileSize > 102400) {
        showToast("error", "Image size should not exceed 100KB");
        return;
      }
      setter(asset);
      previewSetter(asset.uri || "");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("school[school_name]", schoolName);
    if (crestImage) {
      formData.append("school[crest_image]", {
        uri: crestImage.uri,
        type: crestImage.type,
        name: crestImage.fileName,
      } as unknown as Blob);
    }
    if (backgroundImage) {
      formData.append("school[background_picture_image]", {
        uri: backgroundImage.uri,
        type: backgroundImage.type,
        name: backgroundImage.fileName,
      } as unknown as Blob);
    }

    try {
      const response = await dispatch(updateSchool(formData));
      if (response.payload.status === "success") {
        showToast("success", response.payload.message);
        onClose();
      } else {
        showToast("error", response.payload.message);
      }
    } catch (error) {
      showToast("error", "An error occurred while updating the school.");
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>Edit: {school.school_name}</Text>

            <View style={styles.imageContainer}>
              <Text style={styles.label}>School Crest</Text>
              {crestPreview ? (
                <Image source={{ uri: crestPreview }} style={styles.image} />
              ) : null}
              <TouchableOpacity
                style={styles.button}
                onPress={() => selectImage(setCrestImage, setCrestPreview)}
              >
                <Text style={styles.buttonText}>Select Crest Image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.imageContainer}>
              <Text style={styles.label}>Background Picture</Text>
              {backgroundPreview ? (
                <Image source={{ uri: backgroundPreview }} style={styles.image} />
              ) : null}
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  selectImage(setBackgroundImage, setBackgroundPreview)
                }
              >
                <Text style={styles.buttonText}>Select Background Image</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>School Name</Text>
              <TextInput
                style={styles.input}
                value={schoolName}
                onChangeText={setSchoolName}
                placeholder="Enter school name"
              />
            </View>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Update</Text>
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
  imageContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
    resizeMode: "cover",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default SchoolEdit;
