import { Image, useImage } from '@shopify/react-native-skia';
import Squircle from 'react-native-squircle';

type ImageWithSquircleProps = {
  image: string;
  width?: number;
  height?: number;
  borderRadius?: number;
};

const ImageWithSquircle = ({
  image,
  width = 296,
  height = 280,
  borderRadius = 40,
}: ImageWithSquircleProps) => {
  const imageUrl = useImage(image);
  return (
    <Squircle
      style={{ width, height, marginHorizontal: 4, borderRadius, overflow: 'hidden' }}
      maskChildren={<Image image={imageUrl} width={width} height={height} fit="cover" />}
    />
  );
};

export default ImageWithSquircle;
