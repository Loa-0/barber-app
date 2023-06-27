import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';
import {serviceInfoType} from '../components/services/types';
import {getServicesList} from '../api/http';

type ItemProps = {title: string; image: any};

const Item = ({title, image}: ItemProps) => (
  <View style={styles.item}>
    <Image source={image} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reservar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export const Services = () => {
  const {
    themeState: {colors, titleText},
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
  return (
    <View style={S.globalContainer}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: colors.background}}>
        <FlatList
          data={servicesList}
          renderItem={({item}) => (
            <Item title={item.title} image={item.image} />
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={<HeaderComponent title="Servicios" />}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
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
    fontSize: 22,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,0.985)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: 'rgba(255,255,255,0.985)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor: 'rgb(218,165,32)', 
    borderWidth: 2, // Agregado para el borde negro
  },
  buttonClose: {
    backgroundColor: 'rgb(130,130,130)',
    borderColor: 'black',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  reservationBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
  },
  reservationText: {
    color: 'white',
    fontSize: 16,
  },
});