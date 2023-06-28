import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {HeaderComponent} from '../components/HeaderComponent';
import {serviceInfoType} from '../components/services/types';
import {getServicesList} from '../api/http';
import {ServiceContext} from '../context/Service.Context';

type ItemProps = {
  id: string;
  title: string;
  image: any;
  price: number;
  duration: number;
  setServices: any;
};

const Item = ({title, image}: ItemProps) => {
  const {
    themeState: {
      colors,
      textShadowColor,
      transparentBackground,
      secondaryButton,
    },
  } = useContext(ThemeContext);
  return (
    <View
      style={{
        ...styles.item,
        borderColor: colors.border,
        backgroundColor: transparentBackground,
      }}>
      <Image source={image} style={{...styles.image}} />
      <View style={styles.content}>
        <Text
          style={{
            ...styles.title,
            color: colors.text,
            textShadowColor: textShadowColor,
          }}>
          {title}
        </Text>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: secondaryButton,
            borderColor: colors.border,
          }}>
          <Text style={{...styles.buttonText}}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ServicesScreen = () => {
  const {
    themeState: {colors, titleText, sCarColor},
  } = useContext(ThemeContext);
  const {updateTotalCost} = useContext(ServiceContext);

  const [servicesArray, setServicesArray] = useState<serviceInfoType[]>([]);

  const sCar = () => {
    if (servicesArray.length > 0) {
      updateTotalCost({
        services: servicesArray,
      });
    }
  };

  const [servicesList, setServicesList] = useState<serviceInfoType[]>([]);

  useEffect(() => {
    console.log(servicesArray);
  }, [servicesArray]);

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
  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: colors.background}}>
      <FlatList
        data={servicesList}
        ListHeaderComponent={<HeaderComponent title="Servicios" />}
        renderItem={({item}) => (
          <Item
            id={item.id!.toString()}
            title={item.title}
            image={item.image}
            price={item.price}
            duration={item.duration}
            setServices={setServicesArray}
          />
        )}
      />
      <TouchableOpacity
        style={{...styles.sCar, backgroundColor: sCarColor}}
        onPress={sCar}>
        <Text style={styles.buttonText}>Carrito de compra c:</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row', // Para alinear la imagen y el texto horizontalmente
    alignItems: 'center', // Para centrar verticalmente la imagen y el texto
    borderRadius: 10, // Radio de las esquinas redondeadas
    borderWidth: 1, // Ancho del borde
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 20,
    textShadowOffset: {width: 1, height: 1}, // Desplazamiento del borde
    textShadowRadius: 1, // Radio del borde
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 25, // Opcional: para imágenes redondeadas
    borderWidth: 1, // Ancho del borde
    borderColor: 'rgba(0, 0, 0, 0.5)',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText: {
    color: 'black',
  },
});