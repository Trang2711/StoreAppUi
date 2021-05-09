import * as React from "react";
import { useState, useEffect } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import ProductApi from "../api/ProductApi";
import { useAppSelector, useAppDispatch } from "../redux/app/hook";
import { incrementByAmount, selectCount } from "../redux/features/counterSlice";
// import Pagination from "../components/common/Pagination"

export default function NotificationsScreen({ route }: any) {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [amountOfCmt, setAmountOfCmt] = useState();
  const [specifiedProduct, setSpecifiedProduct] = useState({});
  const [extraCmt, setExtraCmt] = useState(0);
  const [DisPlayCmt, setDisPlayCmt] = useState<any[]>([]);
  const [itemImg, setItemImg] = useState([]);
  const [loadingWhileFetchData, setLoadingWhileFetchData] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchSpecifiedProduct();
    setInterval(() => {
      setLoadingWhileFetchData(false);
    }, 1000);
  }, [CurrentPage]);

  useEffect(() => {
    sliceCmt();
  }, [extraCmt]);


  async function fetchSpecifiedProduct() {
    try {
      const response = await ProductApi.getProductDetails(3);
      setSpecifiedProduct(response);
      const temp = response as any;
      setItemImg(temp.lapUrl);
    } catch (error) {
      console.log(error);
    }
  }

  // function handlingUserPressingWatchMoreCmt() {
  //   setExtraCmt((prev) => prev + 5);
  //   setIsLoadingMoreCmt(true);
  //   setTimeout(() => {
  //     setIsLoadingMoreCmt(false);
  //   }, 1000);
  // }
  async function sliceCmt() {
    try {
      const response = await ProductApi.getProductDetails(3);
      const temp = response as any;
      const allCmts = temp.comments;
      setDisPlayCmt(allCmts.slice(0, 5 + extraCmt));
    } catch (error) {
      console.log(error);
    }
  }

  const _renderProduct = (item: any, key: any) => {
    return (
      <View key={key} style={styles.eachPost}>
        <Image
          style={styles.moreItemImg}
          source={{ uri: item.lapUrl[0] }}
        ></Image>
        <Text>Giá: 1 triệu</Text>
      </View>
    )
  }

  return (
    <>
     
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    height: 675,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingHorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  text16: {
    fontSize: 16,
  },

  text20: {
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  boldText: {
    fontWeight: "bold",
  },
  eachPost: {
    marginRight: 8,
    marginTop: 5,
    marginBottom: 20,
  },
  moreItemImg: {
    width: 184,
    height: 150,
  },
  mayBeUlike: {
    paddingBottom: 10,
    paddingTop: 10,
  },
  centerItem: {
    textAlign: "center",
  },
});
