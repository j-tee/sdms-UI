import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/navigation/types";
import UserSession from "@/src/utilities/userSession";
import SchoolEdit from "./SchoolEdit";
import AddBranch from "./AddBranch";
import { useSelector } from "react-redux";
import { RootState } from "@/src/api/redux/store";

// Navigation type for this card
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface SchoolCardProps {
  school: any;
  params: any;
}

const SchoolCard: React.FC<SchoolCardProps> = ({ school, params }) => {
  const navigation = useNavigation<NavigationProp>();
  const [isSchoolEditModalOpen, setSchoolEditModalOpen] = useState(false);
  const [isAddBranchModalOpen, setAddBranchModalOpen] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const {user} = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    UserSession.getRoles().then(setRoles);
  }, []);

  const privilegedRoles = [
    "owner",
    "admin",
    "staff",
    "secretary",
    "principal",
    "vice_principal",
  ];

  const validUser = UserSession.isUserStaffOrOwner(
    user.id ?? 0,
    school.all_users
  );

  const canEditOrDelete =
    validUser && roles.some(role => privilegedRoles.includes(role));

  const seeBranches = () => navigation.push("Branches", { school });
  const handleDelete = () => navigation.push("DeleteSchool", { school });
  const handleDetails = () => navigation.push("SchoolDetails", { school });
  const openAddBranchModal = () => setAddBranchModalOpen(true);
  const handleEdit = () => setSchoolEditModalOpen(true);

  return (
    <View style={styles.card}>
      <Image source={{ uri: school.crest_image_url }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{school.school_name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{school.level_name} School</Text>
          <Text style={styles.metaText}>{school.ownership}</Text>
          {school.religion !== "Other" && (
            <Text style={styles.metaText}>{school.religion}</Text>
          )}
        </View>
        <Text style={styles.description}>{school.description}</Text>
        <View style={styles.tagsContainer}>
          {school.tags.map((tag: string, index: number) => (
            <Text key={index} style={styles.tag}>
              {tag}
            </Text>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={seeBranches} style={styles.button}>
            <Text style={styles.buttonText}>Branches</Text>
          </TouchableOpacity>
          {validUser && roles.includes("admin") && (
            <TouchableOpacity onPress={openAddBranchModal} style={styles.button}>
              <Text style={styles.buttonText}>Add New Branch</Text>
            </TouchableOpacity>
          )}
        </View>

        {canEditOrDelete && (
          <View style={styles.linkRow}>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.link}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Text style={styles.link}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDetails}>
              <Text style={styles.link}>Details</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal visible={isSchoolEditModalOpen} animationType="slide">
          <SchoolEdit
            params={params}
            school={school}
            setSchoolEditModalOpen={setSchoolEditModalOpen}
            isVisible={isSchoolEditModalOpen}
            onClose={() => setSchoolEditModalOpen(false)}
          />
        </Modal>

        <Modal visible={isAddBranchModalOpen} animationType="slide">
          <AddBranch
            schoolId={school.id}
            setAddBranchModalOpen={setAddBranchModalOpen}
            isVisible={isAddBranchModalOpen}
            onClose={() => setAddBranchModalOpen(false)}
          />
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    flexDirection: "row",
  },
  image: {
    width: "30%",
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    color: "#555",
    fontWeight: "bold",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 6,
  },
  metaText: {
    color: "#666",
    marginRight: 10,
  },
  description: {
    marginVertical: 5,
    color: "#444",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 5,
  },
  tag: {
    backgroundColor: "#aaa",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
  },
  linkRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
    marginRight: 15,
  },
});

export default SchoolCard;
