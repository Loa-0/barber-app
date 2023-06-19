import React, {useContext, useState} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {styles as S, globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from './editStyles';
import {EditModal} from './editModal';
import {InfoModal} from './infoModal';

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
  duration: number;
};

const Item = ({title, image, price, duration}: ItemProps) => {
  const {
    themeState: {colors, transparentBackground, secondaryButton},
  } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const handleImagePress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <TouchableOpacity
      style={{...styles.item, backgroundColor: transparentBackground}}
      onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleImagePress}>
        <Text
          style={{
            ...styles.title,
            color: colors.text,
            textShadowColor: colors.background,
          }}>
          {title}
        </Text>
        <Text style={{...styles.price, color: colors.text}}>${price}</Text>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: secondaryButton,
            borderColor: colors.border,
          }}
          onPress={toggleEditModal}>
          <Text style={{...styles.buttonText}}>
            <FontAwesome5
              name="edit"
              color={'black'}
              size={globalColors.iconSize}
            />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <EditModal
        title={title}
        image={image}
        price={price}
        duration={duration}
        visible={editModalVisible}
        onClose={toggleEditModal}
      />
      <InfoModal
        price={price}
        duration={duration}
        visible={modalVisible}
        onClose={handleImagePress}
      />
    </TouchableOpacity>
  );
};

export const EditServicesView = () => {
  const {
    themeState: {colors, primaryButton, highlightColor},
  } = useContext(ThemeContext);
  return (
    <View style={{...S.globalContainer}}>
      <TouchableOpacity
        style={{
          ...styles.newButton,
          backgroundColor: primaryButton,
          borderColor: highlightColor,
        }}>
        <Text style={{...styles.newButtonText, color: colors.text}}>Nuevo</Text>
      </TouchableOpacity>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <Item
            title={item.title}
            image={item.image}
            price={item.price}
            duration={item.duration}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
