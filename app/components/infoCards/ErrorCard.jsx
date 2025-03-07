import { View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import styles from './cardStyles.js';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const ErrorCard = ({desc, navigate}) => {
    if(!desc || desc === null) desc = 'Bilinmeyen Bir Hata Oluştu';
    navigate ? navigate : '/(tabs)/Home';

    return(
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Hata</Text>
                </View>

                <View>
                    <Text style={styles.desc}>{desc}</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => router.replace(navigate)}>
                    <View style={styles.buttonView}>
                        <Text style={styles.desc}>Ana Sayfa <FontAwesome name='rotate-left' size={20} /> </Text>
                    </View>
                </TouchableWithoutFeedback>
                
            </View>
        </View>
    )
}

export default ErrorCard;