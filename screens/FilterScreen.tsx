import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, Button, DrawerLayoutAndroid, Pressable, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Text, View } from '../components/Themed';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Header from '../components/filterScreen/Header'
import Tag from '../components/filterScreen/Tag'
import ColorCircle from '../components/filterScreen/ColorCircle'
import SearchAndFiltersApi from '../api/SearchAndFiltersApi'

const brands = ["Apple", "Dell", "Nokia", "Samsung", "Lenovo", "Asus", "Sony"]
const configurations = {
  RAM: [
    {
      value: 'all',
      displayName: 'Tất cả'
    },
    {
      value: '4 GB',
      displayName: '4 GB'
    },
    {
      value: '8 GB',
      displayName: '8 GB'
    },
    {
      value: '16 GB',
      displayName: '16 GB'
    },
    {
      value: '32 GB',
      displayName: '32 GB'
    },
    {
      value: '64 GB',
      displayName: '64 GB'
    },
    {
      value: '128 GB',
      displayName: '128 GB'
    }
  ],
  CPU: [
    {
      value: 'all',
      displayName: 'Tất cả'
    },
    {
      value: 'Core i3',
      displayName: 'Core i3'
    },
    {
      value: 'Core i5',
      displayName: 'Core i5'
    },
    {
      value: 'Core i7',
      displayName: 'Core i7'
    }
  ],
  SSD: [{
    value: 'all',
    displayName: 'Tất cả'
  },
  {
    value: '64 GB',
    displayName: '64 GB'
  },
  {
    value: '128 GB',
    displayName: '128 GB',
  },
  {
    value: '256 GB',
    displayName: '256 GB'
  },
  {
    value: '1 TB',
    displayName: '1 TB'
  }
  ],
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

export default function FilterScreen({ route, navigation }: any) {

  const drawer = useRef<DrawerLayoutAndroid>(null)

  const { searchKeywords } = route.params
  console.log(searchKeywords)
  // const [listProduct, setListProduct] = useState([])

  const [isFilter, setIsFilter] = useState(false)
  const [brandsSelected, setBrandsSelected] = useState<string[]>([])
  const [selectedRAM, setSelectedRAM] = useState("all");
  const [selectedCPU, setSelectedCPU] = useState("all");
  const [selectedSSD, setSelectedSSD] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [colorSelected, setColorSelected] = useState<string[]>([])
  const [yearRelease, setYearRelease] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [priceError, setPriceError] = useState(false)
  const [yearReleaseError, setYearReleaseError] = useState(false)

  const [chooseTag, setChooseTag] = useState(true)

  const [active, setActive] = useState<string | null>(null)
  const [latest, setLatest] = useState<boolean>(false)
  const [sortPrice, setSortPrice] = useState('RANDOM')
  const [bestseller, setBestseller] = useState(false)

  

  const _handleLatestChange = () => {
    setActive('LATEST')
    setLatest(!latest)
  }

  const _handleSortPriceChange = () => {
    setActive('PRICE')
    console.log(sortPrice)
    if (sortPrice === 'RANDOM') {
      setSortPrice('ASC')
      return
    }
    if (sortPrice === 'ASC') {
      setSortPrice('DESC')
      return
    }
    if (sortPrice === 'DESC') {
      setSortPrice('RANDOM')
      return
    }
  }

  const _handleBestsellerChange = () => {
    setActive('BESTSELLER')
    setBestseller(!bestseller)
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
    sendRequest()
  }, [bestseller, latest, sortPrice])

  useEffect(() => {
    setPriceError(false)
  }, [minPrice, maxPrice])

  useEffect(() => {
    setYearReleaseError(false)
  }, [yearRelease])

  const sendRequest = () => {
    const request = {
      searchKeywords: searchKeywords,
      brands: brandsSelected,
      configurations: {
        RAM: selectedRAM,
        CPU: selectedCPU,
        SSD: selectedSSD
      },
      colors: colorSelected,
      prices: {
        min: minPrice === '' ? -1 : parseInt(minPrice),
        max: maxPrice === '' ? -1 : parseInt(maxPrice),
      },
      yearRelease: yearRelease === '' ? -1 : parseInt(yearRelease),
      status: selectedStatus,
      latest: latest,
      sortPrice: sortPrice,
      bestseller: bestseller
    }
    console.log(request)
  }

  const onSubmit = () => {
    if (!vaildateFIlters()) {
      return
    }

    if (brandsSelected.length === 0 &&
      selectedRAM === 'all' && selectedCPU === 'all' && selectedSSD === 'all' &&
      colorSelected.length === 0 &&
      selectedStatus === 'all' &&
      minPrice === '' && maxPrice === '' &&
      yearRelease === ''
    ) {
      setIsFilter(false)
    } else {
      setIsFilter(true)
    }

    sendRequest()
  }

  const clearFilter = () => {
    setSelectedRAM('all')
    setSelectedCPU('all')
    setSelectedSSD('all')
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
        <Text style={{ ...styles.title, marginTop: 15 }}>Cấu hình</Text>

        <View style={styles.pickerFeild}>
          <Text style={{ marginRight: 10, fontSize: 15 }}>RAM</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={selectedRAM}
              onValueChange={(itemValue: any) => setSelectedRAM(itemValue)}
              itemStyle={{ fontSize: 8, color: 'red' }}

            >
              {
                configurations.RAM.map((item: any, index: any) =>
                  <Picker.Item key={index} label={item.displayName} value={item.value} />
                )
              }
            </Picker>
          </View>
        </View>

        <View style={styles.pickerFeild}>
          <Text style={{ marginRight: 10, fontSize: 15 }}>CPU</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={selectedCPU}
              onValueChange={(itemValue: any) => setSelectedCPU(itemValue)}
            >
              {
                configurations.CPU.map((item: any, index: any) =>
                  <Picker.Item key={index} label={item.displayName} value={item.value} />
                )
              }
            </Picker>
          </View>
        </View>

        <View style={{ ...styles.pickerFeild, marginBottom: 0 }}>
          <Text style={{ marginRight: 10, fontSize: 15 }}>SSD</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={selectedSSD}
              onValueChange={(itemValue: any) => setSelectedSSD(itemValue)}
            >
              {
                configurations.SSD.map((item: any, index: any) =>
                  <Picker.Item key={index} label={item.displayName} value={item.value} />
                )
              }
            </Picker>
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
        {_renderConfiguration()}
        {_renderColorFilter()}
        {_renderPriceFilter()}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {_renderReleaseYear()}
          {_renderStatusFilter()}
        </View>
        <Pressable onPress={onSubmit} style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 20 }}>
          <Text style={styles.submitBtn}>Áp dụng</Text>
        </Pressable>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={_renderNavigationView}
    >
      <View style={{ height: "200%" }}>
        <Header
          navigation={navigation}
          defaultValue={searchKeywords}
        />
        <View style={styles.navigation}>
          <Pressable onPress={_handleLatestChange}>
            <Text style={active === 'LATEST' ? styles.optionActive : styles.option}>
              Mới nhất
          </Text>
          </Pressable>
          <Pressable onPress={_handleBestsellerChange}>
            <Text style={active === 'BESTSELLER' ? styles.optionActive : styles.option}>Bán chạy</Text>
          </Pressable>
          <Pressable style={{ flexDirection: "row", alignItems: "center" }} onPress={_handleSortPriceChange}>
            <Text style={active === 'PRICE' ? { ...styles.optionActive, marginRight: 2 } : { ...styles.option, marginRight: 2 }}>Giá</Text>
            {
              sortPrice === "RANDOM" ?
                <MaterialCommunityIcons name="arrow-up-down" size={16} color={`${active === 'PRICE' ? 'black' : 'gray'}`} /> :
                sortPrice === "ASC" ?
                  <AntDesign name="arrowup" size={16} color={`${active === 'PRICE' ? 'black' : 'gray'}`} /> :
                  <AntDesign name="arrowdown" size={16} color={`${active === 'PRICE' ? 'black' : 'gray'}`} />
            }
          </Pressable>

          {
            drawer && <Pressable onPress={_handleFilterChange} style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={isFilter ? { ...styles.optionActive, marginRight: 2 } : { ...styles.option, marginRight: 2 }}>Lọc</Text>
              <AntDesign name="filter" size={16} color={`${isFilter ? 'black' : 'gray'}`} />
            </Pressable>
          }
        </View>
      </View>
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
    marginBottom: 20,
    marginTop: 40
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
