import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';

//Penfig uPDATE

const DATA = {
  total: 240,
  time: 2,
  servicios: [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'FADE',
      cost: 10,
      image: {
        uri: 'https://content.latest-hairstyles.com/wp-content/uploads/casual-slick-back-mens-haircut-with-fade.jpg',
      },
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'BUZZ',
      cost: 10,
      image: {
        uri: 'https://chopshoptrenton.ca/wp-content/uploads/2021/09/Buzz-Cut-Men.png',
      },
    },
  ],
};
export const SelectedServices = () => {
  const {
    themeState: {colors, titleText},
  } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 30,
        backgroundColor: colors.background,
        shadowColor: colors.text,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: titleText,
            marginVertical: 10,
            fontWeight: 'bold',
            alignItems: 'center',
          }}>
          Servicios Seleccionados:
        </Text>
      </View>
      <View
        style={{
          height: '50%',
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {DATA.servicios.length > 1 &&
          DATA.servicios.map(service => (
            <Text style={{color: colors.text}}>
              {service.title} - ${service.cost}
            </Text>
          ))}
        <Text style={{color: colors.text, fontWeight: 'bold', marginTop: 10}}>
          Costo: ${DATA.total} Tiempo: {DATA.time}
        </Text>
      </View>
    </View>
  );
};
