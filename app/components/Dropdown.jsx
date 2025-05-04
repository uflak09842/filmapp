import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Modal,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Dropdown = ({ 
  options, 
  selectedValue, 
  onValueChange, 
  placeholder = 'Seçiniz',
  label,
  containerStyle = {}
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelect = (value) => {
    onValueChange(value);
    toggleModal();
  };

  const handleClear = () => {
    onValueChange(null);
    toggleModal();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.optionItem} 
      onPress={() => handleSelect(item)}
    >
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleModal}>
        <Text style={[styles.selectedText, !selectedValue && styles.placeholderText]}>
          {selectedValue || placeholder}
        </Text>
        <AntDesign name="down" size={16} color="#213555" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{label || "Seçiniz"}</Text>
                  <TouchableOpacity onPress={toggleModal}>
                    <AntDesign name="close" size={20} color="#213555" />
                  </TouchableOpacity>
                </View>
                
                {options.length > 0 ? (
                  <FlatList
                    data={options}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `option-${index}`}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    style={styles.optionsList}
                  />
                ) : (
                  <Text style={styles.noOptionsText}>Seçenek bulunmamaktadır</Text>
                )}
                
                {selectedValue && (
                  <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                    <Text style={styles.clearButtonText}>Temizle</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#213555',
    marginBottom: 5,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  selectedText: {
    fontSize: 14,
    color: '#213555',
    flex: 1,
  },
  placeholderText: {
    color: '#9E9E9E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#213555',
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  optionText: {
    fontSize: 14,
    color: '#213555',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  noOptionsText: {
    padding: 20,
    textAlign: 'center',
    color: '#9E9E9E',
  },
  clearButton: {
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  clearButtonText: {
    color: '#F44336',
    fontWeight: '500',
  },
});

export default Dropdown;