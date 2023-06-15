import React, {useContext} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {styles as S, globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from './editStyles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'FADE',
    image: {
      uri: 'https://content.latest-hairstyles.com/wp-content/uploads/casual-slick-back-mens-haircut-with-fade.jpg',
    },
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'BUZZ',
    image: {
      uri: 'https://chopshoptrenton.ca/wp-content/uploads/2021/09/Buzz-Cut-Men.png',
    },
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'MILITAR',
    image: {
      uri: 'https://menshairstyletips.com/wp-content/uploads/High-and-Tight-Haircut.jpg?ezimgfmt=rs:372x462/rscb1/ngcb1/notWebP',
    },
  },
  {
    id: '4bf6ad91-897f-4f7c-9c31-610ef1e0ae4f',
    title: 'CORTE DE BARBA',
    image: {
      uri: 'https://image.winudf.com/v2/image1/Y29ydGViYXJiYS5kaXNlbm9zYmFyYmFzLm1vZGVsb3NiYXJiYXJfc2NyZWVuXzBfMTU1NjA2MzkzN18wMTQ/screen-0.webp?fakeurl=1&type=.webp',
    },
  },
  {
    id: 'c867a1f2-aeae-47dc-9f48-41cfa1a01a61',
    title: 'CORTE DE CEJA',
    image: {
      uri: 'https://i0.wp.com/thehappening.com/wp-content/uploads/2017/05/cejas-hombre-4.jpg?resize=1024%2C694&ssl=1',
    },
  },
  {
    id: 'd58255b8-22c1-431d-bd59-026ff5e3d051',
    title: 'TEÑIR EL CABELLO',
    image: {
      uri: 'https://i.pinimg.com/originals/66/d2/2a/66d22aa25b99a3ac4e5354cc3cec6d3e.jpg',
    },
  },
];

type ItemProps = {title: string; image: any};

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
          <Text style={{...styles.buttonText}}>
            <FontAwesome5
              name="edit"
              color={'black'}
              size={globalColors.iconSize}
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const EditServicesView = () => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <View style={S.globalContainer}>
      <SafeAreaView
        style={{...styles.container, backgroundColor: colors.background}}>
        <FlatList
          data={DATA}
          renderItem={({item}) => (
            <Item title={item.title} image={item.image} />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};
