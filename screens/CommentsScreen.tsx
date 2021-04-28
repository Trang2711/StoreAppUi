import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


import Pagination from '../components/common/Pagination'
import ProductApi from '../api/ProductApi'
import Comment from '../components/common/Carousel'

const numberCols = 5

const filterOptions = [
    {
        label: "Tất cả",
        total: 1900
    },
    {
        label: "Có hình ảnh",
        total: 1900
    },
    {
        label: "Có bình luận",
        total: 1900
    },
    {
        label: "1 sao",
        total: 1900
    },
    {
        label: "2 sao",
        total: 1900
    },
    {
        label: "3 sao",
        total: 1900
    },
    {
        label: "4 sao",
        total: 1900
    },
    {
        label: "5 sao",
        total: 1900
    }
]

export default function SearchScreen({ route, navigation }: any) {
    const { product_id } = route.params

    const [comments, setComments] = useState([])

    const [pagination, setPagination] = useState({
        currentPage: 1,
        perPage: 10,
        total: 11,
    })

    const [_paging, setPaging] = useState({
        currentPage: 1,
        perPage: 10
    })

    const fetchComments = async (id: any) => {
        try {
            const request = {
                product_id: id,
                paging: _paging
            }
            const responce = await ProductApi.getCommentsOfProduct(request)
            const { data, paging } = responce as any

            if (paging.currentPage === 1) {
                setComments(data)
            }
            else
                setComments(comments.concat(data))

            setPagination(paging)
        } catch (error) {
            console.log("Failed to fetch comments in comments screen: " + error)
        }
    }

    useEffect(() => {
        fetchComments(product_id)
    }, [_paging])

    const renderItem = ({ item }: any) => (
        <Comment
            item={item}
            navigation={navigation} />
    )

    const handlePaginationChange = (newPage: number) => {
        setPaging({ ..._paging, currentPage: newPage })
    }

    const _fomatNumber = (num: number) => {
        const formatter = new Intl.NumberFormat('en', {
            notation: 'compact'
        })

        return formatter.format(num)
    }

    return (
        <Pagination
            renderItem={renderItem}
            paging={pagination}
            onPageChange={handlePaginationChange}
            data={comments}
        >
            <View style={{ paddingHorizontal: 5, paddingVertical: 10, borderBottomColor: '#DDDDDD', borderBottomWidth: 0.5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ ...styles.filterOption, ...styles.active, width: "32%" }}>
                        <Text>Tất cả</Text>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>
                    <View style={{ ...styles.filterOption, width: "32%" }}>
                        <Text>Có hình ảnh</Text>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>
                    <View style={{ ...styles.filterOption, width: "32%" }}>
                        <Text>Có bình luận</Text>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                    <View style={{ ...styles.filterOption, width: "19%" }}>
                        <View style={{ backgroundColor: '#F1F3F', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>1</Text>
                            <MaterialIcons name="star" size={16} color="#eec82c" />
                        </View>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>

                    <View style={{ ...styles.filterOption, width: "19%" }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>2</Text>
                            <MaterialIcons name="star" size={16} color="#eec82c" />
                        </View>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>

                    <View style={{ ...styles.filterOption, width: "19%" }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text >3</Text>
                            <MaterialIcons name="star" size={16} color="#eec82c" />
                        </View>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>

                    <View style={{ ...styles.filterOption, width: "19%" }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>4</Text>
                            <MaterialIcons name="star" size={16} color="#eec82c" />
                        </View>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>

                    <View style={{ ...styles.filterOption, width: "19%" }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text>5</Text>
                            <MaterialIcons name="star" size={16} color="#eec82c" />
                        </View>
                        <Text style={{ fontSize: 12 }}>{_fomatNumber(195748)}</Text>
                    </View>
                </View>
            </View>
        </Pagination>
    );
}

const styles = StyleSheet.create({
    active: {
        borderColor: 'black',
        backgroundColor: 'white'
    },
    filterOption: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderColor: '#F1F3F4',
        backgroundColor: '#F1F3F4',
        borderWidth: 1,
    }
});
