import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component'

import Carousel from '../components/common/Carousel'
import Header from '../components/itemDetailScreen/header'
import StarRating from '../components/common/StarRating'
import ColorCircle from '../components/common/ColorCircle'
import Comment from '../components/common/Comment'

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
    name: 'Silver',
    displayName: "Bạc",
    colorCode: "#000000",
  },
  {
    name: 'Yellow',
    displayName: "Vàng",
    colorCode: "#fccc1e",
  },
  {
    name: 'Grey',
    displayName: "Xám",
    colorCode: "#b3b3b3",
  }
]

const comments = [
  {
    id: '1',
    avatar: 'https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    username: "trang trinh",
    star: 4,
    create_date: '28/03/2020',
    content: 'Giao hàng nhanh, sản phẩm chính hãng và có bảo hành nên rất yên tâm, shop tư vấn rất nhiệt tình, ',
    images: [
      'https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/2047904/pexels-photo-2047904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ]
  },

  {
    id: '2',
    avatar: 'https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    username: "Phạm Tuấn Nghĩa",
    star: 4,
    create_date: '28/03/2020',
    content: 'Giao hàng nhanh, sản phẩm chính hãng và có bảo hành nên rất yên tâm, shop tư vấn rất nhiệt tình, ',
    images: [
      'https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/2047904/pexels-photo-2047904.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ]
  },

  {
    id: '3',
    avatar: 'https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    username: "Nguyễn Hữu Hùng",
    star: 4,
    create_date: '28/03/2020',
    content: 'Giao hàng nhanh, sản phẩm chính hãng và có bảo hành nên rất yên tâm, shop tư vấn rất nhiệt tình, ',
    images: [
      'https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      'https://images.pexels.com/photos/1113804/pexels-photo-1113804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    ]
  }
]

const configurationsMap = [
  {
    value: 'RAM',
    label: 'RAM'
  },
  {
    value: 'CPU',
    label: 'CPU'
  }, {
    value: 'SSD',
    label: 'SSD'
  }
  , {
    value: 'HDD',
    label: 'HDD'
  },
  {
    value: 'GPU',
    label: 'GPU'
  }
]

const configurations = {
  CPU: "Core i7",
  GPU: "AMD 455 2GB",
  RAM: "16GB",
  SSD: "512GB",
}
const keyOfConfigurations = Object.keys(configurations)
const _configurations = configurations as any

const getLabel = (key: any) => {
  const result = configurationsMap.filter((item: any) => (key === item.value))
  return result[0].label
}

const dataForConfigurationsTable = () => {
  const table = keyOfConfigurations.map((key) => ([_configurations[key]]))
  return table
}

const windowWidth = Dimensions.get('window').width;

export default function ItemDetailScreen({ navigation }: any) {
  const [productDetail, setProductDetail] = useState<any>()

  const [tableTitle, setTableTitle] = useState(keyOfConfigurations)
  const [tableData, setTableData] = useState(dataForConfigurationsTable())

  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const data = await ProductApi.getProductDetails(102870779)
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
      productDetail && <View style={styles.wrapper}>
        <Text numberOfLines={1} style={{ fontSize: 15, color: "gray" }}>{productDetail!.title}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.price} >{_fomatNumber1(productDetail.price)}</Text>
            <Text style={styles.priceSale} >{_fomatNumber(productDetail.discount_price)}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <StarRating num={4.5} fontSize={18} />
            <Text style={{ ...styles.textSmall, marginLeft: 5 }}>{`(${_fomatNumber(12354)})`}</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 12, color: "#d53332", marginRight: 7 }}>Tiết kiệm {_fomatNumber1(productDetail.price - productDetail.discount_price)}</Text>
            <Text style={styles.dealDiscount}>-{Math.round(productDetail.discount_price / productDetail.price)}%</Text>
          </View>


          <Text style={styles.textSmall}>Đã bán {_fomatNumber(productDetail.price)}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: 'bold' }}>Màu sắc</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 5, width: '60%' }}>
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




  const _renderConfigurations = () => {
    return (
      <View style={{ ...styles.wrapper, marginTop: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', marginBottom: 10 }}>Cấu hình</Text>
        <Table borderStyle={{ borderWidth: 1 }}>
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Col data={tableTitle} heightArr={[32, 32]} textStyle={styles.tableTitle} />
            <Rows data={tableData} flexArr={[2]} style={{ height: 32 }} textStyle={styles.dataTitle} />
          </TableWrapper>
        </Table>
      </View>
    )
  }

  const _renderDescription = () => {
    return (
      productDetail &&
      <View style={{ ...styles.wrapper, marginTop: 10 }}>
        <Text style={styles.title}>Giới thiệu</Text>
        <Text style={{ fontSize: 15, marginTop: 5, textAlign: 'justify', lineHeight: 22 }}>{productDetail.description}</Text>

      </View>
    )
  }

  const _renderComment = () => {
    return (
      productDetail &&
      <View style={{ ...styles.wrapper, marginTop: 10 }}>
        <Text style={styles.title}>Đánh giá </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomColor: '#DDDDDD', borderBottomWidth: 0.5, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <StarRating num={4.5} fontSize={20} />
            <Text style={{ color: 'gray', fontSize: 12, marginLeft: 5 }}>4.9/5</Text>
          </View>
          <Text style={styles.textSmall}>{`(1.9k đánh giá)`}</Text>
        </View>

        <View>
          {
            comments.map((item: any) => {
              return (
                <Comment item={item}/>
              )
            })
          }
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={navigation.navigate('')}>
            <Text style={{paddingHorizontal: 10, paddingVertical: 5, borderColor: 'black', borderWidth: 1}}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Header />
      <Carousel list={cards} width={windowWidth} height={250} />
      {_renderTitle()}
      {_renderConfigurations()}
      {_renderDescription()}
      {_renderComment()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: "#d53332",
    marginRight: 6
  },
  priceSale: {
    fontSize: 11,
    color: 'gray',
    textDecorationLine: "line-through"
  },
  dealDiscount: {
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: "#fbc217",
  },
  dataTitle: {
    paddingLeft: 10
  },
  tableTitle: {
    paddingLeft: 10
  },
  textSmall: {
    color: 'gray',
    fontSize: 12
  }
});

// const configurations = {
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
//   description: "fukhighoier",
//   configurations: {
//     screen: 13.3,
//     RAM: "16",
//     SSD: "512",
//     GPU: "AMD 455 2GB",
//     status: "U",
//   }
// }
