import React, { useContext } from 'react';
import {StyleSheet, ScrollView, Linking} from 'react-native';
import { styles as S } from '../theme/AppStyles';
import { ThemeContext } from '../context/ThemeContext';
import { DisplayInfoDashboard } from '../components/dashboard/DisplayInfoDashboard';
import { SocialMedia } from '../components/dashboard/SocialMedia';
import { MapsImage } from '../components/dashboard/MapsImage';

export const Dashboard = ({ navigation }: any) => {
  const {
    themeState: { colors },
  } = useContext(ThemeContext);
  const handleWebsitePress = () => {
    Linking.openURL('https://ulisesbarber.negocio.site');
  };

  const handleFacebookPress = () => {
    Linking.openURL('https://es-la.facebook.com/UBPeluqueriaYBarberia/');
  };

  const handleInstagramPress = () => {
    Linking.openURL(
      'https://www.instagram.com/ulisesvelru/?igshid=MzRlODBiNWFlZA%3D%3D',
    );
  };

  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <DisplayInfoDashboard navigation={navigation} />
      <SocialMedia />
      <MapsImage />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    marginVertical: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundColor: {
    flex: 1,
    backgroundColor: '#000000',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)', // Rectángulo transparente (30% de opacidad)
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  text: {
    color: '#333333',
    marginTop: 19,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
