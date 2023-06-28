/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {ServiceContext} from '../../context/Service.Context';
import {mostrarHora} from '../../helpers/Date';

export const SelectedServices = () => {
  const {
    themeState: {colors, titleText},
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
      }}>
      {servicesFinal.services.length > 0 ? (
        <>
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
            {servicesFinal.services.length > 0 &&
              servicesFinal.services.map((service, i) => (
                <Text style={{color: colors.text}} key={i}>
                  {service.title} - ${service.price}
                </Text>
              ))}
            <Text
              style={{color: colors.text, fontWeight: 'bold', marginTop: 10}}>
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
