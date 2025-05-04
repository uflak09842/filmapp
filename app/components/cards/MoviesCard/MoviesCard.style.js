import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const columnWidth = width / 3 - 16;

export default StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'red',
  },
  listView: {
    margin: 5,
    width: columnWidth,
    height: 220,
    alignItems: 'center',
  },
  imageView: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  mtView: {
    padding: 8,
  },
  mTitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  fullWidthButton: {
    backgroundColor: '#2196F3',
    flex: 1,
  },
  delete: {
    backgroundColor: '#f44336',
  },
  cancel: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
});