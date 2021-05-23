import React from 'react'
import { View, Text, StyleSheet, ImageBackground, FlatList, Image } from 'react-native'
import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { baseUrl } from "../../api/AxiosClient";

import StarRating from './StarRating'

const numCol = 3

const renderItem = ({ item }: any) => {
    return (
        <ImageBackground style={styles.image} source={{ uri: `${baseUrl}${item}` }}></ImageBackground>
    )
}

export default function Comment({ item, navigate }: any) {
    const { id, avatar, username, star, create_date, content, images } = item

    const formatData = (dataList: any, numberCols: number) => {
        const totalRows = Math.floor(dataList.length / numberCols)
        let totalLastRow = dataList.length - (totalRows * numberCols)

        while(totalLastRow !== 0 && totalLastRow !== numberCols) {
            dataList.push('')
            totalLastRow ++
        }
        return dataList
    }

    return (
        <View key={id} style={{marginTop: 23, flex: 1}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <ImageBackground
                        source={{ uri: avatar }}
                        style={styles.avatar}
                        imageStyle={{
                            borderRadius: 40,
                            borderColor: "#DDDDDD",
                            borderWidth: 0.5
                        }}
                    >
                    </ImageBackground>
                    <Text style={{ marginLeft: 5 }}>{username}</Text>
                </View>
                <StarRating num={star} fontSize={18} />
            </View>

            <Text style={{ fontSize: 12, color: 'gray', marginTop: 7 }}>{create_date}</Text>

            <Text style={{ fontSize: 14, marginTop: 5, marginBottom: 7 }}>{content}</Text>

            <FlatList data={formatData(images, numCol)}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                numColumns={numCol}
            >
            </FlatList>
        </View>
    )
}


const styles = StyleSheet.create({
    avatar: {
        width: 30,
        height: 30
    },
    image: {
        height: 70,
        resizeMode: 'cover',
        flex: 1,
        marginRight: 7,
        marginBottom: 7
    }
});

