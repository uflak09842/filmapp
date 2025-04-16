import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './CustomDropdown.style.js';

const CustomDropdown = ({ 
  data, 
  value, 
  onChange, 
  placeholder = "Seçiniz", 
  searchPlaceholder = "Ara",
  onBlur = () => {},
  hasError = false,
  name = 'dropdown'
}) => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const getSelectedItemLabel = () => {
    if (!value) return '';
    const item = data.find(item => item.key === value);
    return item ? item.value : '';
  };

  const getFilteredItems = () => {
    if (!search.trim()) return data;
    return data.filter(item => 
      item.value.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    
    const syntheticEvent = {
      target: {
        name: name,
        value: item.key
      },
      persist: () => {}
    };
    
    onChange(item.key);
    
    const blurEvent = {
      target: {
        name: name,
        value: item.key
      },
      persist: () => {}
    };
    onBlur(blurEvent);
    
    setVisible(false);
  };

  const handleClose = () => {
    const blurEvent = {
      target: {
        name: name,
        value: value
      },
      persist: () => {}
    };
    onBlur(blurEvent);
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.selector,
          hasError && styles.selectorError
        ]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <MaterialIcons name="public" size={20} color="#666" style={styles.icon} />
        <Text style={[
          styles.selectorText,
          !getSelectedItemLabel() && styles.placeholderText
        ]}>
          {getSelectedItemLabel() || placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleClose}
        >
          <View 
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ülke Seçin</Text>
              <TouchableOpacity onPress={handleClose}>
                <MaterialIcons name="close" size={24} color="#374151" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <MaterialIcons name="clear" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              data={getFilteredItems()}
              keyExtractor={(item) => item.key.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    value === item.key && styles.selectedOption
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[
                    styles.optionText,
                    value === item.key && styles.selectedOptionText
                  ]}>
                    {item.value}
                  </Text>
                  {value === item.key && (
                    <MaterialIcons name="check" size={20} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>Sonuç bulunamadı</Text>
                </View>
              }
              style={styles.list}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CustomDropdown;