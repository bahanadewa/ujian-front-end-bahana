import React from 'react'
import Axios from 'axios'
import { urlAPI } from '../support/urlAPI';
import {connect} from 'react-redux';

class ProductDetail extends React.Component{
    state = {product : {}}
    componentDidMount(){
        this.getDataApi()
    }

    getDataApi = ()=>{
        
        var idUrl = this.props.match.params.id
    
        Axios.get(urlAPI+'/products/'+idUrl)
        .then((res)=>{
            this.setState({product : res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    onChange =()=>{
        if (this.refs.number.value <0  ){
           alert ('tidak boleh kurang dari nol')
           this.refs.number.value = 0
        } 
    }
    
    render(){
        var {nama, img, discount, deskripsi,harga} = this.state.product
        return(
            <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                                <div className="card" style={{width: '100%'}}>
                                    <img src={img} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                    
                                    </div>
                                </div>
                        </div>
                        <div className="col-md-8">
                                <h1 style={{color:"#4C4C4C"}}> {nama} </h1>

                                <div style={{backgroundColor:'#D63E2A', 
                                            width:"50px", 
                                            height:"22px",
                                            color:"white", 
                                            textAlign:"center",
                                            display:"inline-block"}}> {discount} % </div>

                                <span style={{fontSize:"12px",
                                            fontWeight:"600px",
                                            color:"#606060",
                                            marginLeft:"10px",
                                            textDecoration:"line-through"}}> Rp {harga}  </span>

                                <div style={{fontWeight:'700',
                                            fontSize :'24px',
                                            color:"#FF5722",
                                            marginTop:'20px'}}> Rp {harga - (harga*(discount/100))} </div>
                                
                                <div className="row">
                                        <div className="col-md-2">
                                                <div style={{marginTop:'10px',
                                                    color:'#606060',
                                                    fontWeight:'700'}}> jumlah </div>
                                                <input type="number" min={0} className="form-control" style={{width:"60px",marginTop:'13px'}} onChange={this.onChange} ref="number" />
                                        </div>
                                        <div className="col-md-6">
                                                <div style={{marginTop:'10px',
                                                            color:'#606060',
                                                            fontWeight:'700'}}> Catatan untuk penjual (opsional)</div>
                                                <input type="text" className="form-control" style={{marginTop:'13px'}} placeholder="contoh warna putih ukuran xl,edisi ke 2" />
                                        </div>
                                </div>

                                <div className="row mt-4">
                                    <div className="col-md-8" style={{color:'#606060', fontStyle:'italic'}}>
                                        <p> {deskripsi} </p>
                                    </div>    
                                </div>


                                { this.props.nama ===""?
                                    <div className="row mt-4">
                                <input className="btn border-primary col-md-3"  disabled value="wishlist" />
                                <input className="btn btn-primary col-md-3" disabled value="beli sekarang" />
                                <input className="btn btn-success col-md-3" disabled value="masukan ke keranjang" />
                                    </div>
                                :
                                <div className="row mt-4">
                                        <input className="btn border-primary col-md-3"  value="wishlist" />
                                        <input className="btn btn-primary col-md-3" value="beli sekarang" />
                                        <input className="btn btn-success col-md-3" value="masukan ke keranjang" />
                                </div>
                                }
                                
                        </div>
                    </div>
                    




            </div>
        )
    }
}
const  mapStateToProps =(state)=>{
    return {
        nama : state.user.username,
        role : state.user.role
    }
}

export default connect (mapStateToProps)(ProductDetail);