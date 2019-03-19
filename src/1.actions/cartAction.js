import Axios from 'axios'
import cookies from 'universal-cookie';
import swal from 'sweetalert'
import {urlAPI} from '../support/urlAPI'

var objCookie = new cookies()
export const addcartglobal =(newdata)=>{
    return (dispatch)=> {
        Axios.get(urlAPI+'/cart?idUser='+newdata.idUser+"&productID="+newdata.productID)
        .then((res)=>{
            if (res.data.length>0){
                var quantity = res.data[0].quantity+newdata.quantity
                Axios.put(urlAPI+'/cart/'+res.data[0].id,{...newdata,quantity })
                swal('added','add product success','success')
                        .then((ress)=>{
                            Axios.get(urlAPI+'/cart?idUser='+newdata.idUser)
                                    .then((res)=>{
                                            if (res.data.length>0){
                                                dispatch({
                                                    type : "CART_SAVE",
                                                    payload : res.data
                                                })
                                            }
                                    })
                                    .catch((err)=>{
                                        console.log(err)
                                    })
                                    objCookie.set('cookieCart', newdata.idUser, {path:'/'})
                        })
                        .catch((err)=>{
                            console.log(err)
                        })

            }else{
                Axios.post(urlAPI+'/cart',newdata)
                    .then((res)=>{
                        Axios.get(urlAPI+'/cart?idUser='+newdata.idUser)
                        .then((res)=>{
                            if (res.data>0){
                                dispatch({
                                    type : "CART_SAVE",
                                    payload : res.data
                                })
                            }
                        })
                        .catch((res)=>{

                        })
                    })
                    .catch((err)=>{
                        console.log(err)
                    })
                    objCookie.set('cookieCart', newdata.idUser, {path:'/'})
            }
        })
        .catch((err)=>{
                console.log(err)
        })
    }
        
}


export const keepLoginCart = (idUser) => {
    return(dispatch)=>{
        Axios.get(urlAPI+'/cart?idUser='+idUser)
        .then((res)=>{
            dispatch ({
                type : "CART_SAVE",
                payload : res.data
            })

        })
        .catch((err)=>{
            console.log(err)
        })
    }
}


export const iconCart = (param) =>{
    return{
        type : "ICON_CART",
        payload : param
    }
}