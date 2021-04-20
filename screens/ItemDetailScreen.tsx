import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, Text } from 'react-native';

import Carousel from '../components/common/Carousel'
import Header from '../components/itemDetailScreen/header'
import StarRating from '../components/common/StarRating'
import ColorCircle from '../components/common/ColorCircle'

import ProductApi from '../api/ProductApi'

const cards = [
  {
    imgUrl: 'https://images.pexels.com/photos/3236733/pexels-photo-3236733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    imgUrl: 'https://images.pexels.com/photos/6553054/pexels-photo-6553054.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    imgUrl: 'https://images.pexels.com/photos/5845336/pexels-photo-5845336.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  },
  {
    imgUrl: 'https://images.pexels.com/photos/5651673/pexels-photo-5651673.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  }
]

const colorMap = [
  {
    name: "white",
    displayName: "Trắng",
    colorCode: "#FFFFFF",
  },
  {
    name: 'black',
    displayName: "Đen",
    colorCode: "#000000",
  },
  {
    name: 'gold',
    displayName: "Vàng",
    colorCode: "#fccc1e",
  },
  {
    name: 'gray',
    displayName: "Xám",
    colorCode: "#b3b3b3",
  }
]
const windowWidth = Dimensions.get('window').width;

export default function ItemDetailScreen() {
  const [productDetail, setProductDetail] = useState<any>()

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {

        console.log("fetch data")
        const data = await ProductApi.getProductDetails(102870779)
        console.log(data)
        setProductDetail(data as any)
      } catch (error) {
        console.log("Failed to fetch flashsale product in item detail screen" + error)
      }
    }

    fetchDetailProduct()
  }, [])

  const _fomatNumber = (num: number) => {
    const formatter = new Intl.NumberFormat('en', {
      notation: 'compact'
    })

    return formatter.format(num)
  }

  const _fomatNumber1 = (num: number) => {
    const formatter = new Intl.NumberFormat('us')
    return formatter.format(num)
  }

  const _renderTitle = () => {
    return (
      productDetail && <View style={{ paddingTop: 15, paddingHorizontal: 10 }}>
        <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 15 }}>{productDetail!.title}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.price} >{_fomatNumber1(productDetail.price)}</Text>
            <Text style={styles.priceSale} >{_fomatNumber(productDetail.discount_price)}</Text>
          </View>
          <View>
            <StarRating num={parseFloat(productDetail.rating_average)} />
            <Text>{`(${_fomatNumber(12354)})`}</Text>
          </View>
        </View>

        <View>
          <View>
            <Text style={{ fontSize: 12, color: "#d53332" }}>Tiết kiệm {_fomatNumber1(productDetail.price - productDetail.discount_price)}</Text>
            <Text style={styles.dealDiscount}>-{Math.round(productDetail.discount_price / productDetail.price)}%</Text>
          </View>


          <Text style={{ fontSize: 9 }}>Đã bán {_fomatNumber(productDetail.price)}</Text>
        </View>

        <View>
          <Text>Màu sắc</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {
              colorMap.map((item, index) => (
                <ColorCircle key={index} item={item} />
              ))
            }
          </View>
        </View>


      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Carousel list={cards} width={windowWidth} height={250} />
      {_renderTitle()}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  priceSale: {
    fontSize: 12,
    color: "#d53332",
    textDecorationLine: "line-through"
  },
  dealDiscount: {
    paddingHorizontal: 2,
    paddingVertical: 3,
    backgroundColor: "#fbc217",
  }
});

// const ubufk = {
//   title: "frg",
//   images: [
//     "furghoti",
//     "grughrig",
//     "ufrirehg"
//   ],
//   price: 23454,
//   discount_price: 14324,
//   rating_average: 4.5,
//   rating_total: 214,
//   sold: 2344,
//   colors: ["white", "gray"],
//   address: "Cầu Giấy, Hà Nội",
//   description: "fomat cái này thì t theo m",
//   configurations: {
//     screen: 13.3,
//     RAM: "16",
//     SSD: "512",
//     GPU: "AMD 455 2GB",
//     status: "U"
//   }
// }
