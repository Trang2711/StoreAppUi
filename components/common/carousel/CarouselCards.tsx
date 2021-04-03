import React from 'react'
import { View } from "react-native"
import Carousel from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'


const data = [
    {
        title: "Aenean leo",
        body: "Ut tincidunt tincidunt erat",
        imgUrl: "https://picsum.photos/id/11/200/300"
    },
    {
        title: "Aenean leo",
        body: "Ut tincidunt tincidunt erat",
        imgUrl: "https://picsum.photos/id/10/200/300"
    },
    {
        title: "Aenean leo",
        body: "Ut tincidunt tincidunt erat",
        imgUrl: "https://picsum.photos/id/12/200/300"
    }
]

const CarouselCards = () => {
  const isCarousel = React.useRef(null)

  return (
    <View>
      <Carousel
        // layout="default"
        // layoutCardOffset={9}
        // ref={isCarousel}
        data={data}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        // inactiveSlideShift={0}
        useScrollView={true}
      />
    </View>
  )
}


export default CarouselCards