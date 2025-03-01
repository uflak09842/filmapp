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
        backgroundColor: 'red'
        
    }
});