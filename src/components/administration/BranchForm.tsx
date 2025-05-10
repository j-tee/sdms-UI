import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type BranchFormProps = {
  formData: {
    branch_name: string;
    website: string;
    email_address: string;
    phone1: string;
    phone2: string;
    postal_address: string;
    residential_address: string;
  };
  handleInputChange: (field: string, value: string) => void;
};

const BranchForm: React.FC<BranchFormProps> = ({
  formData,
  handleInputChange,
}) => {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Branch Name</Text>
          <TextInput
            style={styles.input}
            value={formData.branch_name}
            onChangeText={(text) => handleInputChange("branch_name", text)}
            placeholder="Branch Name"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={styles.input}
            value={formData.website}
            onChangeText={(text) => handleInputChange("website", text)}
            placeholder="Website"
          />
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email_address}
            onChangeText={(text) => handleInputChange("email_address", text)}
            placeholder="Email"
            keyboardType="email-address"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.columnWide}>
          <Text style={styles.label}>Phone 1</Text>
          <TextInput
            style={styles.input}
            value={formData.phone1}
            onChangeText={(text) => handleInputChange("phone1", text)}
            placeholder="Phone 1"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.columnWide}>
          <Text style={styles.label}>Phone 2</Text>
          <TextInput
            style={styles.input}
            value={formData.phone2}
            onChangeText={(text) => handleInputChange("phone2", text)}
            placeholder="Phone 2"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.columnWide}>
          <Text style={styles.label}>Postal Address</Text>
          <TextInput
            style={styles.input}
            value={formData.postal_address}
            onChangeText={(text) => handleInputChange("postal_address", text)}
            placeholder="Postal Address"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.fullWidth}>
          <Text style={styles.label}>Residential Address</Text>
          <TextInput
            style={styles.input}
            value={formData.residential_address}
            onChangeText={(text) =>
              handleInputChange("residential_address", text)
            }
            placeholder="Residential Address"
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  columnWide: {
    flex: 1,
    marginRight: 8,
  },
  fullWidth: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
  },
});

export default BranchForm;
