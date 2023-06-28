/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {ServiceContext} from '../../context/Service.Context';
import {mostrarHora} from '../../helpers/Date';

export const SelectedServices = () => {
  const {
    themeState: {colors, titleText, highlightColor, primaryButton},
  } = useContext(ThemeContext);

  const {servicesFinal, updateTotalCost} = useContext(ServiceContext);

  const setServico = () => {
    updateTotalCost({
      ...servicesFinal,
      services: [
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'BUZZ',
          image: {
            uri: 'https://chopshoptrenton.ca/wp-content/uploads/2021/09/Buzz-Cut-Men.png',
          },
          duration: 0.5,
          price: 150,
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Corte',
          image: {
            uri: 'https://chopshoptrenton.ca/wp-content/uploads/2021/09/Buzz-Cut-Men.png',
          },
          duration: 1.5,
          price: 220,
        },
      ],
    });
    console.log(servicesFinal);
  };
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
          <TouchableOpacity
            style={{
              ...styles.newButton,
              backgroundColor: primaryButton,
              borderColor: highlightColor,
            }}
            onPress={setServico}>
            <Text style={{...styles.newButtonText, color: colors.text}}>
              Nuevo
            </Text>
          </TouchableOpacity>
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

const styles = StyleSheet.create({
  newButton: {
    borderRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 40,
    marginVertical: 5,
    marginLeft: 16,
  },
  newButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
