import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import { useTheme } from '@/presentation/context';

import {
  AlignTitleView,
  ContainerImageView,
  ContainerView,
  ContentAds,
  HeaderView,
  ImageView,
  SubTitleView,
  TitleView,
  ToggleThemeView,
} from './style';

interface Props extends React.PropsWithChildren {}

export const TemplateRoot: React.FC<Props> = ({ children }) => {
  const { theme, setTheme } = useTheme();

  const getTheme = (theme: string, light: string, dark: string): string => {
    return theme === 'light' ? light : dark;
  };

  return (
    <SafeAreaView>
      <ContainerView theme={theme}>
        <StatusBar
          animated={true}
          backgroundColor={getTheme(theme, '#f3f2f8', '#292d3e')}
          style={getTheme(theme, 'dark', 'light')}
        />
        <HeaderView>
          <AlignTitleView>
            <SubTitleView theme={theme}>SIMULADOR</SubTitleView>
            <TitleView theme={theme}>FINANCIAMENTO DE VEICULOS</TitleView>
          </AlignTitleView>
          <ToggleThemeView
            onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            <Ionicons
              name={getTheme(theme, 'moon', 'sunny')}
              size={25}
              color={theme === 'light' ? '#292d3e' : '#ffffff'}
            />
          </ToggleThemeView>
        </HeaderView>
        <ContainerImageView>
          <ImageView source={require('../../../assets/background-finan.png')} />
          <ContentAds>
            <BannerAd
              unitId={'ca-app-pub-6202074218659375/6934208855'}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
            />
          </ContentAds>
        </ContainerImageView>
        {children}
      </ContainerView>
    </SafeAreaView>
  );
};
