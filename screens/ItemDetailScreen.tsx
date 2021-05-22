import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import { LinearGradient } from 'expo-linear-gradient';
import Carousel from "../components/common/Carousel";
import Header from "../components/itemDetailScreen/header";
import StarRating from "../components/common/StarRating";
import ColorCircle from "../components/common/ColorCircle";
import Comment from "../components/common/Comment";
import {
  addingNewProductToCart,
  amountOfItemsInCart,
  productsInsideCart,
} from "../redux/features/cartSlice";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import ProductApi from "../api/ProductApi";
import AddingToCartModal from "../components/itemDetailScreen/addingToCartModal";
import Comments from '../components/itemDetailScreen/Comments'
import "intl";
import "intl/locale-data/jsonp/en";

const cards = [
  {
    imgUrl:
      "https://images.pexels.com/photos/3236733/pexels-photo-3236733.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/6553054/pexels-photo-6553054.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/5845336/pexels-photo-5845336.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
  {
    imgUrl:
      "https://images.pexels.com/photos/5651673/pexels-photo-5651673.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  },
];

const colorMap = [
  {
    value: "Grey",
    label: "Xám",
    colorCode: "#b3b3b3",
  },
  {
    value: "Yellow",
    label: "Vàng",
    colorCode: "#fccc1e",
  },
  {
    value: "Silver",
    label: "Bạc",
    colorCode: "#eaeaea",
  },
];

const configurationsMap = [
  {
    value: "RAM",
    label: "RAM",
  },
  {
    value: "CPU",
    label: "CPU",
  },
  {
    value: "SSD",
    label: "SSD",
  },
  {
    value: "HDD",
    label: "HDD",
  },
  {
    value: "GPU",
    label: "GPU",
  },
  {
    value: "screen",
    label: "Màn hình",
  },
  {
    value: "status",
    label: "Trạng thái",
  },
];

const windowWidth = Dimensions.get("window").width;

const mapValueTolabel = (map: any, values: Array<string>) => {
  const labels = values.map((key: any) => {
    const result = map.filter((item: any) => key === item.value);
    return result[0].label;
  });
  return labels;
};

const dataForConfigurationsTable = (keys: any, data: any) => {
  const table = keys.map((key: any) => [data[key]]);
  return table;
};

export default function ItemDetailScreen({ navigation, route }: any) {
  const { id } = route.params;
  const idOfParticularProduct = id;
  const [productDetail, setProductDetail] = useState<any>();

  const [tableTitle, setTableTitle] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [colors, setColors] = useState([]);

  const dispatch = useAppDispatch();
  const quantityInCart = useAppSelector(amountOfItemsInCart);

  const [
    temporaryQuantityDisplayInItemDetailScreem,
    setTemporaryQuantityDisplayInItemDetailScreem,
  ] = useState(0);
  const [seller, setSeller] = useState("");
  useEffect(() => {
    const fetchDetailProduct = async () => {
      try {
        const data = await ProductApi.getProductDetails(id);
        const _data = data as any;
        setSeller(_data.seller);
        setProductDetail(_data);

        const _configTitle = mapValueTolabel(
          configurationsMap,
          Object.keys(_data.configurations)
        );
        setTableTitle(_configTitle as any);

        const _configData = dataForConfigurationsTable(
          Object.keys(_data.configurations),
          _data.configurations
        );
        setTableData(_configData as any);

        const _colors = _data.colors.map((color: any) => {
          return colorMap.filter((item) => item.value === color)[0];
        });

        // console.log(_colors);
        setColors(_colors as any);
      } catch (error) {
        console.log(
          "Failed to fetch flashsale product in item detail screen" + error
        );
      }
    };
    fetchDetailProduct();
  }, []);
  useEffect(() => {
    setTemporaryQuantityDisplayInItemDetailScreem(quantityInCart);
  }, [quantityInCart]);
  const _fomatNumber = (num: number) => {
    const formatter = new Intl.NumberFormat("en", {
      notation: "compact",
    });

    return formatter.format(num);
  };

  const _fomatNumber1 = (num: number) => {
    const formatter = new Intl.NumberFormat("us");
    return formatter.format(num);
  };

  const _renderTitle = () => {
    return (
      productDetail && (
        <View style={styles.wrapper}>
          <Text numberOfLines={1} style={{ fontSize: 15, color: "gray" }}>
            {productDetail!.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 8,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.priceSale}>
                {_fomatNumber1(productDetail.discount_price)}đ
              </Text>
              <Text style={styles.price}>
                {_fomatNumber1(productDetail.price)}đ
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <StarRating num={4.5} fontSize={18} />
              <Text
                style={{ ...styles.textSmall, marginLeft: 5 }}
              >{`(${_fomatNumber(12354)})`}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 3,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: "#d53332", marginRight: 7 }}>
                Tiết kiệm{" "}
                {_fomatNumber1(
                  productDetail.price - productDetail.discount_price
                )}
                đ
              </Text>
              <Text style={styles.dealDiscount}>
                -
                {Math.round(
                ((productDetail.price - productDetail.discount_price) *
                  100.0) /
                productDetail.price
              )}
                %
              </Text>
            </View>

            <Text style={styles.textSmall}>
              Đã bán {_fomatNumber(productDetail.price)}
            </Text>
          </View>

          <View style={{ marginTop: 12 }}>
            <Text style={{ fontWeight: "bold" }}>Màu sắc</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
                width: "60%",
              }}
            >
              {colors.map((item, index) => (
                <ColorCircle key={index} item={item} />
              ))}
            </View>
          </View>
        </View>
      )
    );
  };

  const _renderConfigurations = () => {
    return (
      <View style={{ ...styles.wrapper, marginTop: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>
          Cấu hình
        </Text>
        <Table borderStyle={{ borderWidth: 1 }}>
          <TableWrapper style={{ flexDirection: "row" }}>
            <Col
              data={tableTitle}
              heightArr={[32, 32]}
              textStyle={styles.tableTitle}
            />
            <Rows
              data={tableData}
              flexArr={[2]}
              style={{ height: 32 }}
              textStyle={styles.dataTitle}
            />
          </TableWrapper>
        </Table>
      </View>
    );
  };

  const [textShown, setTextShown] = useState(false); //To show ur remaining Text
  const [lengthMore, setLengthMore] = useState(false); //to show the "Read more & Less Line"
  const toggleNumberOfLines = () => { //To toggle the show text or hide it
    setTextShown(!textShown);
  }

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 4); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const _renderDescription = () => {
    return (
      productDetail && (
        <View style={{ ...styles.wrapper, marginTop: 10 }}>
          <Text style={styles.title}>Giới thiệu</Text>
          <View style={{ position: 'relative' }}>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                textAlign: "justify",
                lineHeight: 22,
                color: 'black'
              }}
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 4}
            >
              {productDetail.description}
            </Text>
            {
              lengthMore ? <>
                {
                  !textShown && <LinearGradient colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                  </LinearGradient>
                }
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                  <Text
                    onPress={toggleNumberOfLines}
                    style={styles.showMoreBtn}>
                    {textShown ? 'Read less' : 'Read more'}
                  </Text>
                </View>
              </>
                : null
            }
          </View>
        </View>
      )
    );
  };

  const handleAddToCart = (color: string, quantity: number) => {
    dispatch(
      addingNewProductToCart({
        id: idOfParticularProduct,
        title: productDetail.title,
        quantity: 1,
        price: productDetail.price,
        discount_price: productDetail.discount_price,
        product_thumbnail: productDetail.product_thumbnail,
        color: color,
      })
    );
    setTemporaryQuantityDisplayInItemDetailScreem((prev) => prev + 1);
  };

  const _renderComment = () => {
    return (
      productDetail && (
        <Comments comments={productDetail.reviews} productId={productDetail.id} navigation={navigation}/>
      )
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Header
          temporaryQuantityDisplayInItemDetailScreem={
            temporaryQuantityDisplayInItemDetailScreem
          }
        />
        <Carousel list={cards} width={windowWidth} height={250} />
        {_renderTitle()}
        {_renderConfigurations()}
        {_renderDescription()}
        {_renderComment()}
      </ScrollView>
      <AddingToCartModal
        colors={colors}
        onClick={handleAddToCart}
        navigation={navigation}
        seller={seller}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  price: {
    fontSize: 11,
    color: "gray",
    textDecorationLine: "line-through",
  },
  priceSale: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#d53332",
    marginRight: 6,
  },
  dealDiscount: {
    fontSize: 12,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: "#fbc217",
  },
  dataTitle: {
    paddingLeft: 10,
  },
  tableTitle: {
    paddingLeft: 10,
  },
  textSmall: {
    color: "gray",
    fontSize: 12,
  },
  showMoreBtn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'black',
    color: 'white',
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
