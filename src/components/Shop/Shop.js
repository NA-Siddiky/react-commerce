import React, { useState } from 'react';
import fakeData from '../../fakeData'
import { addToDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0, 10);

    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        // console.log('added', product.name);
        const newCart = [...cart, product];
        setCart(newCart);
        const sameProduct = newCart.filter(PD => PD.key === product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    product.map(PD => <Product
                        key = {PD.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={PD}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                {/* <h3>This is Cart</h3>
                <h5>Order Summery: {cart.length}</h5>
                 */}

                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;