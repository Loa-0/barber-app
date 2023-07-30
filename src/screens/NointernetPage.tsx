import React, {useContext, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {AgendaContext} from '../hooks/useCalendar';
import Icon from 'react-native-vector-icons/Ionicons';

export const NointernetPage = () => {
  const backgroundImage = require('../assets/main.png');
  const {loadAgenda} = useContext(AgendaContext);
  const {
    themeState: {colors, dividerColor},
  } = useContext(ThemeContext);
  const [refreshing, setrefreshing] = useState<boolean>(false);

  const onRefresh = () => {
    setrefreshing(true);
    setTimeout(async () => {
      await loadAgenda(
        {dateString: '', day: 0, month: 0, timestamp: 0, year: 0},
        true,
      );
      setrefreshing(false);
    }, 1000);
  };
  return (
    <View style={styles.mContainer}>
      <ScrollView
        style={{
          ...styles.Gcontainer,
          backgroundColor: colors.background,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={10}
            progressBackgroundColor={dividerColor}
            colors={[colors.background]}
          />
        }>
        <View style={{...styles.container, borderBottomColor: colors.text}}>
          <Icon name="md-warning-outline" size={80} />
          <Text style={{color: colors.text, ...styles.text}}>
            La aplicación no podido conectarse internet
          </Text>
          <Text style={{color: colors.text, ...styles.text}}>
            Revisa tu conexión o intenta más tarde
          </Text>
          <Image source={backgroundImage} style={styles.backgroundImage} />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  Gcontainer: {
    flex: 1,
  },
  mContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    marginTop: '45%',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderWidth: 3,
    padding: 3,
    borderRadius: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  backgroundImage: {
    width: 250,
    height: 150,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginTop: 10,
    shadowRadius: 4.65,
  },
});
