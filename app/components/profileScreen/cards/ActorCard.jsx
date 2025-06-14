import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

const ActorCard = ({ actor }) => {
  const router = useRouter();

  const handlePress = (actorId) => {
    router.push({pathname: '/detail/credits', params: {actorId: actorId} });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => handlePress(actor.actorId)}>
      <Image
        source={
          actor.profile ?
          { uri: `https://image.tmdb.org/t/p/w185${actor.profile}` } :
          require('../../../../assets/images/gray.png')
        }
        style={styles.image}
      />
      <Text style={styles.character} numberOfLines={2}>
        {actor.character}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: 120,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderColor: '#4F709C',
    borderWidth: 2.5,
  },
  character: {
    color: '#000',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 5,
    width: '100%',
  },
});

export default ActorCard;