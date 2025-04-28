import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text, Dimensions } from "react-native";

const CompaniesCard = ({name, logo}) => {
    const [loading, setLoading] = React.useState(true);
    
    return(
        <View style={styles.container}>
            <View style={styles.cardContent}>
                {loading && (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="small" color="#4F709C" />
                    </View>
                )}
                <Image
                    source={{uri: process.env.EXPO_PUBLIC_MIDDLE_IMAGE_URL + logo}}
                    loadingIndicatorSource={require('../../../assets/images/gray.png')}
                    style={styles.logo}
                    resizeMode={"contain"}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </View>
            <Text style={styles.companyName} numberOfLines={1}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 180,
        marginHorizontal: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    cardContent: {
        width: 160,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#4F709C',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    companyName: {
        marginTop: 8,
        fontSize: 12,
        color: '#333',
        fontWeight: '500',
        textAlign: 'center',
        width: '100%',
    }
});

export default CompaniesCard;