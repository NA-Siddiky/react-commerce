import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    // const total = cart.reduce((total, product) => total + product.price, 0)

    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price;
    }

    let shipping = Math.round(0);
    if (total > 35) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 9.99
    }

    const tax = Math.round(total / 10);

    const numberFormatters = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4>Order Summery</h4>
            <p> Item Ordered: {cart.length}</p>
            <p>Product Price: {numberFormatters(total)}</p>
            <p><small> Shipping: {shipping}</small></p>
            <p><small> TAX: {tax}</small></p>
            <p>Total Price: {total + shipping}</p>
        </div>
    );
};

export default Cart; <h4>Order Summery</h4>