import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    root: {
        flex: 1,
        maxHeight: height,
        maxWidth: width,
        backgroundColor: '#F5EFE7'
    },

    container: {
        flex: 1,
        margin: 5,
        padding: 5
    },

    titleView: {
        backgroundColor: '#D8C4B6',
        marginBottom: 10,
        borderRadius: 3,
    },

    titleContainer: {
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
        height: 40,
        borderWidth: 1,
        borderRadius: 3,
    },

    input: {
        height: 40,
        width: width / 1.2,
        margin: 5,
        padding: 5,
        borderRadius: 3
    }
});