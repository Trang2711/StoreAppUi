import * as React from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function StarRating({num, fontSize}: any) {
    const a = Math.floor(num)
    const b = num - a
    const c = 5 - a - Math.round(b)
    const jsx = []
    for (let i = 0; i < a; i++) {
        jsx.push(<MaterialIcons key={i.toString()} name="star" size={fontSize} color="#eec82c" />)
    }

    if(b > 0) jsx.push(<MaterialIcons key={jsx.length.toString()} name="star-half" size={fontSize} color="#eec82c" />)

    for (let i = 0; i < c; i++) {
        if(i < 5)
            jsx.push(<MaterialIcons key={(jsx.length + i).toString()} name="star-border" size={fontSize} color="#eec82c" />)
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            { jsx }
        </View>
    );
}

const styles = StyleSheet.create({

})