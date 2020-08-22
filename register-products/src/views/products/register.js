import React from 'react'
import productService from '../../app/productService'
import {withRouter} from 'react-router-dom'

const initialState = {
    name : '',
    sku : '',
    description : '',
    price : '0',
    suplier : '',
    success : false,
    errors : [],
    updating : false
}

class ProductRegister extends React.Component{

    state = initialState;

    constructor(){
        super()
        this.service = new productService()
    }

    onChange = (event) => {
        const value = event.target.value
        const field = event.target.name
        this.setState({ [field] : value })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const product = {
           name : this.state.name,
           sku : this.state.sku,
           description : this.state.description,
           price : this.state.price,
           suplier : this.state.suplier 
        }
        try{
            this.service.save(product)
            this.cleanFields()
            this.setState({success : true})
            setTimeout(function(){ window.location.reload(); }, 500);
            
        }catch(error){
            const errors = error.errors
            this.setState({errors : errors})
        }
    }

    cleanFields = () => {
        console.log(this.state.errors)
        this.setState(initialState)
    }

    test = (event) => {
        console.log(this.state.errors)
    }

    componentDidMount(){
            const sku = this.props.match.params.sku
            if(sku){
                const result = this.service.list().filter( product => product.sku === sku)
                if(result.length > 0){
                    console.log(result)
                    const foundedProduct = result[0]
                    this.setState({ ...foundedProduct , updating : true })
                }
            }
            //console.log(this.props.location.pathname)
        }

    render(){
        return(
            <div className="card"> 
                <div className="card-header">
                    { this.state.updating ? " Update " : " Regist " }
                    Product
                </div>    
                <div className="card-body">
                    <form id="formProduct" onSubmit={this.onSubmit}>
                        {
                        this.state.success &&
                            <div className="alert alert-dismissible alert-success">
                                <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>Well done!</strong> You successfully saved your product.
                            </div>
                        } 

                        {/*
                        {
                            this.state.success ? (
                                <div class="alert alert-dismissible alert-success">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>Well done!</strong> You successfully saved your product.
                                </div>
                            ) : (
                                <></>
                            ) 
                        }
                        */}
                        
                        {this.state.errors.length > 0 &&
                            this.state.errors.map( (index,i) => {
                                return(
                                    <div key = {i} className="alert alert-dismissible alert-danger">
                                        <button  onClick={this.test} type="reset" className="close" data-dismiss="alert">&times;</button>
                                        <strong>Error!</strong> {index}
                                    </div>
                                )
                            })
                        } 

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Name: *</label>
                                    <input className="form-control" 
                                        onChange={this.onChange} 
                                        name="name" 
                                        value={this.state.name} 
                                        type="text"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>SKU: *</label>
                                    <input className="form-control" 
                                        name="sku" 
                                        disabled={this.state.updating}
                                        onChange={this.onChange} 
                                        value={this.state.sku} 
                                        type="text"/>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description: *</label>
                                    <textarea className="form-control" 
                                            name="description" 
                                            onChange={this.onChange} 
                                            value={this.state.description} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Price: *</label>
                                    <input min="0" 
                                        type="number" 
                                        name="price" 
                                        className="form-control" 
                                        onChange={this.onChange} 
                                        value={this.state.price}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Suplier: *</label>
                                    <input type="text" 
                                        name="suplier" 
                                        className="form-control" 
                                        onChange={this.onChange} 
                                        value={this.state.suplier} />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-1">
                                <button type="submit" className="btn btn-success">
                                { this.state.updating ? "Update" : "Save" }
                                </button>
                            </div>
                            {!this.state.updating ? (
                                <div className="col-md-1">
                                    <button id="clean" type="reset" onClick={this.cleanFields} className="btn btn-primary">Clean</button>
                                </div>
                            ) : (
                                <div className="col-md-1">
                                    <button style={{visibility:"hidden"}} id="clean" type="reset" onClick={this.cleanFields} className="btn btn-primary">Clean</button>
                                </div>
                            )
                            }

                        </div>
                    </form>    
                </div>
            </div>
        )
    }
}

export default withRouter(ProductRegister)