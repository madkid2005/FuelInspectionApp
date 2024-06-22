import React from 'react';
import { View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="شروع بازرسی"
        onPress={() => navigation.navigate('Calculations')}
      />
    </View>
  );
};

export default HomeScreen;
