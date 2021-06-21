import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import ProductApi from '../api/ProductApi'
import { baseUrl } from "../api/AxiosClient";

const data = [
  {
    product: {
      id: "grgre",
      title: "Birddybag indian apache tee",
      product_thumbnail: "https://images.pexels.com/photos/8326316/pexels-photo-8326316.jpeg?cs=srgb&dl=pexels-kindel-media-8326316.jpg&fm=jpg",
      price: 320000,
      discount_price: 250000,
      total_price: 300000,
      count: 1,
      idShop: "fgbigbvui"
    },
    shipping: {
      method: "Giao hàng nhanh",
      date: "T2, 03/05/2021",
      fee: 22000
    },
    shipping_address: {
      name: "Trịnh Thị Thu Trang",
      phone: "0978924372",
      province: "Hưng Yên",
      district: "Văn Lâm",
      ward: "Đại Đồng",
      addressDetail: "thôn Đông Mai"
    },
    payment: "Thanh toán khi nhận hàng"
  }
]

export default function PurchaseDetailsScreen({ productId, navigation }: any) {
  const [shipping, setShipping] = useState<any>()
  const [address, setAddress] = useState<any>()
  const [product, setProduct] = useState<any>()
  const [payment, setPayment] = useState<any>()

  const _fomatNumber1 = (num: number) => {
    const formatter = new Intl.NumberFormat("us");
    return formatter.format(num);
  };

  const fetchData = async () => {
    const data = ProductApi.getPurchaseDetails(productId) as any
    setShipping(data.shipping)
    setProduct(data.product)
    setPayment(data.payment),
    setAddress(data.shipping_address)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderProduct = (productItem: any) => {
    const {
      id,
      title,
      product_thumbnail,
      price,
      discount_price,
      total_price,
      count,
    } = productItem;
    return (
      <View key={id} style={styles.containerOfProduct}>
        <Pressable
        // onPress={() => navigation.navigate("PurchaseDetialsScreen")}
        >
          <View style={styles.content}>
            <ImageBackground
              style={styles.image}
              // source={{ uri: `${baseUrl}${product_thumbnail}` }}
              source={{ uri: `${product_thumbnail}` }}
            ></ImageBackground>

            <View style={styles.content_area}>
              <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: "bold" }}>
                {title}
              </Text>
              <View
                style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
              >
                <Text style={styles.priceSale}>
                  {_fomatNumber1(discount_price)}đ
                    </Text>
                {discount_price < price && (
                  <Text style={styles.price}>{_fomatNumber1(price)}đ</Text>
                )}
              </View>
              <View style={styles.quantity_area}>
                <Text style={{ fontSize: 14, marginRight: 5 }}>Số lượng:</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ paddingHorizontal: 3 }}> {count} </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            <Text>Thành tiền: </Text>
            <Text style={{ color: 'red', fontSize: 16, fontWeight: "bold" }}>{_fomatNumber1(total_price)}đ</Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={{ marginBottom: 10, borderBottomColor: "#DDDDDD", borderBottomWidth: 0.5, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row", paddingBottom: 10 }}>
            <Feather name="truck" size={18} color="black" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.title}>Thông tin vận chuyển</Text>
              <Text style={{ color: "gray" }}>Đơn vị vận chuyển: {shipping.method}</Text>
              <Text style={{ color: "gray" }}>Thời gian giao hàng: {shipping.date}</Text>
              <Text style={{ color: "gray" }}>Phi vận chuyển: {_fomatNumber1(shipping.fee)}đ</Text>
            </View>
          </View>
        </View>

        <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={22} color="black" />
            <View style={{ marginLeft: 10, }}>
              <Text style={styles.title}>Địa chỉ nhận hàng</Text>
              <Text style={{ color: "gray" }}>{address.name}</Text>
              <Text style={{ color: "gray" }}>{address.phone}</Text>
              <Text style={{ color: "gray", marginRight: 10 }}>{`${address.addressDetail}, ${address.ward}, ${address.district}, ${address.province}`}</Text>
            </View>
          </View>
        </View>

      </View>

      {
        renderProduct(data[0])
      }

      <View style={styles.container}>
        <View style={{ paddingHorizontal: 10, paddingBottom: 10, flexDirection: "row", borderBottomColor: "#DDDDDD", borderBottomWidth: 0.5, }}>
          <AntDesign name="pay-circle-o1" size={20} color="black" />
          <View style={{ marginLeft: 10, }}>
            <Text style={styles.title}>Phương thức thanh toán</Text>
            <Text style={{ color: "gray" }}>{payment}</Text>
          </View>
        </View>

        <View style={styles.review}>
          <Text style={{ color: "gray", fontSize: 14, textDecorationLine: "underline" }}>Xem đánh giá</Text>
          <Pressable
            style={styles.repurchaseBtn}
          // onPress={() =>
          //     navigation.navigate("Root", {
          //       screen: "ItemDetailScreen",
          //       params: { id: id },
          //     })
          //   }
          >
            <Text style={{ color: 'white' }}>Nhắn tin với shop</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 7
  },
  containerOfProduct: {
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "white",
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
  },
  image: {
    resizeMode: "cover",
    width: 120,
    height: 100,
    marginRight: 5,
  },
  content_area: {
    flex: 1,
  },
  quantity_area: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },
  price: {
    fontSize: 11,
    color: "gray",
    textDecorationLine: "line-through",
  },
  priceSale: {
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 6,
  },
  details: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  review: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  repurchaseBtn: {
    backgroundColor: 'black',
    paddingHorizontal: 25,
    paddingVertical: 9
  }
});
