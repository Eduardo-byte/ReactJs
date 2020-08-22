import React from 'react'

const PRODUCTS = '_PRODUCTS'

export function ErrorValidation(errors){
    this.errors = errors;
}

export default class ProductService{

    validation = (product) => {
        const errors = []

        if(!product.name){
            errors.push("Name field is required")
        }

        let link = window.location.href
            this.list().forEach( (value ,i) => {
                if(value.sku === product.sku && !link.includes("/" + value.sku)){
                    errors.push("SKU field already exists")
                }
            })
        
        if(!product.sku){
            errors.push("SKU field is required")
        }

        if(!product.description){
            errors.push("Description field is required")
        }

        if(!product.price || product.price <= 0){
            errors.push("Price field needs to be bigger than zero(0)")
        }

        if(!product.suplier){
            errors.push("Suplier field is required")
        }

        if(errors.length > 0){
            throw new ErrorValidation(errors)
        }
    }


    list = (product) => {
        const products = localStorage.getItem(PRODUCTS)
        if(!products){
            return []
        }
        return JSON.parse(products)
    }

    getIndex = (sku) => {
        let index = null;
        if(this.list.length > 0){
            this.list().forEach( (product ,i ) => {
                if(product.sku === sku){
                    index = i;
                }
            })
        }
        return index;
    }

    delete = (sku) => {
        const index = this.getIndex(sku)
        if(index !==null){
            const products = this.list()
            products.splice(index , 1)
            localStorage.setItem(PRODUCTS , JSON.stringify(products))
            return products
        }
    }

    save = (product) => {
            this.validation(product)
            let products = localStorage.getItem(PRODUCTS)
            
            if (!products) {
                products = []
            }else{
                products = JSON.parse(products)
            }
    
            const index = this.getIndex(product.sku)
    
            if (index === null){
                products.push(product);
            }else{
               products[index] = product;
            }
            localStorage.setItem(PRODUCTS , JSON.stringify(products))
            
        }
        
}