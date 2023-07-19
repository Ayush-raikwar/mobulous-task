import { View, Text, ImageBackground, Pressable, Image } from 'react-native'
import React from 'react'
import { device } from '../../constants/helpers';

export const CardList = ({ url, title, ontouch }) => {
    // console.log(url);
    return (
        <Pressable style={{
            backgroundColor: 'rgba(0,0,0,.1)', marginBottom: 22, padding: 12,
            borderRadius: 10, alignItems: 'center', width: device.dWidth * .9
        }}
            onPress={ontouch}
        >
            <Text style={{ fontWeight: '600', color: '#000', marginBottom: 12, }}>{title}</Text>
            <Image source={{ uri: url }}
                style={{ width: 120, height: 120, }} resizeMode='cover'
            />
        </Pressable>
    )
}