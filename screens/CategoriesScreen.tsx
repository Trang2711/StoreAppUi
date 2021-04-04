import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Carousel from '../components/categoriesScreen/Carousel'

import Header from '../components/homeScreen/Header';
import CardItemSmall from '../components/categoriesScreen/CardItemSmall'
import CategoryApi from '../api/CategoryApi';

import { Text, View } from '../components/Themed';

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

const listItem = [
  {
    id: '1',
    srcImg: 'https://www.hnmac.vn/media/cache/data/16t-350x265.jpg',
    title: "Macbook Pro 16 inch 2019"
  },
  {
    id: '2',
    srcImg: 'https://www.hnmac.vn/media/cache/data/P20201-350x265.jpg',
    title: "Macbook Pro 13 inch 2020"
  },
  {
    id: '3',
    srcImg: 'https://www.hnmac.vn/media/cache/data/16tt-350x265.jpg',
    title: "Macbook Pro 16 inch 2019"
  },
]

interface Category {
  id: string;
  name: string;
  carousel: Array<any>;
  products: Array<any>;
}

interface Product {
  id: string;
  scrImg: string;
  title: string;
}

export default function CategoriesScreen() {
  const [categories, setCategories] = useState<Category[]>([])
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Array<Product> | []>([])

  useEffect(() => {
    async function fetchCateories() {
      const data = await CategoryApi.getAll()
      const _categories = data as any
      if (_categories) {
        setCategories(_categories)
        setActiveCategory(_categories[0])
      }
    }
    fetchCateories()
  }, [])

  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)

  useEffect(() => {
    const fetchProducts = async () => {
      if (activeCategory) {
        const data = await CategoryApi.getCategory(activeCategory.id)
        const _data = data as any
        setProducts(_data.products)
      }
    }
    fetchProducts()
  }, [activeCategory])

  const toggleActive = (index: number) => {
    setActiveCategory(categories[index])
  }

  const toggleActiveStyle = (index: number) => {
    if (categories[index] === activeCategory) {
      return "#f2f2f2"
    }
    else
      return "white"
  }

  const renderItem = (item: any) => (
    <CardItemSmall props={item} />
  );

  return (
    <View>
      <Header />
      <View style={styles.container}>
        <View style={styles.leftTab}>
          {
            categories && categories.map((category, index) => (
              <Text
                style={[styles.category, { backgroundColor: toggleActiveStyle(index) }]}
                key={index}
                onPress={() => {
                  toggleActive(index)
                }}
              >
                {category.name}
              </Text>
            ))
          }
        </View>

        {
          activeCategory &&
          <View style={styles.tabContent}>
            <Carousel list={activeCategory.carousel} />
            <View style={{ marginTop: 10, paddingVertical: 10 }}>
              <Text style={styles.title}>{activeCategory.name}</Text>
              <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
              />

            </View>
          </View>
        }


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
    backgroundColor: "#f2f2f2",
  },

  leftTab: {
    width: 100,
    height: "100%",
    backgroundColor: "white",
  },

  category: {
    fontSize: 11,
    paddingHorizontal: 5,
    paddingVertical: 20,
    textTransform: "uppercase",
  },

  tabContent: {
    flexGrow: 1,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: "#f2f2f2",
  },

  title: {
    fontSize: 13,
    fontWeight: "bold",
    paddingLeft: 15,
    marginBottom: 5
  }
});
