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
import {ThemeContext} from '../context/ThemeContext';
import {InfoModal} from '../components/services/infoModal';
import {serviceInfoType} from '../components/services/types';
import {getServicesList} from '../api/http';
import {ServiceContext} from '../context/Service.Context';

type ItemProps = {
  item: serviceInfoType;
  setServices: any;
  selectSer: serviceInfoType[];
};

const Item = ({item, setServices, selectSer}: ItemProps) => {
  const {
    themeState: {colors, servWhite},
  } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [wordReserved, setwordReserved] = useState<string>('Reservar');

  const handleImagePress = () => {
    setModalVisible(!modalVisible);
  };

  const handleReservationPress = (i: serviceInfoType) => {
    const newA = selectSer.filter(ev => ev.id === i.id);
    if (newA.length > 0) {
      const newD = selectSer.filter(ev => ev.id !== i.id);
      setwordReserved('Reservar');
      setServices(newD);
    } else {
      setwordReserved('Quitar');
      setServices((prev: any) => [...prev, {...i, resvBool: true}]);
    }
  };

  const addToCar = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.item,
        backgroundColor: servWhite,
        borderColor: colors.border,
      }}
      onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={item.image} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleImagePress}>
        <Text
          style={{
            ...styles.title,
            color: colors.text,
            textShadowColor: colors.background,
          }}>
          {item.title}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleReservationPress(item);
          }}>
          <Text style={styles.buttonText}>{wordReserved}</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <InfoModal
        price={item.price}
        duration={item.duration}
        visible={modalVisible}
        onClose={handleImagePress}
        onAdd={addToCar}
      />
    </TouchableOpacity>
  );
};

export const ServicesScreen = () => {
  const {
    themeState: {colors, sCarColor},
  } = useContext(ThemeContext);
  const {updateTotalCost} = useContext(ServiceContext);

  const [servicesArray, setServicesArray] = useState<serviceInfoType[]>([]);
  const [servicesList, setServicesList] = useState<serviceInfoType[]>([]);

  const sCar = () => {
    if (servicesArray.length > 0) {
      updateTotalCost({
        services: servicesArray,
      });
    }
  };

  useEffect(() => {
    console.log('Serv Arr', servicesArray);
  }, [servicesArray]);

  useEffect(() => {
    listServices();
  }, []);

  const listServices = async () => {
    try {
      const services = await getServicesList();
      services.map(s => {
        return {...s, resvBool: false};
      });
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
            selectSer={servicesArray}
            item={item}
            setServices={setServicesArray}
          />
        )}
      />
      <TouchableOpacity
        style={{...styles.sCar, backgroundColor: sCarColor}}
        onPress={sCar}>
        <Text style={styles.buttonText}>Servicios: {servicesArray.length}</Text>
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
  price: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24, // Ajusta el valor según sea necesario
    alignItems: 'center',
  },
  sCar: {
    alignSelf: 'center',
    marginBottom: 5,
    width: 150,
    height: 35,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
