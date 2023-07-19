import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from '../../redux/actions';
import { CardList } from '../../components/card-list/CardList';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export const Home = ({ navigation }) => {

    const data = useSelector((state) => state.data.data);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    // console.log(data);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos?_limit=18');
            dispatch(setData(response.data));
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error fetching data:', error);
        }
    };

    return (
        <View>
            <Text>Home</Text>
            {loading ?
                <>
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{ height: 200, alignSelf: 'center', marginVertical: 12 }}
                    />
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{ height: 200, alignSelf: 'center', marginVertical: 12 }}
                    />
                    <ShimmerPlaceholder
                        LinearGradient={LinearGradient}
                        style={{ height: 200, alignSelf: 'center', marginVertical: 12 }}
                    />
                </>
                :
                <FlatList
                    data={data}
                    contentContainerStyle={{ alignItems: 'center' }}
                    renderItem={({ item }) => {
                        return (
                            <CardList ontouch={() => navigation.navigate('WifiList')} url={item?.url} title={item?.title} />
                        )
                    }}
                />
            }

        </View >
    )
}
