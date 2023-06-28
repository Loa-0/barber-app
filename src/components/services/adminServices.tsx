import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {styles as S, globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from './editStyles';
import {InfoModal} from './infoModal';
import {StackScreenProps} from '@react-navigation/stack';
import {serviceInfoType} from './types';
import {getServicesList} from '../../api/http';

type ItemProps = {
  service: serviceInfoType;
  onClickEdit: (service: serviceInfoType) => any;
};

const Item = ({service, onClickEdit}: ItemProps) => {
  const {
    themeState: {colors, transparentBackground, secondaryButton},
  } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      style={{...styles.item, backgroundColor: transparentBackground}}
      onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={service.image} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleImagePress}>
        <Text
          style={{
            ...styles.title,
            color: colors.text,
            textShadowColor: colors.background,
          }}>
          {service.title}
        </Text>
        <Text style={{...styles.price, color: colors.text}}>
          ${service.price}
        </Text>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: secondaryButton,
            borderColor: colors.border,
          }}
          onPress={() => {
            onClickEdit(service);
          }}>
          <Text style={{...styles.buttonText}}>
            <FontAwesome5
              name="edit"
              color={'black'}
              size={globalColors.iconSize}
            />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <InfoModal
        price={service.price}
        duration={service.duration}
        visible={modalVisible}
        onClose={handleImagePress}
      />
    </TouchableOpacity>
  );
};
interface Props extends StackScreenProps<any, any> {}
export const AdminServicesView = ({navigation}: Props) => {
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);

  const [servicesList, setServicesList] = useState<serviceInfoType[]>([]);

  useEffect(() => {
    listServices();
  }, [servicesList]);

  const listServices = async () => {
    try {
      const services = await getServicesList();
      setServicesList(services);
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravityAndOffset(
        'Error obteniendo servicios',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
    }
  };

  const navigateEditServices = ({
    id,
    title,
    image,
    price,
    duration,
  }: serviceInfoType) => {
    navigation.navigate('AdminServices', {
      screen: 'editService',
      params: {id, title, image, price, duration},
    });
  };
  const navigateNewService = () => {
    navigation.navigate('AdminServices', {
      screen: 'newService',
    });
  };
  return (
    <View style={{...S.globalContainer}}>
      <TouchableOpacity
        style={{
          ...styles.newButton,
          backgroundColor: primaryButton,
          borderColor: highlightColor,
        }}
        onPress={navigateNewService}>
        <Text style={{...styles.newButtonText, color: colors.text}}>Nuevo</Text>
      </TouchableOpacity>
      <FlatList
        data={servicesList}
        renderItem={({item}) => (
          <Item service={item} onClickEdit={navigateEditServices} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
