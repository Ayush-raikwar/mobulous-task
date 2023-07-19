import { View, Text, TouchableOpacity, Modal, TextInput, Button, Pressable } from 'react-native'
import React, { useState } from 'react'
import WifiManager from 'react-native-wifi-reborn';

export const WifiListComp = ({ title, strength, ssid }) => {
    const [pass, setPass] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false)

    const handleConnect = () => {
        WifiManager.connectToProtectedSSID(ssid, pass, false, false).then((response) => {
            if (response) {
                console.log('Connected to Wi-Fi network:', ssid);
                Alert('Connected successfully !')
            } else {
                console.log('Failed to connect to Wi-Fi network:', ssid);
            }
            setIsModalVisible(false);
        });
        // console.log(ssid, pass);
    };

    return (
        <>
            <TouchableOpacity
                style={{ flex: 1, alignItems: 'center', marginBottom: 22 }}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={{ color: 'black' }}>{title}</Text>
                <Text >Signal Strength : {strength}</Text>
            </TouchableOpacity>
            {
                isModalVisible &&
                <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)}>
                    <View style={{ backgroundColor: 'rgba(0,0,0,.2)', padding: 22, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text>Enter Wi-Fi Password for {ssid}</Text>
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={pass}
                            onChangeText={(text) => setPass(text)}
                        />
                        <Pressable style={{ padding: 12, backgroundColor: 'skyblue' }} title="Connect" onPress={() => handleConnect()}>
                            <Text>Connect</Text>
                        </Pressable>
                        <Pressable style={{ padding: 12, backgroundColor: 'skyblue' }} title="Cancel" onPress={() => setIsModalVisible(false)} >
                            <Text>Cancel</Text>
                        </Pressable>
                    </View>
                </Modal>
            }
        </>
    )
}
