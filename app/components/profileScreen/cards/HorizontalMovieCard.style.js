import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const itemWidth = 110;

export default StyleSheet.create({
  container: {
    backgroundColor: '#D8C4B6',
    marginVertical: 10,
    paddingBottom: 10,
  },

  titleView: {
    padding: 10,
    marginBottom: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  flatlist: {
    margin: 5,
    width: itemWidth,
    alignItems: 'center',
  },

  imageView: {
    width: 100,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },

  filmler: {
    width: '100%',
    height: '100%',
  },
  
  movieTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    width: '100%',
  },
  
  footerLoader: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  }
});