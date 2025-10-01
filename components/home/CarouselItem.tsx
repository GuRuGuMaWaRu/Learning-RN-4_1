import { useRef } from 'react';
import { View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';

import Image from '@/components/Image';
import { WIDTH } from '@/core/utils/layout';

type CarouselItemProps = {
  property: Property;
};

const CarouselItem = ({ property }: CarouselItemProps) => {
  const progressValue = useSharedValue<number>(0);
  const carouselRef = useRef<ICarouselInstance>(null);

  const onPressPagination = (index: number) => {
    if (!carouselRef.current) return;

    carouselRef.current?.scrollTo({
      index,
      animated: true,
    });
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        width={WIDTH - 32}
        height={320}
        scrollAnimationDuration={2000}
        overscrollEnabled={false}
        data={property.images}
        renderItem={({ item: imageUri }) => (
          <View className="mx-2">
            <Image source={imageUri} />
          </View>
        )}
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
      />
      <Animated.View className="absolute bottom-4 w-full">
        <Pagination.Basic
          progress={progressValue}
          data={property.images.map((item) => ({ color: item }))}
          size={12}
          activeDotStyle={{
            borderRadius: 100,
            backgroundColor: 'white',
          }}
          dotStyle={{
            borderRadius: 100,
            backgroundColor: 'F3EFE9',
          }}
          containerStyle={{
            paddingVertical: 8,
            gap: 4,
          }}
          onPress={onPressPagination}
        />
      </Animated.View>
    </View>
  );
};

export default CarouselItem;
