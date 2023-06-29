import React, {useContext} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

type Props = {
  setName: any;
  setEmail: any;
  name: string;
  email: string;
};

export const EmailNameForm = ({setName, setEmail, email, name}: Props) => {
  const {
    themeState: {colors, highlightColor},
  } = useContext(ThemeContext);
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
        placeholderTextColor={colors.text}
        style={{
          ...styles.inputB,
          color: colors.text,
          borderColor: highlightColor,
        }}
      />
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={handleNameChange}
        placeholderTextColor={colors.text}
        style={{
          ...styles.inputB,
          color: colors.text,
          borderColor: highlightColor,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputB: {
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    borderRadius: 20,
  },
});
