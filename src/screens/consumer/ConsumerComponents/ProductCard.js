import * as React from 'react';
import axios from 'axios'
import { View, Text, AsyncStorage,Dimensions,Image ,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
import { url } from '../../../api/api';
import { addToCart , removeFromCart} from '../../../redux/consumer/actions/cartActions';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'

const {height,width} = Dimensions.get('window')

function ProductCard({item,token,addToCart,removeFromCart}) {
    const navigation = useNavigation();
    const [quantity,setQuantity] = React.useState(0);

    const addProductToCart = () => {
        //addToCart(item);
        setQuantity(quantity+1)
        axios.get(`${url}/consumer/cart/${item.product_id}`,{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            addToCart(res.data);
        })
    }

    const subtractFromCart = () => {
        removeFromCart(item);
        setQuantity(quantity-1)
        axios.delete(`${url}/consumer/cart/${item.product_id}`,{
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
        })
    }

    return (
        <TouchableWithoutFeedback>
            <View style={{marginLeft:7.5,marginRight:7.5,padding:15,borderBottomWidth:0.5,marginBottom:5,borderColor:'#101010'}}>
            <View style={{flexDirection:'row'}}>
                <Image source={{uri:item.product_image}} resizeMode='contain' style={{height:width/3.25,width:width/3.25,borderRadius:15,marginRight:15}} />
                <View style={{paddingTop:9,flex:1}}>
                    <Text numberOfLines={2} style={{fontSize:21,color:'#101010',fontFamily:'Montserrat-medium',textTransform:'capitalize'}}>{item.product_name}</Text>
                    <Text style={{fontSize:16.5,marginLeft:0,paddingTop:5,textTransform:'capitalize'}}>Price Rs: {item.product_price}</Text>
                    <Text style={{fontSize:16.5,marginLeft:0,paddingTop:5,textTransform:'capitalize'}}>{item.product_type}</Text>
                </View>
            </View>
            <View style={{marginTop:9,flex:1,alignItems:'flex-end'}}>
                <View>
                    {
                        quantity===0 ?
                        <TouchableWithoutFeedback onPress={addProductToCart}>
                            <View style={{paddingLeft:15,paddingRight:15,padding:5,backgroundColor:'#ff6347',borderRadius:9}}>
                                <Text style={{color:'white',fontSize:16.5}}>Add</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        :
                        <View style={{flexDirection:'row'}}>
                            <TouchableOpacity onPress={subtractFromCart} style={{alignItems:'center',marginRight:5,width:32.5,justifyContent:'center',padding:9,borderRadius:15,backgroundColor:'#ff6347',height:32.5}}>
                                <Text style={{fontSize:27,lineHeight:32.5,color:'white',alignSelf:'center'}}>-</Text>
                            </TouchableOpacity>
                            <View style={{alignItems:'center',justifyContent:'center',marginRight:5,padding:9,borderRadius:15,backgroundColor:'white',height:32.5}}>
                                <Text style={{fontSize:18.5,lineHeight:32.5,color:'black',alignSelf:'center'}}>{quantity}</Text>
                            </View>
                            <TouchableOpacity onPress={addProductToCart} style={{alignItems:'center',justifyContent:'center',padding:9,borderRadius:15,backgroundColor:'#ff6347',height:32.5}}>
                                <Text style={{fontSize:27,lineHeight:32.5,color:'white',alignSelf:'center'}}>+</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

ProductCard.propTypes = {
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    latlng:state.latlng
})

const mapActionsToProps = {
    addToCart,
    removeFromCart
}

export default connect(mapStateToProps,mapActionsToProps)(ProductCard);