import React, {useContext, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  RefreshControl,
} from 'react-native';
import {ThemeContext} from '../../context/ThemeContext';
import {styles as S, globalColors} from '../../theme/AppStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {styles} from './editStyles';
import {InfoModal} from './infoModal';
import {StackScreenProps} from '@react-navigation/stack';
import {serviceInfoType} from './types';
import {deleteService} from '../../api/http';
import {ServiceListContext} from '../../context/ServicesListContext';

type ItemProps = {
  service: serviceInfoType;
  onClickEdit: (service: serviceInfoType) => any;
};

const Item = ({service, onClickEdit}: ItemProps) => {
  const {setNewStatus} = useContext(ServiceListContext);
  const {
    themeState: {colors, transparentBackground, secondaryButton},
  } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleImagePress = () => {
    setModalVisible(!modalVisible);
  };

  const onDelete = async (id: number | string) => {
    try {
      await deleteService(id);
      ToastAndroid.showWithGravityAndOffset(
        'Servicio eliminado',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
      setNewStatus('updating');
    } catch (error) {
      console.log(error);
      ToastAndroid.showWithGravityAndOffset(
        'Error borrando servicio',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        210,
      );
    }
  };
  const showConfirmDialog = (id: number | string) => {
    return Alert.alert('Eliminar', '¿Seguro que quiere eliminar el servicio?', [
      {
        text: 'Eliminar',
        onPress: () => {
          onDelete(id);
        },
      },
      {
        text: 'No eliminar',
      },
    ]);
  };

  return (
    <TouchableOpacity
      style={{...styles.item, backgroundColor: transparentBackground}}
      onPress={handleImagePress}>
      <TouchableOpacity onPress={handleImagePress}>
        <Image source={service.image} style={styles.image} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.content} onPress={handleImagePress}>
        <Text
          style={{
            ...styles.title,
            color: colors.text,
            textShadowColor: colors.background,
          }}>
          {service.title}
        </Text>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: secondaryButton,
            borderColor: colors.border,
          }}
          onPress={() => {
            showConfirmDialog(service.id!);
          }}>
          <Text style={{...styles.buttonText}}>
            <FontAwesome5
              name="trash"
              color={globalColors.disabledRed}
              size={globalColors.iconSize}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.button,
            backgroundColor: secondaryButton,
            borderColor: colors.border,
          }}
          onPress={() => {
            onClickEdit(service);
          }}>
          <Text style={{...styles.buttonText}}>
            <FontAwesome5
              name="edit"
              color={'black'}
              size={globalColors.iconSize}
            />
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <InfoModal
        price={service.price}
        duration={service.duration}
        visible={modalVisible}
        onClose={handleImagePress}
        fromAdmin={true}
      />
    </TouchableOpacity>
  );
};
interface Props extends StackScreenProps<any, any> {}
export const AdminServicesView = ({navigation}: Props) => {
  const {
    themeState: {colors, primaryButton, highlightColor, dividerColor},
  } = useContext(ThemeContext);

  const {servicesList, setNewStatus} = useContext(ServiceListContext);
  const [refreshing, setrefreshing] = useState<boolean>(false);
  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(async () => {
      await setNewStatus('updating');
      setrefreshing(false);
    }, 1000);
  };

  const navigateEditServices = ({
    id,
    title,
    image,
    price,
    duration,
  }: serviceInfoType) => {
    navigation.navigate('AdminServices', {
      screen: 'editService',
      params: {id, title, image, price, duration},
    });
  };
  const navigateNewService = () => {
    navigation.navigate('AdminServices', {
      screen: 'newService',
    });
  };
  return (
    <View style={{...S.globalContainer}}>
      <TouchableOpacity
        style={{
          ...styles.newButton,
          backgroundColor: primaryButton,
          borderColor: highlightColor,
        }}
        onPress={navigateNewService}>
        <Text style={{...styles.newButtonText, color: colors.text}}>Nuevo</Text>
      </TouchableOpacity>
      <FlatList
        data={servicesList}
        renderItem={({item}) => (
          <Item service={item} onClickEdit={navigateEditServices} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={10}
            progressBackgroundColor={dividerColor}
            colors={[colors.background]}
          />
        }
      />
    </View>
  );
};
