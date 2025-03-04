import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, ActivityIndicator } from "react-native";

const CompaniesCard = ({name, logo}) => {
    const styles = StyleSheet.create({
        root: {
            width: Dimensions.get('window').width,
            marginTop: 10,
            marginBottom: 10,
            backgroundColor: '#D8C4B6',
            padding: 10,
            borderTopWidth: 3,
            borderBottomWidth: 3,
            borderColor: '#4F709C',
        },
        
        logo: {
            aspectRatio: 10 / 2
        },
    });

    const [ loading, setLoading ] = useState(true); 
    
    return(
        <View style={styles.root}>
            <View style={styles.container}>
                <Image 
                    source={{uri: process.env.EXPO_PUBLIC_HIGH_IMAGE_URL + logo}} 
                    style={styles.logo} 
                    resizeMode={"contain"}
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
            </View>
        </View>
    );
};

export default CompaniesCard;