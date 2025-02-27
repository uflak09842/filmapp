import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 5,
        maxHeight: height,
        maxWidth: width,
    },
    innerContainer: {
        margin: "auto",
        padding: 10,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "black",
        boxShadow: "0 0 5px 1px gray",
        justifyContent: "space-between",
        maxWidth: 230,
    },
    lieView: {
        marginVertical: 5
    },
    input: {
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        width: 250,
        maxWidth: 200,
        height: 30,
        maxHeight: 35,
    },

    title: {
        fontSize: 24,
        marginBottom: 10
    },

    text: {
        marginBottom: 5,
        color: "black",
        fontSize: 16,
        fontWeight: "heavy",
    },

    errorText: {
        color: "red",
        marginTop: 3,
        alignSelf: "center",
    },

    linkText: {
        color: "blue",
        textDecorationLine: "underline",
        cursor: "pointer"
    },

    footerView: {
        marginTop: 10,
    },

    //signup ülke selectlist
    selectBox: {
        maxWidth: 200,
        height: 35,
        alignItems: "center",
    },
    selectDrop: {
        maxHeight: 200,
        maxWidth: 200,
    },
    selectInput: {
        height: 30,
        width: 150,
        textAlign: 'left',
        overflow: "hidden",
        marginRight: 3,
        padding: 5,
        
    },
    //end

    button: {
        marginTop: 20
    }

});