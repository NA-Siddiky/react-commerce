import React from 'react';

const ReviewItem = (props) => {
    // console.log(props);
    const { name, quantity } = props.product;
    const reviewItemStyle ={
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '30px'

    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h5>{name}</h5>
            <p>Quantity: {quantity}</p>
            <button className ="main-button">Remove</button>
        </div>
    );
};

export default ReviewItem;