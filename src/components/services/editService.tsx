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
import {updateService} from '../../api/http';
import {Loader} from '../common/Loader';
import {ServiceListContext} from '../../context/ServicesListContext';

interface Props extends StackScreenProps<RootStackParams, 'editService'> {}
export const EditService = ({route, navigation}: Props) => {
  const {id, title, image, price, duration} = route.params;
  const {setNewStatus} = useContext(ServiceListContext);
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serviceTitle, setServiceTitle] = useState<string>(title);
  const [servicePrice, setServicePrice] = useState<number>(price);
  const [serviceDuration, setServiceDuration] = useState<number>(duration);
  const [serviceImageToShow, setServiceImageToShow] = useState<any>(image);
  const [isNewImage, setIsNewImage] = useState<boolean>(false);
  const [showPriceErr, setShowPriceErr] = useState(false);
  const [showDurationErr, setShowDurationErr] = useState(false);
  const options: ImageLibraryOptions = {
    maxHeight: 200,
    maxWidth: 200,
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  };
  const openGallery = async () => {
    const imageResult = await launchImageLibrary(options);
    if (imageResult && imageResult.assets) {
      setServiceImageToShow(imageResult.assets[0]);
      setIsNewImage(true);
    }
  };
  const handlePriceInput = (input: number | string) => {
    if (!input || input === undefined) {
      setServicePrice(0);
      setShowPriceErr(true);
      return;
    }
    if (typeof input === 'number') {
      setServicePrice(input);
      setShowPriceErr(false);
      return;
    }
    setServicePrice(0);
    setShowPriceErr(true);
  };
  const handleDurationInput = (input: number | string) => {
    if (typeof input === 'string') {
      const parsedInput = parseFloat(input);
      if (isNaN(parsedInput)) {
        setServiceDuration(0);
        setShowDurationErr(true);
        return;
      }
      input = parsedInput;
    }
    if (input % 1 !== 0 && input % 1 !== 0.5) {
      setServiceDuration(0);
      setShowDurationErr(true);
      return;
    }
    setServiceDuration(input);
    setShowDurationErr(false);
  };
  const handleSubmit = async () => {
    if (showDurationErr || showPriceErr) {
      ToastAndroid.showWithGravityAndOffset(
        'Error: Revise los campos numéricos',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', serviceTitle);
    formData.append('image', image.uri);
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
      await updateService(formData, id!);
      ToastAndroid.showWithGravityAndOffset(
        'Servicio actualizado',
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
        'Error al actualizar servicio',
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
      <>
        <View style={styles.formTitle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.goBackArrowPos}>
            <View style={styles.goBackWrapper}>
              <FontAwesome5
                name="chevron-left"
                size={globalColors.iconSize}
                color={colors.text}
              />
            </View>
          </TouchableOpacity>

          <Text style={{...styles.formTitleText, color: colors.text}}>
            Editar servicio
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
                  value={servicePrice ?? 0}
                  onChange={handlePriceInput}
                  validateOnBlur
                  editable={!showDurationErr}
                  step={0.01}
                  valueType="real"
                  textColor={colors.text}
                  minValue={0}
                  iconStyle={{color: 'black'}}
                />
              </View>
              {showPriceErr && (
                <Text style={styles.error}>Número inválido</Text>
              )}
            </View>

            <View style={styles.formInputContainer}>
              <Text style={{color: colors.text}}>Duración en horas</Text>
              <View
                style={{
                  borderColor: colors.border,
                }}>
                <NumericInput
                  value={serviceDuration}
                  onChange={handleDurationInput}
                  editable={!showPriceErr}
                  step={0.5}
                  valueType="real"
                  textColor={colors.text}
                  validateOnBlur
                  minValue={0.5}
                  maxValue={2.5}
                  iconStyle={{color: 'black'}}
                />
              </View>
              {showDurationErr && (
                <Text style={styles.error}>
                  Solo se aceptan números enteros y con decimal .5
                </Text>
              )}
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
      </>
    </SafeAreaView>
  );
};
