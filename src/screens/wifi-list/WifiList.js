import { View, Text, Platform, PermissionsAndroid, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import WifiManager from 'react-native-wifi-reborn';
import { WifiListComp } from '../../components/wifi-list-comp/WifiListComp';
export const WifiList = () => {

    const [networks, setNetworks] = useState([]);
    useEffect(() => {
        if (Platform.OS === 'android') {
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(val => console.log(val))
        }
        // WifiManager.loadWifiList().then((wifilist) => {
        //     // console.log(wifilist);
        //     setWifiList(wifiList);
        // });

        WifiManager.loadWifiList().then((wifiList) => {
            const sortedNetworks = wifiList.sort((a, b) => b.level - a.level);
            setNetworks(sortedNetworks);
        });

        // return () => {
        //     WifiManager.stopMonitoring();
        // };
    }, [])




    return (
        <View>
            <Text>WifiList</Text>
            {/* {networks.map((network) => (
                <Text key={network.SSID}>{network.SSID}</Text>
            ))} */}
            <FlatList
                data={networks}
                renderItem={({ item }) => <WifiListComp ssid={item?.SSID} key={item?.BSSID} title={item?.SSID} strength={item?.level} />}
            />
        </View>
    )
}
