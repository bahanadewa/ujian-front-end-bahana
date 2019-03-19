import axios from 'axios'
import cookies from 'universal-cookie';
import {urlAPI} from '../support/urlAPI'

const objCookie = new cookies()

export const onLogin = (paramsusername,paramspassword) => {
    return(dispatch)=>{
        // INI UNTUK MENGUBAH LOADING MENJADI TRUE
        dispatch({
            type: "LOADING", 
        })

        // GET DATA DARI FAKE API JSON SERVER
    axios.get( urlAPI + '/user',{params:{username : paramsusername, password :paramspassword}})

        // KALO BERHASIL NGE GET DIA MASUK THEN
        .then ((res) => {
            console.log(res)

        // IF USERNAME DAN PASWORD SESUAI MAKA ISI RES.DATA ADA ISINYA
            if (res.data.length > 0){
                dispatch(
                    {
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        username : res.data[0].username,
                        role : res.data[0].role,
                        id : res.data[0].id
                    }
                    }
                ) 
            }else{
                dispatch({
                    type : 'USER_NOT_FOUND'
                })
            }  
        })

        .catch ((err) => {
            dispatch ({
                type : 'SISTEM_ERROR'
            }) 
        })
    }
}

export const keepLogin = (cookie)=>{
    return(dispatch) => {
        axios.get(urlAPI + '/user',{params :{username : cookie}})
        .then ((res)=> {
            if (res.data.length >0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        username : res.data[0].username,
                        role : res.data[0].role,
                        id : res.data[0].id
                    }
                })
            }
        })

        .catch((err)=> console.log(err))
    }
}

export const resetuser = () =>{
    return{
        type : "RESET_USER"
    }
}

export const userRegister = (a,b,c,d) =>{
    return (dispatch)=>{
        dispatch ({
            type : 'LOADING'
        })
        var newdata = {username : a, password :b , email : c, phone : d}
        axios.get( urlAPI + '/user?username='+ newdata.username)
        .then ((res) => {
            if (res.data.length > 0){
                dispatch ({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            } else {
                axios.post(urlAPI + '/user', newdata)
                .then ((res)=> dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : a
                },
                    objCookie.set('userData',a,{path :'/'})
                ))
                .catch ((err)=> console.log(err))
            }
        })

        .catch ((err) => {
            dispatch ({
                type : 'SISTEM_ERROR'
            })
        })

    }
}

export const loginWithGoogle= (email)=>{
    return (dispatch)=>{
        axios.get(urlAPI+'/user?username='+email)
        .then((res)=> {
            if (res.data.length >0){
                dispatch({
                    type :'LOGIN_SUCCESS',
                    payload : res.data[0]
                },
                    objCookie.set('userData',email,{path :'/'})
                )
            }else {
                axios.post(urlAPI+'/user',{username : email, role : "user"})
                .then((res)=>{
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    })
                },
                    objCookie.set('userData',email,{path :'/'})
                )
                .catch((err)=>{
                    console.log(err)
                })
            }
        })
        .catch((err)=> {console.log(err)

        })
    }
}
