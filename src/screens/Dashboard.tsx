import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import {styles as S} from '../theme/AppStyles';
import {ThemeContext} from '../context/ThemeContext';
import {DisplayInfoDashboard} from '../components/dashboard/DisplayInfoDashboard';
import {SocialMedia} from '../components/dashboard/SocialMedia';
import {MapsImage} from '../components/dashboard/MapsImage';
import {FAQ} from '../components/dashboard/FAQ';

export const Dashboard = ({navigation}: any) => {
  const {
    themeState: {colors},
  } = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        ...S.globalContainer,
        backgroundColor: colors.background,
      }}>
      <DisplayInfoDashboard navigation={navigation} />
      <SocialMedia />
      <MapsImage />
      <FAQ />
    </ScrollView>
  );
};
