import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, FlatList, DrawerLayoutAndroid, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text, View } from '../components/Themed';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../components/filterScreen/Header'
import Tag from '../components/filterScreen/Tag'
import ColorCircle from '../components/common/ColorCircle'
import CardItem from '../components/common/cardItem/CardItem'
import Pagination from '../components/common/Pagination'
import SearchAndFiltersApi from '../api/SearchAndFiltersApi'

const brands = ["Apple", "Dell", "Samsung"]

const configurations = {
  RAM: ['4 GB', '8 GB', '16 GB', '32 GB', '64 GB', '128 GB'],
  SSD: ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB', '2 TB', '4 TB'],
  CPU: ['Core i3', 'Core i5', 'Core i7', 'Apple M1']
}
const colors = [
  {
    name: "white",
    displayName: "Trắng",
    colorCode: "#FFFFFF",
  },
  {
    name: 'black',
    displayName: "Đen",
    colorCode: "#000000"
  },
  {
    name: 'gold',
    displayName: "Vàng",
    colorCode: "#fccc1e"
  },
  {
    name: 'gray',
    displayName: "Xám",
    colorCode: "#b3b3b3"
  }
]

const status = [
  {
    value: 'all',
    displayName: 'Tất cả'
  },
  {
    value: 'used',
    displayName: 'Cũ'
  },
  {
    value: 'new',
    displayName: 'Mới'
  },
]

const displayProducts = [
  {
    id: '1',
    srcImg: 'https://images.pexels.com/photos/5054213/pexels-photo-5054213.jpeg?cs=srgb&dl=pexels-cottonbro-5054213.jpg&fm=jpg',
    retialPrice: '10.000',
    priceSale: '5.000',
    sold: '1200',
    rating_average: '4'
  },
  {
    id: '2',
    srcImg: 'https://images.pexels.com/photos/3975677/pexels-photo-3975677.jpeg?cs=srgb&dl=pexels-tatiana-syrikova-3975677.jpg&fm=jpg',
    retialPrice: '110.000',
    priceSale: '100.000',
    sold: '200',
    rating_average: '2.5'
  },
  {
    id: '3',
    srcImg: 'https://images.pexels.com/photos/3844565/pexels-photo-3844565.jpeg?cs=srgb&dl=pexels-ilya-klimenko-3844565.jpg&fm=jpg',
    retialPrice: '340.000',
    priceSale: '310.000',
    sold: '120',
    rating_average: '5'
  }
]

