import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import { urlAPI } from '../support/urlAPI';
import {Button,Icon,Input,Label} from 'semantic-ui-react';
import swal from "sweetalert";
import {connect} from 'react-redux'
import PageNotFound from './pageNotFound'
import cookie from 'universal-cookie'
import {iconCart} from '../1.actions'




const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const objcookie = new cookie()

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {}
  };

  componentDidMount(){
        this.getDataApi()
  }

  getDataApi = () =>{
        var getcookie = objcookie.get('userData')
        Axios.get(urlAPI+'/cart?namaUser='+getcookie)
        .then ((res)=> {
          this.setState({rows : res.data})
          var a = this.state.rows.length
          this.props.iconCart(a)  
        })
        .catch((err)=> console.log(err))
        
        
        
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  onBtnDelete = (id)=>{
        Axios.delete(urlAPI+'/cart/'+id)
        .then((res)=>{
            this.getDataApi()
        })
        .catch((err)=> console.log(err))
  }

 
  onBtnEditClick = (param) =>{
      this.setState({isEdit:true, editItem : param})
  }

  onBtnCancel = (param) =>{
    this.setState({isEdit:false , editItem:param})
  }

  onBtnSave = ()=>{
    var namaUser = this.state.editItem.namaUser
    var product = this.state.editItem.product
    var idUser = this.state.editItem.idUser
    var harga = this.state.editItem.harga
    var kategori =this.state.editItem.kategori
    var discount = this.state.editItem.discount
    var deskripsi = this.state.editItem.deskripsi
    var productID = this.state.editItem.productID
    var img = this.state.editItem.img

    var qty = this.qtyEdit.inputRef.value  ===""? this.state.editItem.quantity: parseInt(this.qtyEdit.inputRef.value);

    var newData = {
      namaUser : namaUser,
      product : product,
      harga : harga,
      kategori :kategori,
      discount : discount,
      deskripsi : deskripsi,
      img : img,
      idUser : idUser,
      productID : productID,
      quantity : qty
    }
    Axios.put(urlAPI+'/cart/'+this.state.editItem.id,newData)
    .then((res) =>{
        this.getDataApi()
        swal('edit status','edit product success','success')
        this.setState({isEdit:false, editItem: {}})
    })
    .catch ((err) => {console.log(err)})
  }


  checkout = () => {
    var getcookie = objcookie.get('userData')
    
    Axios.get(urlAPI+'/cart?idUser'+getcookie)
      .then((res)=>{
        for (var i=0; i<this.state.rows.length ; i++){
          var date = new Date()
          
          // var year = date.getFullYear()

          var idUser = res.data[i].idUser
          var namaUser = res.data[i].namaUser
          var product = res.data[i].product
          var harga = res.data[i].harga
          var kategori = res.data[i].kategori
          var deskripsi = res.data[i].deskripsi
          var img = res.data[i].img
          var productID = res.data[i].productID
          var quantity = res.data[i].quantity
          var newpost = {date,idUser,namaUser,product,harga,kategori,deskripsi,img,productID,quantity}
          Axios.post(urlAPI+'/history',newpost)
            .then ((res)=>{
              swal('Check Out','Check Out success','success')
            })
            .catch((err)=>{
              console.log(err)
            })

            Axios.delete(urlAPI+'/cart/'+this.state.rows[i].id)
                .then ((res)=>{
                  swal('keranjang kosong','keranjang kosong','success')
                  this.getDataApi()
                })
                .catch((err)=>{
                  swal('kerjanjang kosong','keranjang kosong','success')
                })
        }
         
           
      })
      .catch((res)=>{
        
      })
  }


  renderJsx =()=>{
      var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val)=>{
          return(
            <TableRow key = {val.id}>
                <TableCell component="th" scope="row">
                    {val.id}
                </TableCell>
                <TableCell align="">{val.product}</TableCell>
                <TableCell align="">{val.kategori}</TableCell>
                <TableCell align="">{val.deskripsi}</TableCell>
                <TableCell align=""><img src={val.img} width="50px"/></TableCell>
                <TableCell align="">{val.harga}</TableCell>
                <TableCell align="">{val.quantity}</TableCell>
                <TableCell align="">Rp {val.harga*val.quantity}</TableCell>
                <TableCell>
                        <Button onClick={()=>this.onBtnEditClick(val)} animated color="teal">
                            <Button.Content visible>Edit</Button.Content>
                            <Button.Content hidden>
                                <Icon name='edit' />
                            </Button.Content>
                        </Button>

                        <Button animated color="red" onClick={()=>this.onBtnDelete(val.id)}>
                            <Button.Content visible>Delete</Button.Content>
                            <Button.Content hidden>
                                <Icon name='delete' />
                            </Button.Content>
                        </Button>
                </TableCell>
            </TableRow>
          )
      })
      return jsx
    }; 

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };


  totalcheckout =()=>{
    var item = this.state.rows.length
    var total = 0
    

    for (var i=0 ; i<item ; i++){
        var totalhargabelanja =  this.state.rows[i].harga*this.state.rows[i].quantity
        total += totalhargabelanja
    }
    return total
  }




  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    var {product, harga,kategori, discount, deskripsi, img, quantity}= this.state.editItem
    if (this.props.role === "user" | this.props.role === "admin") 
    {
    return (
        <div className="container">
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>ID</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>PRODUCT</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}> KATEGORI </TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>DESKRIPSI</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>IMG</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}> HARGA </TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>QTY</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}> TOTAL </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.renderJsx()}
                          
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )}
                            </TableBody>
                            <TableFooter>
                            <TableRow>
                                <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                colSpan={3}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </Paper>
                {/* ========================================== CHECKOUT ================================================== */}

                {
                  <Paper className="mt-5">
                      <Table>
                          <TableHead>

                              <TableBody>
                                  <TableRow>
                                          <TableCell style={{fontSize :'24px',fontWeight:"600px"}}> Total belanja anda </TableCell>
                                          <TableCell style={{fontSize :'24px',fontWeight:"600px"}}> Rp {this.totalcheckout()} </TableCell>

                                          <Button onClick={this.checkout} animated color="blue" className="ml-auto mt-2" >
                                              <Button.Content style={{width:"400px", position:"center"}}  visible> CHECKOUT </Button.Content>
                                              <Button.Content hidden>
                                                  <Icon name='check' />
                                              </Button.Content>
                                          </Button>
                                 
                                  </TableRow>
                              </TableBody>

                          </TableHead>  
                      </Table>
                  </Paper>
                }

                
                {/* ========================================== EDIT PRODUCT SECTION ================================================== */}
                {
                  this.state.isEdit === true ?
                  <Paper className="mt-5">
                      <Table>
                          <TableHead>
                              <TableRow>
                              <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>EDIT PRODUCT{" "+quantity}</TableCell>
                              </TableRow>

                              <TableBody>
                                  <TableRow>
                                      <TableCell>
                                          

                                          <Input ref={input => this.qtyEdit=input} placeholder={quantity} className="mt-2 ml-2 mb-2" />
                                          

                                          <Button onClick={this.onBtnSave} animated color="teal" className="mt-2 ml-2 mb-2" >
                                              <Button.Content visible>Save</Button.Content>
                                              <Button.Content hidden>
                                                  <Icon name='save' />
                                              </Button.Content>
                                          </Button>
                                          <Button onClick={this.onBtnCancel} animated color="red" className="mt-2 ml-2 mb-2" >
                                              <Button.Content visible>cancel</Button.Content>
                                              <Button.Content hidden>
                                                  <Icon name='cancel' />
                                              </Button.Content>
                                          </Button>
                                      </TableCell>
                                  </TableRow>
                              </TableBody>

                          </TableHead>  
                      </Table>
                  </Paper>
                  : null
                }
        </div>
      
    );
    } return <PageNotFound/>
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return{
    role : state.user.role,
    cart : state.cart.cart
  }
}


export default connect(mapStateToProps,{iconCart}) (withStyles(styles)(CustomPaginationActionsTable));