import * as React from 'react';
import { View, Text, AsyncStorage,Image,Dimensions,FlatList } from 'react-native';
import { setOutForDeliveryOrders } from '../../redux/consumer/actions/orders';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import OrderCard from './ConsumerComponents/OrderCard';

const {height,width} = Dimensions.get('window')

function OutForDelivery(props) {

    const [loading,setLoading] = React.useState(true);
    const [orders,setOrders] = React.useState([])
    const [token,setToken] = React.useState(null)

    const getOrders = async() => {
        setLoading(true)
        var token = await AsyncStorage.getItem('user_token')
        setToken(token);
        await props.setOutForDeliveryOrders(token)
        await setOrders(props.orders.outForDelivery)
        console.log(orders,'allOrders',props.orders.outForDelivery)
        setLoading(false)
    }

    React.useEffect(() => {
        getOrders()
    },[])

    React.useEffect(() => {
        setLoading(true);
        setOrders(props.orders.outForDelivery)
        setLoading(false);
    },[props.orders.outForDelivery])

    return (
        <View style={{flex:1}}>
            {
                loading ?
                <View style={{backgroundColor:'white',flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('../../images/l2.gif')} resizeMode='contain' style={{width:width}} />
                </View>
                :
                <View style={{flex:1,backgroundColor:'white',paddingLeft:5,paddingRight:5,paddingBottom:0}}>
                    <FlatList
                    data={orders}
                    renderItem={({item,index}) => <OrderCard item={item} status="OUT FOR DELIVERY" /> }
                    />
                </View>
            }
        </View>
    )
}

OutForDelivery.propTypes = {
    setOutForDeliveryOrders:PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    orders:state.orders
})

const mapActionsToProps = {
    setOutForDeliveryOrders
}

export default connect(mapStateToProps,mapActionsToProps)(OutForDelivery);