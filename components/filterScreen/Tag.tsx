import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface Tag {
    value: string,
    onSelect: Function,
    key: any
}

const Tag = ({ value, onSelect, key } : Tag) => {
    const [selected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        if(!onSelect) return
        if(selected)
            onSelect("ADD", value)
        else
            onSelect("REMOVE", value)
    }, [selected])

    return (
        <Pressable key={key} onPress={() => setSelected(!selected)}>
            <Text style={selected ? styles.selectTag : styles.tag}>{value}</Text>
            {
                selected && <Ionicons style={styles.closeIcon} name="ios-close-sharp" size={8} color="black" />
            }
            
        </Pressable>
    )
}
export default Tag

const styles = StyleSheet.create({
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#F1F3F4",
        fontSize: 14,
        marginRight: 10,
        marginBottom: 10,
        borderColor: "white",
        borderWidth: 1,
      },
      selectTag: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "white",
        fontSize: 14,
        marginRight: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "black",
        position: "relative"
      },
      closeIcon: {
          position: "absolute",
          right: 0,
          top: 0,
          transform: [
            { translateX: -12},
            { translateY: 2 }
          ]
      }
})