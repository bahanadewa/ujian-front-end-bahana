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
import { urlAPI } from '../../support/urlAPI';
import {Button,Icon,Input,Label} from 'semantic-ui-react';
import swal from "sweetalert";
import {connect} from 'react-redux'
import PageNotFound from '../pageNotFound'


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
        Axios.get(urlAPI+'/products')
        .then ((res)=> this.setState({rows : res.data}))
        .catch((err)=> console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  onBtnDelete = (id)=>{
        Axios.delete(urlAPI+'/products/'+id)
        .then((res)=>{
            this.getDataApi()
        })
        .catch((err)=> console.log(err))
  }

  onBtnAdd = ()=>{
    var nama = this.nama.inputRef.value;
    var harga = parseInt(this.harga.inputRef.value);
    var kategori = this.kategori.inputRef.value;
    var discount = parseInt(this.discount.inputRef.value);
    var deskripsi = this.deskripsi.inputRef.value;
    var img = this.img.inputRef.value;


    // property harus sesuai dengan db.json (property : variabel)
    // post res.data (objek)
    // get res.data (arr of objek) 
    var newData={nama:nama , harga:harga, kategori:kategori, discount:discount, deskripsi:deskripsi , img:img}

    if (nama === "" | harga ==="" |kategori ==="" |discount===""|deskripsi==="" | img===""){
      swal({
        title: "try again!",
        icon: "error",
      });
        alert("HARUS DI ISI")
    }else{
         Axios.post(urlAPI+'/products',newData)
         
         .then((res)=>{
              {
                swal({
                  title: "Add product",
                  text: "add product success",
                  icon: "success",
                });
              this.getDataApi()
            } 
         })
         .catch((err)=> console.log(err))
            this.nama.inputRef.value = ""
            this.harga.inputRef.value =""
            this.kategori.inputRef.value =""
            this.discount.inputRef.value =""
            this.deskripsi.inputRef.value =""
            this.img.inputRef.value=""
    }
  }

  onBtnEditClick = (param) =>{
      this.setState({isEdit:true, editItem : param})
  }

  onBtnCancel = (param) =>{
    this.setState({isEdit:false , editItem:param})
  }

  onBtnSave = ()=>{
    var nama = this.namaEdit.inputRef.value ===""? this.state.editItem.nama: this.namaEdit.inputRef.value ;
    var harga = this.hargaEdit.inputRef.value  ===""? this.state.editItem.harga: this.hargaEdit.inputRef.value;
    var kategori = this.kategoriEdit.inputRef.value  ===""? this.state.editItem.kategori: this.kategoriEdit.inputRef.value;
    var discount = this.discountEdit.inputRef.value  ===""? this.state.editItem.discount: this.discountEdi.inputRef.value;
    var deskripsi = this.deskripsiEdit.inputRef.value  ===""? this.state.editItem.deskripsi: this.deskripsiEdit.inputRef.value;
    var img = this.imgEdit.inputRef.value  ===""? this.state.editItem.img: this.imgEdit.inputRef.value;

    var newData = {
      nama : nama,
      harga : harga,
      kategori :kategori,
      discount : discount,
      deskripsi : deskripsi,
      img : img
    }
    Axios.put(urlAPI+'/products/'+this.state.editItem.id, newData)
    .then((res) =>{
        this.getDataApi()
        swal('edit status','edit product success','success')
        this.setState({isEdit:false, editItem: {}})
    })
    .catch ((err) => {console.log(err)})
  }


  renderJsx =()=>{
      var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val)=>{
          return(
            <TableRow key = {val.id}>
                <TableCell component="th" scope="row">
                    {val.id}
                </TableCell>
                <TableCell align="">{val.nama}</TableCell>
                <TableCell align="">Rp {val.harga}</TableCell>
                <TableCell align="">{val.kategori}</TableCell>
                <TableCell align="">{val.discount}</TableCell>
                <TableCell align="">{val.deskripsi}</TableCell>
                <TableCell align=""><img src={val.img} width="50px"/></TableCell>
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




  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    var {nama, harga,kategori, discount, deskripsi, img}= this.state.editItem
    if (this.props.role === "admin")
    {
    return (
        <div className="container">
                <Paper className={classes.root}>
                    <div className={classes.tableWrapper}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>ID</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>Nama</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>HARGA</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>CAT</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>DISC</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>DESC</TableCell>
                                    <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>IMG</TableCell>
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
                 {/* ========================================== ADD PRODUCT SECTION ================================================== */}
                <Paper className="mt-5">
                    <Table>
                        <TableHead>
                            <TableRow>
                            <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>ADD PRODUCT</TableCell>
                            </TableRow>

                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Input ref={input => this.nama=input} placeholder="masukan nama product" className="mt-2 ml-2 mb-2" />

                                        <Input ref={input => this.harga=input} className="ml-2" labelPosition='right' type='text' placeholder='Amount'>
                                            <Label basic> Rp </Label>
                                            <input />
                                            <Label>.00</Label>
                                        </Input>

                                        <Input ref={input => this.kategori=input} placeholder="kategoti" className="mt-2 ml-2 mb-2" />
                                        <Input ref={input => this.discount=input} placeholder="Discount" className="mt-2 ml-2 mb-2" />
                                        <Input ref={input => this.deskripsi=input} placeholder="Deskripsi" className="mt-2 ml-2 mb-2" />
                                        <Input ref={input => this.img=input} placeholder="Img" className="mt-2 ml-2 mb-2" />


                                        <Button animated color="red" className="mt-2 ml-2 mb-2"   onClick={this.onBtnAdd}>
                                            <Button.Content visible>add product</Button.Content>
                                            <Button.Content hidden>
                                                <Icon name='add' />
                                            </Button.Content>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>

                        </TableHead>  
                    </Table>
                </Paper>
                {/* ========================================== EDIT PRODUCT SECTION ================================================== */}
                {
                  this.state.isEdit === true ?
                  <Paper className="mt-5">
                      <Table>
                          <TableHead>
                              <TableRow>
                              <TableCell style={{fontSize :'24px',fontWeight:"600px"}}>EDIT PRODUCT{" "+nama}</TableCell>
                              </TableRow>

                              <TableBody>
                                  <TableRow>
                                      <TableCell>
                                          <Input ref={input => this.namaEdit=input} placeholder={nama} className="mt-2 ml-2 mb-2" />

                                          <Input ref={input => this.hargaEdit=input} className="ml-2" labelPosition='right' type='text' placeholder={harga}>
                                              <Label basic> Rp </Label>
                                              <input />
                                              <Label>.00</Label>
                                          </Input>

                                          <Input ref={input => this.kategoriEdit=input} placeholder={kategori} className="mt-2 ml-2 mb-2" />
                                          <Input ref={input => this.discountEdit=input} placeholder={discount} className="mt-2 ml-2 mb-2" />
                                          <Input ref={input => this.deskripsiEdit=input} placeholder={deskripsi} className="mt-2 ml-2 mb-2" />
                                          <Input ref={input => this.imgEdit=input} placeholder="Img" className="mt-2 ml-2 mb-2" />


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
    role : state.user.role
  }
}



export default connect(mapStateToProps) (withStyles(styles)(CustomPaginationActionsTable));