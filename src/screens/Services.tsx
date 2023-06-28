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
import {HeaderComponent} from '../components/HeaderComponent';
import { ThemeContext } from '../context/ThemeContext';
import { InfoModal } from '../components/services/infoModal';
import {serviceInfoType} from '../components/services/types';
import {getServicesList} from '../api/http';
import { ServiceContext } from '../context/Service.Context';

type ItemProps = { 
  id: string;
  title: string; 
  image: any; 
  price: number;
  duration: number;
  setServices: any;
};

const Item = ({id, title, image, price, duration, setServices, }: ItemProps) => {
  const {themeState:{colors, servWhite}} = useContext(ThemeContext)
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(!modalVisible);
  };
  
  const handleReservationPress = () => {
    //console.log("Reserva de: " + title + " Duracion: " + duration + " precio:"+ price );
    setServices( (prev:any) => 
    [...prev,{ id, title, image, price, duration }]
  )
  //setModalVisible(!modalVisible);
  };
  
  return (

    <TouchableOpacity style={{...styles.item,backgroundColor: servWhite, borderColor:colors.border}} onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleImagePress}>
        <Text style={{...styles.title,color:colors.text,textShadowColor:colors.background}}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
       <TouchableOpacity style={styles.button} onPress={handleReservationPress}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <InfoModal
        price={price}
        duration={duration}
        visible={modalVisible}
        onClose={handleImagePress}
        onAdd = {handleReservationPress}
      />
    </TouchableOpacity>  
  );
};


export const ServicesScreen  = () => {
 const {themeState:{colors, servWhite, sCarColor}} = useContext(ThemeContext);
 const {updateTotalCost} = useContext(ServiceContext);
 
 const [servicesArray, setServicesArray ] = useState<serviceInfoType[]>([]);
 
 
 const sCar = () => {
    if (servicesArray.length>0){
      updateTotalCost({services: servicesArray,
        start: "a",
        totalCost:0,
        totalDuration:0,
        end: "aa",
        nameEvent: "aa",
        description: "aa",
        clientName: "aa",
        email: "aa",
      })
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
        <SafeAreaView style={{...styles.container,backgroundColor: colors.background}}>
       
        <FlatList
          data={servicesList}
          ListHeaderComponent={<HeaderComponent title="Servicios" />}
          renderItem={({ item }) => 
            <Item 
              id={item.id!.toString()}
              title={item.title} 
              image={item.image} 
              price={item.price} 
              duration={item.duration}
              setServices={setServicesArray} />}
        />
          <TouchableOpacity style={{...styles.sCar,backgroundColor: sCarColor}} onPress={sCar}>
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
    marginTop:-50,
    //backgroundColor: 'rgba(260, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});