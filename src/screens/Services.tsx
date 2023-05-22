import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'FADE',
    image: { uri: 'https://content.latest-hairstyles.com/wp-content/uploads/casual-slick-back-mens-haircut-with-fade.jpg' },
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BUZZ',
    image: { uri: 'https://chopshoptrenton.ca/wp-content/uploads/2021/09/Buzz-Cut-Men.png' },
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'MILITAR',
    image: { uri: 'https://menshairstyletips.com/wp-content/uploads/High-and-Tight-Haircut.jpg?ezimgfmt=rs:372x462/rscb1/ngcb1/notWebP' },
  },
  {
    id: '4bf6ad91-897f-4f7c-9c31-610ef1e0ae4f',
    title: 'CORTE DE BARBA',
    image: { uri: 'https://image.winudf.com/v2/image1/Y29ydGViYXJiYS5kaXNlbm9zYmFyYmFzLm1vZGVsb3NiYXJiYXJfc2NyZWVuXzBfMTU1NjA2MzkzN18wMTQ/screen-0.webp?fakeurl=1&type=.webp' },
  },
  {
    id: 'c867a1f2-aeae-47dc-9f48-41cfa1a01a61',
    title: 'CORTE DE CEJA',
    image: { uri: 'https://i0.wp.com/thehappening.com/wp-content/uploads/2017/05/cejas-hombre-4.jpg?resize=1024%2C694&ssl=1' },
  },
  {
    id: 'd58255b8-22c1-431d-bd59-026ff5e3d051',
    title: 'TEÑIR EL CABELLO',
    image: { uri: 'https://i.pinimg.com/originals/66/d2/2a/66d22aa25b99a3ac4e5354cc3cec6d3e.jpg' },
  },
];

type ItemProps = { title: string, image: any };

const Item = ({ title, image }: ItemProps) => (
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
  return (
    <ImageBackground
      source={{ uri: 'https://thumbs.dreamstime.com/b/barbershop-logo-barber-shop-icon-dark-background-white-barbershop-logo-barber-shop-icon-dark-background-132559455.jpg' }} // URL de la imagen de fondo
      style={styles.container}
    >
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} image={item.image} />}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </ImageBackground>
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
    fontSize: 22,
    color: 'white', // Color de las letras
    textShadowColor: 'black', // Color del borde
    textShadowOffset: { width: 1, height: 1 }, // Desplazamiento del borde
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
    backgroundColor: 'white',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'black',
  },
});
