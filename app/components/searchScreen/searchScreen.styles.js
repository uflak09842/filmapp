import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    root: {
        flex: 1,
        maxHeight: height,
        maxWidth: width,
        backgroundColor: '#F5EFE7'
    },

    modalView: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },

    modalInnerView: {
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white',
    },

    modalTitle: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 10,
    },

    modalText: {
        fontSize: 16,
        textAlign: 'center',
    },

    modalButton: {
        marginTop: 20,
        padding: 7,
        backgroundColor: '#4F709C',
        borderRadius: 10
    },

    container: {
        flex: 1,
        marginHorizontal: 5,
        paddingHorizontal: 5,
    },

    titleView: {
        backgroundColor: '#D8C4B6',
        marginTop: 10,
        borderRadius: 3,
    },

    titleContainer: {
        alignItems: 'center',
        padding: 5,
        flexDirection: 'row',
        height: 40,
        borderColor: '#4F709C',
        borderWidth: 3,
        borderRadius: 3,
    },

    input: {
        height: 40,
        width: width / 1.2,
        margin: 5,
        padding: 5,
        borderRadius: 3,
    },

    listView: {
        margin: 5,
        padding: 5,
        flex: 1,
        alignItems: 'center',
        borderWidth: 2,
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