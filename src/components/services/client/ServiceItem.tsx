/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity, ToastAndroid} from 'react-native';
import {styles as S} from './ServiceItem.style';
import {ImagenModal} from './ImagenModal';
import {serviceInfoType} from '../types';
import {ThemeContext} from '../../../context/ThemeContext';
import {LIMITHOURSSERVICE} from '../../../const/configurations';
import {Divider} from '../../Divider';
import {mostrarHora} from '../../../helpers/Date';

type ItemProps = {
  item: serviceInfoType;
  setServices: any;
  selectSer: serviceInfoType[];
};

export const ServiceItem = ({item, setServices, selectSer}: ItemProps) => {
  const {
    themeState: {colors, servWhite, bulletFree, highlightColor},
  } = useContext(ThemeContext);
  const [modalPic, setModalPic] = useState(false);
  const [wordReserved, setwordReserved] = useState<string>('Reservar');

  useEffect(() => {
    if (selectSer.length === 0) {
      setwordReserved('Reservar');
    }
  }, [selectSer]);

  const currentSum = selectSer.reduce(
    (sum, service) => sum + service.duration,
    0,
  );
  const handleImagePic = () => {
    setModalPic(!modalPic);
  };

  const handleReservationPress = (i: serviceInfoType) => {
    const newA = selectSer.filter(ev => ev.id === i.id);
    if (newA.length > 0) {
      const newD = selectSer.filter(ev => ev.id !== i.id);
      setwordReserved('Reservar');
      setServices(newD);
    } else {
      const newSum = currentSum + i.duration;
      if (newSum <= LIMITHOURSSERVICE) {
        setwordReserved('Quitar');
        setServices((prev: any) => [...prev, {...i, resvBool: true}]);
      } else {
        ToastAndroid.showWithGravityAndOffset(
          'Maximo 2 horas por cita',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
          0,
          210,
        );
      }
    }
  };

  function addStyle() {
    if (wordReserved === 'Reservar') {
      return {backgroundColor: bulletFree};
    } else {
      return {backgroundColor: highlightColor};
    }
  }

  return (
    <>
      <View
        style={{
          ...S.itemMainBox,
          backgroundColor: servWhite,
          borderColor: colors.border,
          shadowColor: colors.border,
        }}>
        <TouchableOpacity style={S.contentBox} onPress={handleImagePic}>
          <View>
            <Image source={item.image} style={S.leftImage} />
          </View>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={S.box1}>
              <Text
                style={{
                  ...S.Servicetitle,
                  color: colors.text,

                  textShadowColor: colors.background,
                }}>
                {item.title}
              </Text>
              <Divider heig={2} />
            </View>
            <View style={S.box2}>
              <Text style={S.priceTxt}>Precio: ${item.price}</Text>
              <View style={{width: 10}} />
              <Text style={S.priceTxt}>
                Tiempo: {mostrarHora(item.duration)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={[S.reserveBtn, addStyle()]}
            onPress={() => {
              handleReservationPress(item);
            }}>
            <Text style={S.buttonText}>{wordReserved}</Text>
          </TouchableOpacity>
        </View>
        <ImagenModal
          imagen={item.image}
          visible={modalPic}
          onClose={handleImagePic}
        />
      </View>
    </>
  );
};
