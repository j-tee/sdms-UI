import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
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
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Edit: {school.school_name}</Text>

        <View style={styles.imageContainer}>
          <Text style={styles.label}>School Crest</Text>
          {crestPreview ? (
            <Image source={{ uri: crestPreview }} style={styles.image} />
          ) : null}
          <Button
            title="Select Crest Image"
            onPress={() => selectImage(setCrestImage, setCrestPreview)}
          />
        </View>

        <View style={styles.imageContainer}>
          <Text style={styles.label}>Background Picture</Text>
          {backgroundPreview ? (
            <Image source={{ uri: backgroundPreview }} style={styles.image} />
          ) : null}
          <Button
            title="Select Background Image"
            onPress={() =>
              selectImage(setBackgroundImage, setBackgroundPreview)
            }
          />
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

        {/* Implement SchoolDropdowns component as needed */}

        <View style={styles.buttonContainer}>
          <Button title="Update" onPress={handleSubmit} />
          <Button title="Cancel" onPress={onClose} color="red" />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default SchoolEdit;
