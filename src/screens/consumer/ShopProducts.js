import * as React from 'react';
import { View, Text, AsyncStorage,Dimensions,Image,FlatList,StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './ConsumerComponents/Header';
import axios from 'axios';
import { url } from '../../api/api';
import ProductCard from './ConsumerComponents/ProductCard';

const {height,width} = Dimensions.get('window')

function ShopProducts(props) {
    const shop = props.route.params.shop
    const [loading,setLoading] = React.useState(true);
    const [products,setProducts] = React.useState([])
    const [error,setError] = React.useState('');
    const [userToken,setuserToken] = React.useState(null)

    const getShopProducts = async() => {
        const shop = props.route.params.shop
        console.log(shop)
        var token = await AsyncStorage.getItem('user_token')
        setuserToken(token)
        setLoading(true)
        axios.get(`${url}/consumer/${shop.shop_id}/products`,{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            setProducts(res.data)
            setLoading(false);
        })
        .catch(err => {
            setError('Error')
            setLoading(false);
        })
    }

    React.useEffect(() => {
        getShopProducts();
    },[])

    return (
        <View style={{flex:1}}>
            <StatusBar backgroundColor="#ff6347" />
            <Header backgroundColor='#ff6347' header={shop.shop_name} height={55} width={width} />
            {
                loading ?
                <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../images/l2.gif')} resizeMode='contain' style={{width:width}} />
                </View>
                :
                <View style={{flex:1,backgroundColor:'white'}}>
                    <FlatList
                    data={products}
                    renderItem={({item,index}) => <ProductCard item={item} token={userToken} /> }
                    />
                </View>
            }
        </View>
    )
}

export default ShopProducts;