import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#F5EFE7",
    },

    bdView: {
        borderColor: '#4F709C',
        borderBottomWidth: 3,
        position: 'relative',
    },

    geriDon: {
        flex: 1,
        position: 'absolute',
        zIndex: 1,
        alignSelf: "flex-end",
        padding: 5
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

    backDrop: {
        width: width,
        aspectRatio: 16 / 9,
    },

    infoView: {
        flexDirection: 'row',
        borderColor: '#4F709C',
        borderRightWidth: 1,
        borderBottomWidth: 3,
        backgroundColor: '#D8C4B6',
        alignItems: 'center'
    },

    posterView: {
        borderColor: '#4F709C',
        borderRightWidth: 2,
        overflow: "hidden",
    },

    poster: {
        height: 150,
        width: 100
    },

    etcView: {
        flex: 1,
        flexDirection: "column",
        alignItems: 'center',
    },

    titleView: {
        alignSelf: 'center',
        padding: 5,
    },

    title: {
        fontSize: 20,
        textAlign: "center",
        borderColor: '#4F709C',
        borderBottomWidth: 3,
        borderRadius: 10,
    },

    innerDescView: {
        marginHorizontal: 5,
    },

    taglineView: {
        marginTop: 5,
        alignSelf: 'center',
        borderColor: '#4F709C',
        borderLeftWidth: 3,
        borderRightWidth: 3,
        borderRadius: 5
    },

    tagline: {
        fontSize: 16,
        textAlign: 'center'
    },

    lrView: {
        marginVertical: 10,
        flexDirection: 'row',
        alignSelf: 'center'
    },

    text: {
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold'
    },

    interactView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    reactBox: {
        marginTop: 10,
        padding: 5
    },

    descView: {
        margin: 10,
        padding: 5,
        backgroundColor: '#D8C4B6',
        borderColor: '#4F709C',
        borderWidth: 3,
        borderRadius: 3,
    },

    desc: {
        fontSize: 18,
        textAlign: 'justify',
        textAlignVertical: "center",
    },

    recommendCard: {
        marginVertical: 10,
        marginBottom: 50
    },
});