import { useState, useEffect, useMemo } from 'react';
import ImageColors, { ImageColorsResult } from 'react-native-image-colors';

import { PRIMARY } from '../theme/colors';

const useImageColors = (imageUrl: string) => {
  const [colors, setColors] = useState<ImageColorsResult>();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        const result = await ImageColors.getColors(imageUrl, {
          fallback: '#000000',
          quality: 'high',
          pixelSpacing: 5,
        });
        setColors(result);
      } catch (error) {
        console.error('Error fetching image colors:', error);
      }
    };

    fetchColors();
  }, [imageUrl]);

  const colorPalette = useMemo(() => {
    if (!colors) {
      return {
        primary: PRIMARY,
        secondary: PRIMARY,
        background: PRIMARY,
      };
    }

    if ('platform' in colors) {
      if (colors.platform === 'ios') {
        return {
          primary: colors.primary,
          secondary: colors.secondary,
          background: colors.background,
        };
      }
      if (colors.platform === 'android') {
        return {
          primary: colors.dominant,
          secondary: colors.dominant,
          background: colors.dominant,
        };
      }
    }
  }, [colors]);

  return { colors: colorPalette };
};

export default useImageColors;
