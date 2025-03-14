import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#F5EFE7',
    },
    
    container: {
        flex: 1,
        justifyContent: 'center',
    },

    titleView: {
        backgroundColor: '#D8C4B6',
        borderRadius: 10,
        margin: 10,
        marginBottom: 20,
    },

    title: {
        fontSize: 24,
        padding: 10,
        textAlign: 'center',
    },

    listContainer: {
        paddingBottom: 50,
    },

    turView: {
        justifyContent: "space-between",
        flexDirection: 'column',
        margin: 10,
        padding: 5
    },

    genreItem: {
        flex: 1,
        margin: 5,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#D8C4B6',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
        minHeight: 50,
    },

    selectedGenre: {
        backgroundColor: '#4F709C',
    },

    genreName: {
        fontSize: 14,
        textAlign: 'center',
        color: '#333',
    },

    selectedGenreText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    saveButton: {
        backgroundColor: '#4F709C',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    disabledButton: {
        backgroundColor: '#b3b3b3',
    },

    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});