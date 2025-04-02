import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const columnWidth = width / 3 - 16;

const styles = StyleSheet.create({
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
    width: '100%',
    marginTop: 5,
  },
  mTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
  footerLoader: {
    alignItems: 'center',
    paddingVertical: 20,
    width: '100%',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  }
});

export default styles;