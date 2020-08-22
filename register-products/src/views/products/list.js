import React from 'react'
import ProductService from '../../app/productService'
import { withRouter } from 'react-router-dom'

class ListProducts extends React.Component{

    state = {
        products : []
    }

    constructor(){
        super()
        this.service = new ProductService()
    }

    componentDidMount(){
        const products = this.service.list()
        this.setState({ products : products })
    }

    preEdit = (sku) => {
        console.log("sku to edit: " , sku)
        this.props.history.push(`/regist-products/${sku}`)
    }

    delete = (sku) => {
        const products = this.service.delete(sku)
        this.setState({ products : products })
    }

    render(){
        return(
        <div className="card">
            <div className="card-header">
                List Products
            </div>    
            <div className="card-body">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>SKU</th>
                            <th>Price</th>
                            <th>Suplier</th>
                            <th></th>
                        </tr>
                    </thead>
                
                    <tbody>
                        {
                            this.state.products.map( (product , index) => {
                                return(
                                    <tr key={index}>
                                    <th>{product.name}</th>
                                    <th>{product.sku}</th>
                                    <th>{product.price}</th>
                                    <th>{product.suplier}</th>
                                    <th>
                                        <button onClick={ () => this.preEdit(product.sku) } className="btn btn-primary">Edit</button>
                                        <button onClick={ () => this.delete(product.sku) } className="btn btn-danger">Delete</button>
                                    </th>
                                </tr>
                                )
                            })
                        }
                    </tbody>   
                </table>
            </div>  
        </div>
        )
    }
}

export default withRouter(ListProducts)