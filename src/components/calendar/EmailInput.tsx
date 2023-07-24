import React, {useContext} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {Text} from 'react-native-paper';

type Props = {
  setName: any;
  name: string;
};

export const EmailNameForm = ({setName, name}: Props) => {
  const {
    themeState: {colors, highlightColor},
  } = useContext(ThemeContext);

  const handleNameChange = (text: string) => {
    setName(text);
  };
  return (
    <View style={styles.container}>
      <Text style={{...styles.font, color: colors.text}}>Nombre:</Text>
      <TextInput
        placeholder={name}
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
  container: {
    width: '70%',
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  inputB: {
    borderWidth: 2,
    marginBottom: 5,
    width: '80%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    textAlign: 'center',
  },
});
