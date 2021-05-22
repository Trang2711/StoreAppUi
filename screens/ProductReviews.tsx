import React, { useState, useEffect, useCallback } from "react";
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Modal,
    ImageBackground,
    TextInput,
    Platform
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ProductApi from '../api/ProductApi'
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function Comments({ navigation, route }: any) {
    const { productId } = route.params;

    const [star, setStar] = useState(0)
    const [comment, setComment] = useState('')

    const [images, setImages] = useState([]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        }) as any

        if (!result.cancelled) {
            const image = {uri: result.uri, type: result.type, base64: result.base64}
            let _data = images as any
            _data.push(image)
            setImages(_data);
        }
    };

    const onSubmit = () => {
        try {
            const data = {
                star,
                images,
                content: comment,
                product: productId
            }
            console.log('send review: ', images.length)
            ProductApi.sendReview(data)
            
        } catch (error) {
            console.log('Fail to post review: ', error)
        }
    }


    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <ImageBackground style={styles.thumbnail} source={{ uri: "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }}></ImageBackground>
                <View style={{ width: '65%' }}>
                    <Text numberOfLines={1} style={{ fontSize: 15, fontWeight: 'bold' }}>Laptop Macbook Pro 2018 bfkjbg hbf bf</Text>
                    <Text style={{ marginTop: 5 }}>Màu: trắng</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center' }}>
                {
                    [...Array(5)].map((e, i) => (
                        <FontAwesome
                            key={i}
                            style={{ marginHorizontal: 4 }}
                            // name={i < star ? 'star' : 'star-o'}
                            name={star === 0 ? 'star-o' : i + 1 <= star ? 'star' : 'star-o'}
                            size={40}
                            color="#eec82c"
                            onPress={() => setStar(i + 1)}
                        />
                    ))
                }
            </View>

            <View>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={pickImage}>
                        <Feather name="camera" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={{ marginLeft: 4 }}>{`(Tối đa 4 hình ảnh)`}</Text>
                </View>
                <ScrollView horizontal={true} style={{ marginTop: 12 }}>
                    <ImageBackground style={styles.image} source={{ uri: "https://images.pexels.com/photos/4006151/pexels-photo-4006151.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" }}></ImageBackground>
                </ScrollView>
            </View>
            <TextInput
                style={styles.commentInput}
                multiline
                numberOfLines={4}
                onChangeText={text => setComment(text)}
                value={comment}
                placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm nhé.'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.submitBtn}>Gửi</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        paddingTop: 10,
        height: '100%'
    },
    thumbnail: {
        height: 70,
        width: 100,
        resizeMode: 'cover',
        marginRight: 10
    },
    commentInput: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        backgroundColor: '#f1f3f4',
        marginTop: 20
    },
    image: {
        height: 90,
        width: 125,
        resizeMode: 'cover',
        backgroundColor: '#f1f3f4',
    },
    submitBtn: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: 'black',
        color: 'white',
        fontSize: 15
    }
});
