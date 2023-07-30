import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';
import {InfoModal} from '../components/services/infoModal';
import {ModalPic} from '../components/services/modalPic';
import {serviceInfoType} from '../components/services/types';
import {ServiceContext} from '../context/Service.Context';
import {View} from 'react-native';
import {ServiceListContext} from '../context/ServicesListContext';
const limitHorsSerivce = 2;
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
  const [modalPic, setModalPic] = useState(false);
  const [wordReserved, setwordReserved] = useState<string>('Reservar');

  useEffect(() => {
    if (selectSer.length === 0) {
      setwordReserved('Reservar');
    }
  }, [selectSer]);

  const handleImagePress = () => {
    setModalVisible(!modalVisible);
  };
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
      if (newSum <= limitHorsSerivce) {
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
  const addToCar = (i: serviceInfoType) => {
    setModalVisible(!modalVisible);
    handleReservationPress(i);
  };

  return (
    <TouchableOpacity
      style={{
        ...styles.item,
        backgroundColor: servWhite,
        borderColor: colors.border,
        shadowColor:colors.border,
      }}
      onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePic}> 
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
        onAdd={() => {
          addToCar(item);
        }}
        wordReserved={wordReserved}
        fromAdmin={false}
      />
      <ModalPic
      imagen={item.image}
        visible={modalPic}
        onClose={handleImagePic}
      />
    </TouchableOpacity>
  );
};

export const ServicesScreen = ({navigation}: any) => {
  const {
    themeState: {colors, sCarColor, dividerColor},
  } = useContext(ThemeContext);
  const {updateTotalCost} = useContext(ServiceContext);
  const {servicesList, setNewStatus} = useContext(ServiceListContext);
  const [refreshing, setrefreshing] = useState<boolean>(false);
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(async () => {
      await setNewStatus('updating');
      setrefreshing(false);
    }, 1000);
  };

  const [processedServicesList, setProcessedServicesList] = useState<
    serviceInfoType[]
  >(servicesList ?? []);
  const [servicesArray, setServicesArray] = useState<serviceInfoType[]>([]);

  const sCar = () => {
    if (servicesArray.length > 0) {
      updateTotalCost({
        services: servicesArray,
      });
      setServicesArray([]);
      navigation.navigate('Appoinments');
    }
  };

  useEffect(() => {
    const services = servicesList.map(s => {
      return {...s, resvBool: false};
    });
    setProcessedServicesList(services);
  }, [servicesList]);

  return (
    <SafeAreaView
      style={{...styles.container, backgroundColor: colors.background}}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={10}
            progressBackgroundColor={dividerColor}
            colors={[colors.background]}
          />
        }
        data={processedServicesList}
        ListHeaderComponent={<HeaderComponent title="Servicios" />}
        ListFooterComponent={<View style={styles.marginB} />}
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
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
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
  marginB: {
    marginBottom: 70,
  },
});
