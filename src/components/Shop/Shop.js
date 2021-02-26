import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0, 10);

    const [product, setProduct] = useState(first10)

    const handleAddProduct = (product)=> {
        console.log('added', product.name);
    }

    return (
        <div className="shop-container">
            <div className="product-container">

                {
                    product.map(PD => 
                    <Product 
                        handleAddProduct= {handleAddProduct}
                        product={PD}>
                    </Product>)
                }

            </div>
            <div className="cart-container">
                <h3>This is Cart</h3>
            </div>
        </div>
    );
};

export default Shop;