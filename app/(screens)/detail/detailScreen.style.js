import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5EFE7",
    },

    resimPanel: {
        borderBottomWidth: 3,
        position: 'relative',
    },

    loading: {
        flex: 1,
        alignSelf: 'center', 
        justifyContent: 'center',
        position: 'absolute', 
        zIndex: 1,
        top: 0, 
        left: 0,
        right: 0,
        bottom: 0
    },

    resim: {
        width: width,
        aspectRatio: 16 / 9,
    }
});