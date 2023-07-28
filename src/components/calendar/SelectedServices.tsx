/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {ServiceContext} from '../../context/Service.Context';
import {mostrarHora} from '../../helpers/Date';
import Icon from 'react-native-vector-icons/FontAwesome';

export const SelectedServices = () => {
  const {
    themeState: {colors, titleText, highlightColor},
  } = useContext(ThemeContext);

  const {servicesFinal} = useContext(ServiceContext);

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
        borderBottomWidth: 3,
        borderBottomColor: highlightColor,
      }}>
      {servicesFinal.services.length > 0 ? (
        <>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                color: titleText,
                marginVertical: 10,
                fontSize: 23,
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
            {servicesFinal.services.length > 0 &&
              servicesFinal.services.map((service, i) => (
                <View
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  key={i}>
                  <Icon name={'circle'} color={colors.text} />
                  <Text
                    style={{color: colors.text, fontSize: 17, marginLeft: 6}}>
                    {service.title} - ${service.price}
                  </Text>
                </View>
              ))}
            <Text
              style={{
                color: colors.text,
                fontWeight: 'bold',
                marginTop: 10,
                fontSize: 20,
              }}>
              Costo: ${servicesFinal.totalCost} Tiempo:{' '}
              {mostrarHora(servicesFinal.totalDuration)}
            </Text>
          </View>
        </>
      ) : (
        <View>
          <Text
            style={{
              color: titleText,
              marginVertical: 10,
              fontWeight: 'bold',
              alignItems: 'center',
              textAlign: 'center',
            }}>
            Selecciona Servicios para poder Agendar
          </Text>
        </View>
      )}
    </View>
  );
};
