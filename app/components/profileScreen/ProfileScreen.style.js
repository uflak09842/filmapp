import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5EFE7",
    },

    settings: {
        flex: 1,
        zIndex: 1,
        margin: 5,
        padding: 5,
        alignSelf: "flex-end",
        position: 'absolute',
    },

    backdropView: {
        borderBottomWidth: 3,
        borderColor: '#4F709C',
    },
    
    backdrop: {
        width: Dimensions.get('window').width,
        aspectRatio: 4 / 2,
    },

    likedMovies: {
        marginVertical: 10
    }
})