import * as React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function StarRating({num}: any) {
    const a = Math.floor(num)
    const b = num - a
    const c = 5 - a - Math.round(b)
    const jsx = []
    for (let i = 0; i < a; i++) {
        jsx.push(<MaterialIcons name="star" size={18} color="#eec82c" />)
    }

    if(b > 0) jsx.push(<MaterialIcons name="star-half" size={18} color="#eec82c" />)

    for (let i = 0; i < c; i++) {
        jsx.push(<MaterialIcons name="star-border" size={18} color="#eec82c" />)
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            {
                jsx
            }
            {/* <MaterialIcons name="star" size={18} color="#eec82c" />
            <MaterialIcons name="star-half" size={18} color="#eec82c" />
            <MaterialIcons name="star-border" size={18} color="#eec82c" /> */}
        </View>
    );
}

const styles = StyleSheet.create({

})