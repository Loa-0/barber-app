import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

type Props = {
  setName: any;
  setEmail: any;
  name: string;
  email: string;
};

export const EmailNameForm = ({setName, setEmail, email, name}: Props) => {
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };
  return (
    <View style={{width: '90%', marginVertical: 10}}>
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputB}
      />
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={handleNameChange}
        style={styles.inputB}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputB: {
    borderWidth: 2,
    marginBottom: 5,
  },
});
