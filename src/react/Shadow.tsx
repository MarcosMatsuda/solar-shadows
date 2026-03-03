import React, { useEffect, useState, useMemo, CSSProperties } from 'react';
import {
  calculateSunShadow,
  ShadowProperties,
} from '../core/sunLogic';

export interface ShadowProps {
  latitude: number;
  longitude: number;
  children: React.ReactElement;
  date?: Date;
  updateInterval?: number;
  maxOffset?: number;
  maxBlur?: number;
  minOpacity?: number;
  maxOpacity?: number;
  shadowColor?: string;
  asWrapper?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Shadow = ({
  latitude,
  longitude,
  children,
  date,
  updateInterval = 60000,
  maxOffset = 50,
  maxBlur = 30,
  minOpacity = 0.1,
  maxOpacity = 0.8,
  shadowColor = 'rgba(0, 0, 0, 1)',
  asWrapper = false,
  className,
  style,
}: ShadowProps) => {
  const [currentDate, setCurrentDate] = useState(() => new Date());

  useEffect(() => {
    if (updateInterval <= 0 || date) return; // Don't auto-update if date is provided

    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, date]);

  // Use external date if provided, otherwise use internal currentDate
  const effectiveDate = date || currentDate;

  const shadowProperties = useMemo(
    () =>
      calculateSunShadow(
        {
          latitude,
          longitude,
          date: effectiveDate,
        },
        {
          maxOffset,
          maxBlur,
          minOpacity,
          maxOpacity,
        }
      ),
    [latitude, longitude, effectiveDate, maxOffset, maxBlur, minOpacity, maxOpacity]
  );

  const boxShadow = useMemo(
    () => createBoxShadow(shadowProperties, shadowColor),
    [shadowProperties, shadowColor]
  );

  if (asWrapper) {
    return (
      <div
        className={className}
        style={{
          ...style,
          boxShadow,
        }}
      >
        {children}
      </div>
    );
  }

  return React.cloneElement(children, {
    style: {
      ...children.props.style,
      boxShadow,
    },
  });
};

function createBoxShadow(
  shadow: ShadowProperties,
  color: string
): string {
  const { offsetX, offsetY, blur, opacity } = shadow;

  if (opacity === 0) {
    return 'none';
  }

  const colorWithOpacity = color.replace(
    /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/,
    `rgba($1, $2, $3, ${opacity})`
  );

  return `${offsetX}px ${offsetY}px ${blur}px ${colorWithOpacity}`;
}
