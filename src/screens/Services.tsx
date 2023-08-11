import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {HeaderComponent} from '../components/HeaderComponent';
import {ThemeContext} from '../context/ThemeContext';

import {serviceInfoType} from '../components/services/types';
import {ServiceContext} from '../context/Service.Context';
import {ServiceListContext} from '../context/ServicesListContext';
import {ServiceItem} from '../components/services/client/ServiceItem';

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
          <ServiceItem
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
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
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
