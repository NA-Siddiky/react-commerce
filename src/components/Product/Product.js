import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    // console.log(props);
    const { category, img, name, seller, price, stock } = props.product;
    return (
        <div className="product">
            <div>
                <h3 className="category">{category}</h3>
                <img src={img} alt="" />
            </div>

            <div>
                <h4 className="productName">{name}</h4>
                <br />
                <p><small>By: {seller}</small></p>
                <p>$ {price}</p>
                <br />
                <p><small>Only {stock} Item Left.</small></p>
                <button
                    className="add-button"
                    onClick={() => props.handleAddProduct(props.product)}>
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;