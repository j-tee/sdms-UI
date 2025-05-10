import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/src/api/redux/store';
import {
  getCategories,
  getLevels,
  getOwnershipCategories,
  getReligiousAffiliation
} from '@/src/api/redux/slices/schoolSlice';

type AnyType = { [key: string]: string };

interface SchoolDropdownsProps {
  onChange: (field: keyof AnyType, value: string) => void;
}

const SchoolDropdowns: React.FC<SchoolDropdownsProps> = ({ onChange }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    levels,
    religions,
    categories,
    ownershipCategories,
    religionsLoaded,
    isLoading
  } = useSelector((state: RootState) => state.school);

  // On mount, load all affiliation & dependent lists
  useEffect(() => {
    if (!religionsLoaded) {
      dispatch(getReligiousAffiliation()).then(() => {
        dispatch(getCategories());
        dispatch(getLevels());
        dispatch(getOwnershipCategories());
      });
    }
  }, [dispatch, religionsLoaded]);

  if (isLoading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {/* Religious Affiliation */}
      <Text style={styles.label}>Religious Affiliation</Text>
      <Picker
        selectedValue={''}
        onValueChange={value => onChange('religious_affiliation_id', value.toString())}
        style={styles.picker}
      >
        <Picker.Item label="---Select---" value="" />
        {religions.map((r: { id: React.Key | null | undefined; religion: string | undefined; }) => (
          <Picker.Item key={r.id ?? ''} label={r.religion} value={(r.id ?? '').toString()} />
        ))}
      </Picker>

      {/* Category */}
      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={''}
        onValueChange={value => onChange('category_id', value.toString())}
        style={styles.picker}
      >
        <Picker.Item label="---Select---" value="" />
        {categories.map((c: { id: React.Key | null | undefined; name: string | undefined; }) => (
          <Picker.Item key={c.id ?? ''} label={c.name} value={(c.id ?? '').toString()} />
        ))}
      </Picker>

      {/* Ownership Category */}
      <Text style={styles.label}>Ownership Category</Text>
      <Picker
        selectedValue={''}
        onValueChange={value => onChange('ownership_category_id', value.toString())}
        style={styles.picker}
      >
        <Picker.Item label="---Select---" value="" />
        {ownershipCategories.map((o: { id: React.Key | null | undefined; ownership: string | undefined; }) => (
          <Picker.Item key={o.id ?? ''} label={o.ownership} value={(o.id ?? '').toString()} />
        ))}
      </Picker>

      {/* Level */}
      <Text style={styles.label}>Level</Text>
      <Picker
        selectedValue={''}
        onValueChange={value => onChange('level_id', value.toString())}
        style={styles.picker}
      >
        <Picker.Item label="---Select---" value="" />
        {levels
          .filter((l: { id: React.Key | null | undefined; name: string | undefined; }) => l.id != null)
          .map((l: { id: React.Key; name: string | undefined; }) => (
            <Picker.Item key={l.id} label={l.name ?? ''} value={l.id.toString()} />
          ))}
      </Picker>
    </View>
  );
};

export default SchoolDropdowns;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  loader: {
    marginVertical: 20,
  },
});
