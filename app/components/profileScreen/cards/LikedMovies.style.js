import { StyleSheet, Dimensions } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: '#D8C4B6',
    },

    titleView: {
        padding: 5,
    },

    title: {
        fontSize: 18,
        textShadowOffset: {width: 0.5, height: 0.5},
        textShadowColor: '#213555',
        textShadowRadius: 1
    },

    flatlist: {
        margin: 10,
        paddingVertical: 10
    },

    filmler: {
        height: 150,
        width: 100,
        borderWidth: 1,
        borderRadius: 2
    },
})