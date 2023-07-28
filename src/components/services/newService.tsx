import React, {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
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
import {createService} from '../../api/http';
import {Loader} from '../common/Loader';
import {ServiceListContext} from '../../context/ServicesListContext';

interface Props extends StackScreenProps<RootStackParams, 'newService'> {}
export const NewService = ({navigation}: Props) => {
  const {setNewStatus} = useContext(ServiceListContext);
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serviceTitle, setServiceTitle] = useState<string>('');
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [serviceDuration, setServiceDuration] = useState<number>(0);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [serviceImageToShow, setServiceImageToShow] = useState<any>({
    uri: 'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png',
  });
  const imagePlaceHolder =
    'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png';
  const options: ImageLibraryOptions = {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  };
  const openGallery = async () => {
    const image = await launchImageLibrary(options);
    if (image && image.assets) {
      setServiceImageToShow(image.assets[0]);
      setIsNewImage(true);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', serviceTitle);
    formData.append('image', imagePlaceHolder);
    formData.append('price', String(servicePrice));
    formData.append('duration', String(serviceDuration));
    if (isNewImage) {
      formData.append('archivo', {
        name: serviceImageToShow.fileName,
        type: serviceImageToShow.type,
        uri: serviceImageToShow.uri,
        tempFilePath: serviceImageToShow.uri,
      });
    }
    try {
      await createService(formData);
      ToastAndroid.showWithGravityAndOffset(
        'Servicio creado',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      setIsLoading(false);
      setNewStatus('updating');
      navigation.goBack();
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Error al crear nuevo servicio',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      setIsLoading(false);
      console.log(error);
    }
  };
  return (
    <SafeAreaView
      style={{
        ...styles.formContainer,
      }}>
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
          Nuevo servicio
        </Text>
      </View>

      <ScrollView>
        <View style={styles.formImageContainer}>
          <TouchableOpacity onPress={openGallery}>
            <Image
              source={serviceImageToShow}
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
          }}
          onPress={handleSubmit}>
          {!isLoading ? (
            <Text style={{color: colors.text}}>Guardar cambios</Text>
          ) : (
            <Loader />
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
