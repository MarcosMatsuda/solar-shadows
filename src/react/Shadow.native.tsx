import React, { useEffect, useState, useMemo } from 'react';
import { View, ViewStyle, Platform } from 'react-native';
import {
  calculateSunShadow,
  ShadowProperties,
} from '../core/sunLogic';

export interface ShadowProps {
  latitude: number;
  longitude: number;
  children: React.ReactElement;
  updateInterval?: number;
  maxOffset?: number;
  maxBlur?: number;
  minOpacity?: number;
  maxOpacity?: number;
  shadowColor?: string;
  style?: ViewStyle;
}

export const Shadow = ({
  latitude,
  longitude,
  children,
  updateInterval = 60000,
  maxOffset = 50,
  maxBlur = 30,
  minOpacity = 0.1,
  maxOpacity = 0.8,
  shadowColor = '#000000',
  style,
}: ShadowProps) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    if (updateInterval <= 0) return;

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval]);

  const shadowProperties = useMemo(
    () =>
      calculateSunShadow(
        {
          latitude,
          longitude,
          date: currentDate,
        },
        {
          maxOffset,
          maxBlur,
          minOpacity,
          maxOpacity,
        }
      ),
    [latitude, longitude, currentDate, maxOffset, maxBlur, minOpacity, maxOpacity]
  );

  const shadowStyle = useMemo(
    () => createNativeShadow(shadowProperties, shadowColor),
    [shadowProperties, shadowColor]
  );

  return (
    <View style={[shadowStyle, style]}>
      {children}
    </View>
  );
};

function createNativeShadow(
  shadow: ShadowProperties,
  color: string
): ViewStyle {
  const { offsetX, offsetY, blur, opacity } = shadow;

  if (opacity === 0) {
    return {};
  }

  const baseStyle: ViewStyle = {
    shadowColor: color,
    shadowOffset: {
      width: offsetX,
      height: offsetY,
    },
    shadowOpacity: opacity,
    shadowRadius: blur / 2,
  };

  if (Platform.OS === 'android') {
    const elevationValue = Math.max(1, Math.round(blur / 2));
    return {
      ...baseStyle,
      elevation: elevationValue,
    };
  }

  return baseStyle;
}
