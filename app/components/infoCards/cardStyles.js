import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    root: {
        flex: 1,
        maxHeight: height,
        maxWidth: width,
        backgroundColor: '#F2F3F4',
        justifyContent: 'center',
        padding: 5,
    },

    container: {
        margin: "auto",
        padding: 10,
        backgroundColor: "white",
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#213555",

    },

    titleView: {
        marginBottom: 20,
        alignItems: 'center',
        borderBottomWidth: 4,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        borderColor: '#FF4433'
    },

    title: {
        fontSize: 25,
        textShadowColor: 'gray',
        textShadowOffset: {height: 0.5, width: 0.5},
        textShadowRadius: 1
    },

    desc: {
        fontSize: 18,
    },

    buttonView: {
        backgroundColor: '#4F709C',
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 3,
        padding: 5
    }
})