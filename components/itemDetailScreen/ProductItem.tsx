import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ProductApi from "../../api/ProductApi";
import ImgSlider from "./itemProp/ImgSlider";
import ItemProperty from "./itemProp/ItemProperty";

const ProductItem = ({ itemId }: any) => {
  const [amountOfCmt, setAmountOfCmt] = useState();
  const [DisPlayCmt, setDisPlayCmt] = useState<any[]>([]);
  const [IsLoadingMoreCmt, setIsLoadingMoreCmt] = useState(false);
  const [itemImg, setItemImg] = useState([
    "/media/15d-700x530_kHFIYGS.jpg",
    "/media/15d-700x530_kHFIYGS.jpg",
    "/media/15d-700x530_kHFIYGS.jpg",
  ]);
  const [extraCmt, setExtraCmt] = useState(0);
  const [specifiedProduct, setSpecifiedProduct] = useState({});
  function handlingUserPressingWatchMoreCmt() {
    setExtraCmt((prev) => prev + 5);
    setIsLoadingMoreCmt(true);
    setTimeout(() => {
      setIsLoadingMoreCmt(false);
    }, 1000);
  }
  useEffect(() => {
    let mounted = true;
    async function fetchSpecifiedProduct() {
      try {
        const response = await ProductApi.getSpecifiedProduct(itemId);
        setSpecifiedProduct(response);
        const temp = response as any;
        setItemImg((prev): any => [...prev, temp.product_thumbnail]);
      } catch (error) {
        console.log(error);
      }
    }
    if (mounted) {
      fetchSpecifiedProduct();
    }
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    async function sliceCmt() {
      try {
        const response = await ProductApi.getSpecifiedProduct(itemId);
        const temp = response as any;
        const allCmts = temp.comments;
        setDisPlayCmt(allCmts.slice(0, 5 + extraCmt));
      } catch (error) {
        console.log(error);
      }
    }
    sliceCmt();
  }, [extraCmt]);
  useEffect(() => {}, [itemImg]);
  return (
    <View>
      <ImgSlider itemImg={itemImg} />
      <ItemProperty
        amountOfCmt={amountOfCmt}
        comment={DisPlayCmt}
        handlingUserPressingWatchMoreCmt={handlingUserPressingWatchMoreCmt}
        IsLoadingMoreCmt={IsLoadingMoreCmt}
        specifiedProduct={specifiedProduct}
        itemId={itemId}
      />
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
