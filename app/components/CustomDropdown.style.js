import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      width: '100%',
    },
    selector: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#D1D5DB',
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
      paddingVertical: 12,
      paddingHorizontal: 12,
      height: 48,
    },
    selectorError: {
      borderColor: '#EF4444',
    },
    icon: {
      marginRight: 10,
    },
    selectorText: {
      flex: 1,
      fontSize: 16,
      color: '#111827',
    },
    placeholderText: {
      color: '#9CA3AF',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContent: {
      width: '90%',
      maxHeight: '80%',
      backgroundColor: 'white',
      borderRadius: 12,
      overflow: 'hidden',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#111827',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E7EB',
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: '#111827',
    },
    list: {
      maxHeight: 350,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#F3F4F6',
    },
    selectedOption: {
      backgroundColor: '#F0F9FF',
    },
    optionText: {
      fontSize: 16,
      color: '#374151',
    },
    selectedOptionText: {
      color: '#3B82F6',
      fontWeight: '500',
    },
    emptyContainer: {
      padding: 16,
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 16,
      color: '#6B7280',
    },
})