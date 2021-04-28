import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const ColorCircle = ({ item, _key, onPress }: any) => {
    const [isSelected, setIsSelected] = useState<boolean>(false)

    useEffect(() => {
        if (!onPress) return
        if (isSelected)
            onPress("ADD", item)
        else
            onPress("REMOVE", item)
    }, [isSelected])


    return (
        <Pressable 
            onPress={() => setIsSelected(!isSelected)} 
            key={_key} 
            style={{ flexDirection: "row" }}
        >
            <View style={
                 isSelected ?
                    { ...styles.circleActive, backgroundColor: item.colorCode } :
                    { ...styles.circle, backgroundColor: item.colorCode }}
            >
                {isSelected && <Ionicons name="ios-checkmark-sharp" size={15} color="#137ee8" />}
            </View>
            <Text style={{ fontSize: 15, color: 'black' }}>{item.label}</Text>
        </Pressable>
    )
}
export default ColorCircle

const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        marginRight: 5,
    },
    circleActive: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
        borderColor: "#137ee8",
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center"
    },
})