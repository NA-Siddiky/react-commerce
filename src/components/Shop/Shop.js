import React, { useState } from 'react';
import fakeData from '../../fakeData'
import './Shop.css'

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0, 10);

    const [product, setProduct] = useState(first10)

    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {
                        product.map(product => <li>{product.name}</li>)
                    }
                </ul>
            </div>
            <div className="cart-container">
                <h3>This is Cart</h3>
            </div>
        </div>
    );
};

export default Shop;