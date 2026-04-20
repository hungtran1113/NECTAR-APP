// screens/FilterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export const FilterScreen = ({ navigation }) => {
  const [selectedCategories, setSelectedCategories] = useState(['Eggs']);
  const [selectedBrands, setSelectedBrands] = useState(['Cocola']);

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const Checkbox = ({ label, isSelected, onPress }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={[styles.checkboxLabel, isSelected && styles.checkboxLabelSelected]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/close-icon.png')} style={styles.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Filters</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Categories</Text>
          {['Eggs', 'Noodles & Pasta', 'Chips & Crisps', 'Fast Food'].map(item => (
            <Checkbox key={item} label={item} isSelected={selectedCategories.includes(item)} onPress={() => toggleSelection(item, selectedCategories, setSelectedCategories)} />
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Brand</Text>
          {['Individual Collection', 'Cocola', 'Ifad', 'Kazi Farmas'].map(item => (
            <Checkbox key={item} label={item} isSelected={selectedBrands.includes(item)} onPress={() => toggleSelection(item, selectedBrands, setSelectedBrands)} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.applyBtnText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 20 },
  closeIcon: { width: 20, height: 20, tintColor: '#181725' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  content: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  sectionCard: { backgroundColor: '#fff', marginTop: 10, borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 20, paddingBottom: 50 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725', marginBottom: 20 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1, borderColor: '#B3B3B3', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  checkboxSelected: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkmark: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  checkboxLabel: { fontSize: 16, color: '#181725' },
  checkboxLabelSelected: { color: '#53B175' },
  bottomBar: { padding: 20, backgroundColor: '#fff' },
  applyBtn: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 18, alignItems: 'center' },
  applyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});