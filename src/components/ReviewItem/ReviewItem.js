import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const { name, quantity, key } = props.product;
    const reviewItemStyle ={
        borderBottom: '1px solid lightgray',
        marginBottom: '15px',
        paddingBottom: '15px',
        marginLeft: '100px'

    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h5>{name}</h5>
            <p>Quantity: {quantity}</p>
            <button 
            className ="add-button"
            onClick={() => props.removeProduct(key)}
            >
            Remove Item
            </button>
        </div>
    );
};

export default ReviewItem;