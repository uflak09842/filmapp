import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F2F3F4",
    },

    settings: {
        flex: 1,
        zIndex: 1,
        margin: 5,
        padding: 5,
        alignSelf: "flex-end",
        position: 'absolute',
    },

    settingsIco: {
        textShadowColor: 'black',
        textShadowOffset: { height: 1, width: 1},
        textShadowRadius: 3
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