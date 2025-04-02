import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        backgroundColor: '#F5EFE7',
    },
});