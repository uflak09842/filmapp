import { View, Text, Button, TouchableWithoutFeedback } from 'react-native';
import styles from './cardStyles.js';
import { router } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

const ErrorCard = ({desc}) => {
    if(!desc || desc === null) desc = 'Bilinmeyen Bir Hata Oluştu';

    return(
        <View style={styles.root}>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>Hata</Text>
                </View>

                <View>
                    <Text style={styles.desc}>{desc}</Text>
                </View>

                <TouchableWithoutFeedback onPress={() => router.replace('/')}>
                    <View style={styles.buttonView}>
                        <Text style={styles.title}>Ana Sayfa <FontAwesome name='rotate-left' size={20} /> </Text>
                    </View>
                </TouchableWithoutFeedback>
                
            </View>
        </View>
    )
}

export default ErrorCard;