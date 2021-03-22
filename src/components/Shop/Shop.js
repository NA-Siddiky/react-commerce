import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // console.log(fakeData);
    const first10 = fakeData.slice(0, 10);

    const [product, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        });

        setCart(previousCart);
    }, []);

    const handleAddProduct = (product) => {
        // console.log('added', product.name);
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(PD => PD.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(PD => PD.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
            {
                product.length === 0 && <p>loading...</p>
            }
                {
                    product.map(PD => <Product
                        key={PD.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct}
                        product={PD}>
                    </Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'>
                        <button className="add-button">Review Order</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;