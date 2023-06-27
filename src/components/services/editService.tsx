import React, {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './editStyles';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useContext, useState} from 'react';
import {ThemeContext} from '../../context/ThemeContext';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../../navigator/stacknavigator/StackNavigatorAdmin';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {globalColors} from '../../theme/AppStyles';
import NumericInput from 'react-native-numeric-input';

interface Props extends StackScreenProps<RootStackParams, 'editService'> {}
export const EditService = ({route, navigation}: Props) => {
  const {id, title, image, price, duration} = route.params;
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  const [serviceTitle, setServiceTitle] = useState<string>(title);
  const [servicePrice, setServicePrice] = useState<number>(price);
  const [serviceDuration, setServiceDuration] = useState<number>(duration);
  const options: ImageLibraryOptions = {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  };
  const openGallery = async () => {
    const image = launchImageLibrary(options);
  };
  return (
    <SafeAreaView
      style={{
        ...styles.formContainer,
      }}>
      <>
        <View style={styles.formTitle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackArrowPos}>
            <FontAwesome5
              name="chevron-left"
              size={globalColors.iconSize}
              color={colors.text}
            />
          </TouchableOpacity>

          <Text style={{...styles.formTitleText, color: colors.text}}>
            Editar servicio
          </Text>
        </View>

        <ScrollView>
          <View style={styles.formImageContainer}>
            <TouchableOpacity onPress={openGallery}>
              <Image
                source={image}
                style={{
                  ...styles.formImage,
                  borderColor: colors.text,
                }}
              />

              <View style={styles.formCameraPos}>
                <FontAwesome5
                  name="camera"
                  size={globalColors.iconSize}
                  color={colors.text}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <View style={styles.formInputContainer}>
              <Text style={{color: colors.text}}>Nombre</Text>
              <View
                style={{
                  ...styles.formTextBox,
                  borderColor: colors.border,
                }}>
                <TextInput
                  value={serviceTitle}
                  onChangeText={value => setServiceTitle(value)}
                  editable={true}
                  cursorColor={colors.text}
                  style={{color: colors.text}}
                />
              </View>
            </View>

            <View style={styles.formInputContainer}>
              <Text style={{color: colors.text}}>Precio</Text>
              <View
                style={{
                  borderColor: colors.border,
                }}>
                <NumericInput
                  value={servicePrice}
                  onChange={value => {
                    setServicePrice(value);
                  }}
                  step={0.01}
                  valueType="real"
                  textColor={colors.text}
                  minValue={0}
                  iconStyle={{color: 'black'}}
                />
              </View>
            </View>

            <View style={styles.formInputContainer}>
              <Text style={{color: colors.text}}>Duración en horas</Text>
              <View
                style={{
                  borderColor: colors.border,
                }}>
                <NumericInput
                  value={serviceDuration}
                  onChange={value => {
                    setServiceDuration(value);
                  }}
                  step={0.5}
                  valueType="real"
                  textColor={colors.text}
                  minValue={0.5}
                  iconStyle={{color: 'black'}}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: primaryButton,
              borderColor: highlightColor,
              ...styles.formSubmitBtn,
            }}>
            <Text style={{color: colors.text}}>Guardar cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};
