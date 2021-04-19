import { HeaderHeightContext } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, Image } from "react-native"
import { ScrollView } from 'react-native-gesture-handler'

const Carousel = ({ list, width, height }: any) => {
    const [cardActive, setCardActive] = useState(0)

    const change = ({ nativeEvent }: any) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide !== cardActive) {
            setCardActive(slide)
        }
    }
    return (
        <View style={{
            width: width,
            height: height,
            position: "relative",
        }}>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                onScroll={change}
                showsHorizontalScrollIndicator={false}
                style={{ width: width, height: height }}
            >
                {
                    list && list.map((item: any, index: any) => (
                        <Image
                            key={index}
                            source={{ uri: item.imgUrl }}
                            style={{
                                width: width,
                                height: height,
                                resizeMode: 'cover'
                            }}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.pagination}>
                {
                    list && list.map((item: any, index: any) => (
                        <Text
                            key={index}
                            style={cardActive === index ? styles.pagingTextActive : styles.pagingText}
                        >⬤</Text>
                    ))
                }

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

    },
    image: {

    },
    pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0,
        alignSelf: "center",
    },
    pagingText: {
        color: "#b1b1b1",
        fontSize: 12,
        margin: 3,
    },
    pagingTextActive: {
        color: "white",
        fontSize: 12,
        margin: 3,
    }
})

export default Carousel