export default function FilterScreen({ route, navigation }: any) {

  const drawer = useRef<DrawerLayoutAndroid>(null)

  const { searchKeywords } = route.params

  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 11,
  })
  const [paging, setPaging] = useState({
    currentPage: 1,
    perPage: 10
  })
  const [postList, setPostList] = useState([])

  const [isFilter, setIsFilter] = useState(false)
  const [brandsSelected, setBrandsSelected] = useState<string[]>([])
  const [selectedRAM, setSelectedRAM] = useState<string[]>([])
  const [selectedCPU, setSelectedCPU] = useState<string[]>([])
  const [selectedSSD, setSelectedSSD] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [colorSelected, setColorSelected] = useState<string[]>([])
  const [yearRelease, setYearRelease] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [priceError, setPriceError] = useState(false)
  const [yearReleaseError, setYearReleaseError] = useState(false)

  const [chooseTag, setChooseTag] = useState(true)

  const [sortOption, setSortOption] = useState({
    by: 'price',
    order: 'none'
  })

  const _handleLatestChange = () => {
    setSortOption({
      by: 'latest',
      order: 'asc'
    })
  }

  const _handleSortPriceChange = () => {
    if (sortOption.by === 'latest' || sortOption.by === 'bestseller') {
      setSortOption({
        by: 'price',
        order: 'asc'
      })
      return
    }
    if (sortOption.by === 'asc') {
      setSortOption({
        by: 'price',
        order: 'desc'
      })
      return
    }
    if (sortOption.by === 'desc') {
      setSortOption({
        by: 'price',
        order: 'none'
      })
      return
    }
  }

  const _handleBestsellerChange = () => {
    setSortOption({
      by: 'bestseller',
      order: 'asc'
    })
  }

  const _handleFilterChange = () => {
    drawer?.current?.openDrawer()
  }

  const validatePrice = () => {
    const _maxPrice = parseInt(maxPrice)
    const _minPrice = parseInt(minPrice)
    if ((!_maxPrice && !_minPrice) || (_maxPrice && _minPrice && _maxPrice > _minPrice))
      return true
    setPriceError(true)
    return false
  }

  const validateYearRelease = () => {
    const currentYear = new Date().getFullYear()
    const _yearRelease = parseInt(yearRelease)
    if (!_yearRelease || _yearRelease <= currentYear)
      return true
    setYearReleaseError(true)
    return false
  }

  const vaildateFIlters = () => {
    let checked = true
    if (!validatePrice() || !validateYearRelease())
      checked = false

    return checked
  }

  useEffect(() => {
    fetchPostListPagination()
  }, [sortOption, paging])

  useEffect(() => {
    setPriceError(false)
  }, [minPrice, maxPrice])

  useEffect(() => {
    setYearReleaseError(false)
  }, [yearRelease])

  const fetchPostListPagination = async () => {
    const request = {
      searchKeywords: searchKeywords,
      configurations: {
        brands: brandsSelected,
        RAM: selectedRAM,
        CPU: selectedCPU,
        SSD: selectedSSD,
        colors: colorSelected,
      },
      prices: {
        min: minPrice === '' ? -1 : parseInt(minPrice),
        max: maxPrice === '' ? 1e9 : parseInt(maxPrice),
      },
      yearRelease: yearRelease === '' ? -1 : parseInt(yearRelease),
      status: selectedStatus,
      sort_options: sortOption,
      paging: paging
    }
    console.log(request)
    try {
      const responce = await SearchAndFiltersApi.getProductList(request)
      const { data, paging } = responce as any

      console.log("responce data: ")
      console.log(data)

      console.log("responce pagination: ")
      console.log(paging)

      if (paging.currentPage === 1)
        setPostList(data)
      else
        setPostList(postList.concat(data))
      setPagination(paging)
    } catch (error) {
      console.log("Failed to fetch post list in filterScreen: " + error)
    }
  }

  const onSubmit = async () => {
    if (!vaildateFIlters()) {
      return
    }

    if (brandsSelected.length === 0 &&
      selectedRAM.length === 0 && selectedCPU.length === 0 && selectedSSD.length === 0 &&
      colorSelected.length === 0 &&
      selectedStatus === 'all' &&
      minPrice === '' && maxPrice === '' &&
      yearRelease === ''
    ) {
      setIsFilter(false)
    } else {
      setIsFilter(true)
    }

    setPaging({ ...paging, currentPage: 1 })
  }

  const clearFilter = () => {
    setSelectedRAM([])
    setSelectedCPU([])
    setSelectedSSD([])
    setColorSelected([])
    setMinPrice('')
    setMaxPrice('')
    setBrandsSelected([])
    setSelectedStatus('all')
    setYearRelease('')

    setIsFilter(false)
  }

  const handleSelectbrands = (flag: 'ADD' | 'REMOVE', branch: string) => {
    if (flag === 'ADD')
      setBrandsSelected([...brandsSelected, branch])
    else {
      const newArr = brandsSelected.filter((value: any) => value !== branch)
      setBrandsSelected(newArr)
    }
  }

  const handleSelectRAM = (flag: 'ADD' | 'REMOVE', ramConfig: string) => {
    if (flag === 'ADD')
      setSelectedRAM([...selectedRAM, ramConfig])
    else {
      const newArr = selectedRAM.filter((value: any) => value !== ramConfig)
      setSelectedRAM(newArr)
    }
  }

  const handleSelectCPU = (flag: 'ADD' | 'REMOVE', cpuConfig: string) => {
    if (flag === 'ADD')
      setSelectedCPU([...selectedCPU, cpuConfig])
    else {
      const newArr = selectedCPU.filter((value: any) => value !== cpuConfig)
      setSelectedCPU(newArr)
    }
  }

  const handleSelectSSD = (flag: 'ADD' | 'REMOVE', SSDConfig: string) => {
    if (flag === 'ADD')
      setSelectedSSD([...selectedSSD, SSDConfig])
    else {
      const newArr = selectedSSD.filter((value: any) => value !== SSDConfig)
      setSelectedSSD(newArr)
    }
  }

  const _renderBranchFilter = () => {
    return (
      <View>
        <Text style={{ ...styles.title, marginTop: 15 }}>Thương hiệu</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {
            brands.map((item: string, index: any) =>
              <Tag value={item} key={index} onSelect={handleSelectbrands} />
            )
          }
        </View>
      </View>
    )

  }

  const handleSelectColor = (flag: 'ADD' | 'REMOVE', color: any) => {
    if (flag === 'ADD')
      setColorSelected([...colorSelected, color.name])
    else if (flag === 'REMOVE') {
      const newArr = colorSelected.filter((value: any) => color.name !== value)
      setColorSelected(newArr)
    }
  }

  const _renderColorFilter = () => {
    return (
      <View>
        <Text style={styles.title}>Màu sắc</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {
            colors.map((item, index) => (
              <ColorCircle key={index} item={item} onSelect={handleSelectColor} />
            ))
          }
        </View>
      </View>
    )
  }

  const _renderPriceFilter = () => {
    return (
      <View>
        <Text style={styles.title}>Khoảng giá  (VNĐ)</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextInput
            style={priceError ? { ...styles.input, borderColor: "#db0505" } : styles.input}
            onChangeText={setMinPrice}
            value={minPrice}
            placeholder="Từ"
            keyboardType="numeric" />
          <Text style={{ marginHorizontal: 5 }}>-</Text>
          <TextInput
            style={priceError ? { ...styles.input, borderColor: "#db0505" } : styles.input}
            onChangeText={setMaxPrice}
            value={maxPrice}
            placeholder="Đến"
            keyboardType="numeric" />
        </View>
      </View>
    )
  }

  const _renderStatusFilter = () => {
    return (
      <View>
        <Text style={styles.title}>Trạng thái sản phẩm</Text>
        <View style={{ ...styles.pickerWrapper, width: 135 }}>
          <Picker
            style={{ ...styles.picker, width: 135 }}
            selectedValue={selectedStatus}
            onValueChange={(itemValue: any) => setSelectedStatus(itemValue)}
          >
            {
              status.map((item: any, index: any) =>
                <Picker.Item key={index} label={item.displayName} value={item.value} />
              )
            }
          </Picker>
        </View>
      </View>
    )
  }

  const _renderReleaseYear = () => {
    return (
      <View>
        <Text style={styles.title}>Năm phát hành</Text>
        <TextInput
          style={yearReleaseError ? { ...styles.input, width: 100, borderColor: "#db0505" } : { ...styles.input, width: 100 }}
          onChangeText={setYearRelease}
          value={yearRelease}
          placeholder="2015"
          keyboardType="numeric" />
      </View>
    )
  }

  const _renderConfiguration = () => {
    return (
      <View>

        <View>
          <Text style={{ ...styles.title}}>RAM</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {
              configurations.RAM.map((item: string, index: any) =>
                <Tag value={item} key={index} onSelect={handleSelectRAM} />
              )
            }
          </View>

          <Text style={{ ...styles.title }}>CPU</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {
              configurations.CPU.map((item: string, index: any) =>
                <Tag value={item} key={index} onSelect={handleSelectCPU} />
              )
            }
          </View>

          <Text style={{ ...styles.title }}>SSD</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {
              configurations.SSD.map((item: string, index: any) =>
                <Tag value={item} key={index} onSelect={handleSelectSSD} />
              )
            }
          </View>
        </View>
      </View>
    )
  }

  const _renderNavigationView = () => (
    <View>
      <View style={styles.drawerHeader}>
        <Pressable onPress={() => drawer?.current?.closeDrawer()}>
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <View style={{ flexGrow: 1, alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Lọc sản phẩm</Text>
        </View>
        <Pressable onPress={clearFilter} style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 15, textDecorationLine: 'underline' }}>Xóa</Text>
        </Pressable>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.drawerContent}
      >
        {_renderBranchFilter()}
        {_renderColorFilter()}
        {_renderPriceFilter()}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {_renderReleaseYear()}
          {_renderStatusFilter()}
        </View>
        {_renderConfiguration()}
        <Pressable onPress={onSubmit} style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
          <Text style={styles.submitBtn}>Áp dụng</Text>
        </Pressable>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );

  const renderItem = ({ item }: any) => (
    <CardItem
      props={item}
      navigation={navigation} />
  )

  const handlePaginationChange = (newPage: number) => {
    // console.log(newPage)
    setPaging({ ...paging, currentPage: newPage })
  }

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={_renderNavigationView}
    >
      <Pagination
        renderItem={renderItem}
        paging={pagination}
        onPageChange={handlePaginationChange}
        data={postList}
      >
        <Header
          navigation={navigation}
          defaultValue={searchKeywords}
        />
        <View style={styles.navigation}>
          <Pressable onPress={_handleLatestChange}>
            <Text style={sortOption.by === 'latest' ? styles.optionActive : styles.option}>
              Mới nhất
          </Text>
          </Pressable>
          <Pressable onPress={_handleBestsellerChange}>
            <Text style={sortOption.by === 'bestseller' ? styles.optionActive : styles.option}>Bán chạy</Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={_handleSortPriceChange}>
            <Text style={sortOption.by === 'price' ? { ...styles.optionActive, marginRight: 2 } : { ...styles.option, marginRight: 2 }}>Giá</Text>
            {
              sortOption.order === "none" ?
                <MaterialCommunityIcons name="arrow-up-down" size={16} color={`${sortOption.by === 'price' ? 'black' : 'gray'}`} /> :
                sortOption.order === "asc" ?
                  <AntDesign name="arrowup" size={16} color={`${sortOption.by === 'price' ? 'black' : 'gray'}`} /> :
                  <AntDesign name="arrowdown" size={16} color={`${sortOption.by === 'price' ? 'black' : 'gray'}`} />
            }
          </Pressable>

          {
            drawer && <Pressable onPress={_handleFilterChange} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={isFilter ? { ...styles.optionActive, marginRight: 2 } : { ...styles.option, marginRight: 2 }}>Lọc</Text>
              <AntDesign name="filter" size={16} color={`${isFilter ? 'black' : 'gray'}`} />
            </Pressable>
          }
        </View>


      </Pagination>
    </DrawerLayoutAndroid>

  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
    paddingTop: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
  },
  drawerContent: {
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  drawerHeader: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#DDDDDD",
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 35,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 30
  },
  pickerFeild: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  picker: {
    width: 200,
    height: 30,
  },
  pickerWrapper: {
    borderWidth: 1,
    overflow: "hidden",
    height: 30,
    width: 200,
    backgroundColor: "#FFF",
    transform: [
      { scaleX: 0.9 },
      { scaleY: 0.9 },
      { translateX: 10 }
    ]
  },
  input: {
    width: 120,
    height: 30,
    borderColor: "black",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  submitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "black",
    color: "white",
    fontSize: 16,
  },
  option: {
    color: "gray",
  },
  optionActive: {
    color: "black"
  }
});
