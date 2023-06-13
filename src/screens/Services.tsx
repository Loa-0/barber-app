import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {HeaderComponent} from '../components/HeaderComponent';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Corte de cabello caballero',
    image: {
      uri: 'https://content.latest-hairstyles.com/wp-content/uploads/casual-slick-back-mens-haircut-with-fade.jpg',
    },
    price: 250,
    duration: 1,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Corte de caballero niño',
    image: {
      uri: 'https://www.todofamilias.com/wp-content/uploads/2023/04/corte-degradado3.jpg',
    },
    price: 200,
    duration: 1,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Arreglo de barba',
    image: {
      uri: 'https://menshairstyletips.com/wp-content/uploads/High-and-Tight-Haircut.jpg?ezimgfmt=rs:372x462/rscb1/ngcb1/notWebP',
    },
    price: 100,
    duration: 1,
  },
  {
    id: '4bf6ad91-897f-4f7c-9c31-610ef1e0ae4f',
    title: 'Corte y barba',
    image: {
      uri: 'https://image.winudf.com/v2/image1/Y29ydGViYXJiYS5kaXNlbm9zYmFyYmFzLm1vZGVsb3NiYXJiYXJfc2NyZWVuXzBfMTU1NjA2MzkzN18wMTQ/screen-0.webp?fakeurl=1&type=.webp',
    },
    price: 100,
    duration: 1,
  },
  {
    id: 'c867a1f2-aeae-47dc-9f48-41cfa1a01a61',
    title: 'Diseño de ceja ',
    image: {
      uri: 'https://i0.wp.com/thehappening.com/wp-content/uploads/2017/05/cejas-hombre-4.jpg?resize=1024%2C694&ssl=1',
    },
    price: 100,
    duration: 1,
  },
  {
    id: 'd58255b8-22c1-431d-bd59-026ff5e3d051',
    title: 'Lavado extra de cabello',
    image: {
      uri: 'https://bettinagullon.com/wp-content/uploads/2021/07/cuidados-del-cabello-del-hombre.jpeg',
    },
    price: 100,
    duration: 1,
  },
  {
    id: 'd58255b8-22c1-431d-bd59-026ff5e3d072',
    title: 'Limpieza de contornos',
    image: {
      uri: 'https://i.ytimg.com/vi/LulfJqDEG8U/maxresdefault.jpg',
    },
    price: 100,
    duration: 1,
  },
  {
    id: 'd58255b8-22c1-431d-bd59-026ff5e3d088',
    title: 'Manicure',
    image: {
      uri: 'https://media.istockphoto.com/id/93068923/photo/masculine-manicure.jpg?s=612x612&w=0&k=20&c=7pXFz443coA3Hmor6Vh129kcR_XtmwB-KilAgWJI_zM=',
    },
    price: 100,
    duration: 1,
  },
];

type ItemProps = { 
  title: string; 
  image: any; 
  price: number;
  duration: number};

const Item = ({ title, image, price, duration }: ItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(true);
  };
  
  const handleReservationPress = () => {
    console.log("Reserva de: " + title + " Duracion: " + duration + " precio:"+ price );
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleImagePress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>${price}</Text>
       <TouchableOpacity style={styles.button} onPress={handleReservationPress}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        statusBarTranslucent={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>El tiempo de este servicio es de {duration} hora</Text>
            <Text style={styles.modalText}>el precio es de ${price}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};



export const ServicesScreen  = () => {
  return (
    <View style={S.globalContainer}>
      <ImageBackground
        source={{
          uri: 'https://thumbs.dreamstime.com/b/barbershop-logo-barber-shop-icon-dark-background-white-barbershop-logo-barber-shop-icon-dark-background-132559455.jpg',
        }}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        ListHeaderComponent={<HeaderComponent title="Servicios" />}
        renderItem={({ item }) => 
          <Item 
            title={item.title} 
            image={item.image} 
            price={item.price} 
            duration={item.duration} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
      </ImageBackground>
    </View>
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
    backgroundColor: 'rgba(255,255, 255, 0.2)',
    borderRadius: 10, // Radio de las esquinas redondeadas
    borderWidth: 1, // Ancho del borde
    borderColor: 'rgba(255, 255, 255, 1)',
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
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  price: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24, // Ajusta el valor según sea necesario
    alignItems: 'center',
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
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    marginLeft: 10,
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