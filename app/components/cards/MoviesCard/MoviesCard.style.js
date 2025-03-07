import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({

    listView: {
        margin: 5,
        padding: 5,
        flex: 1,
        alignItems: 'center',
        borderColor: '#4F709C',
        borderWidth: 3,
        borderRadius: 5
    },

    imageView: {
        
    },

    image: {
        width: 100,
        height: 150,
        borderWidth: 1,
        borderRadius: 3,
    },

    mtView: {
        marginTop: 5,
        flex: 1,
        justifyContent: 'center',
        alignSelf: "stretch",
        backgroundColor: '#D8C4B6',
        padding: 5,
        borderWidth: 1,
    },

    mTitle: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "700",
        color: 'black',
        textAlignVertical: "center"
    },
});