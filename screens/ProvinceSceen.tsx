import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import axios from "axios"

export default function ProvinceScreen({ navigation } : any) {
    const [provinces, setProvinces] = useState([])
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const responce = await axios.get('https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province', {
                    headers: {
                        token: `3f355786-bc78-11eb-8546-ca480ac3485e`
                    }
                })
                const data = responce.data.data
                setProvinces(data as any)
            } catch (error) {
                console.log('Failed to fetch province: ', error)
            }
        }
        fetchProvinces()
    }, [])
    return (
        <ScrollView style={styles.container}>
            {
                provinces.map((item: any, index) => (
                    <TouchableOpacity 
                        key={index}
                        onPress={() => {
                            navigation.navigate("AddressScreen", {_province: item.ProvinceName})
                        }}
                    >
                        <Text style={styles.provinceItem}>{item.ProvinceName}</Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 5
    },
    provinceItem: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16
    }
});
