import { StyleSheet, Dimensions, StatusBar } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerImage: {
    width: '100%',
    height: height * 0.55,
  },
  headerGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: '#4F709C'
  },
  posterContainer: {
    marginRight: 15,
    borderRadius: 8,
    overflow: 'hidden',
    width: width * 0.28,
    height: width * 0.42,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#4F709C'
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tagline: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  basicInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
  },
  genres: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  likeButton: {
    backgroundColor: 'rgba(79, 112, 156, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(79, 112, 156, 0.3)'
  },
  likeButtonActive: {
    backgroundColor: '#4F709C',
    borderColor: '#4F709C',
  },
  watchButton: {
    backgroundColor: 'rgba(216, 196, 182, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(216, 196, 182, 0.5)'
  },
  watchButtonActive: {
    backgroundColor: '#D8C4B6',
    borderColor: '#D8C4B6',
  },
  buttonText: {
    color: '#4F709C',
    marginLeft: 5,
    fontWeight: '500',
  },
  buttonTextActive: {
    color: 'white',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 76, 76, 0.1)',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF4C4C'
  },
  errorText: {
    color: '#FF4C4C',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#F7F7F7',
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0'
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15
  },
  sectionIndicator: {
    height: 20,
    width: 4,
    backgroundColor: '#4F709C',
    marginRight: 8,
    borderRadius: 2
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  readMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  readMoreText: {
    color: '#4F709C',
    fontWeight: '500',
  },
  sectionContainer: {
    marginTop: 25,
  },
  horizontalListContent: {
    paddingHorizontal: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  centeredLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  }
});