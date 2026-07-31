import { useEffect, useState } from "react";
import API from "../api/api";
import "../css/Cart.css";
import "../css/remove.css";

const USER_ID = "6a6caa518e5dcc43e1fa9917"; // Replace with actual user id

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {

        try {

            const response = await API.get("/cart/user/" + USER_ID);

            setCartItems(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const deleteCart = async (cartId) => {

        try {

            await API.delete("/cart/" + cartId);

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const updateQuantity = async (item, quantity) => {

        if (quantity <= 0) {

            deleteCart(item.id);

            return;

        }

        const cart = {

            userId: item.userId,
            productId: item.productId,
            quantity: quantity

        };

        try {

            await API.put("/cart/" + item.id, cart);

            loadCart();

        } catch (error) {

            console.log(error);

        }

    };

    const totalItems = cartItems.reduce((total, item) => {

        return total + item.quantity;

    }, 0);

    const totalPrice = cartItems.reduce((total, item) => {

        return total + (item.product.price * item.quantity);

    }, 0);

    return (

        <div className="cart-container">

            <h1>My Cart</h1>

            {
                cartItems.length === 0 ?

                    <h2>Your Cart is Empty</h2>

                    :

                    <>
                        {

                            cartItems.map((item) => (

                                <div className="cart-item" key={item.id}>

                                    <img
                                        src={
                                            item.product.imageUrl &&
                                            item.product.imageUrl.trim() !== ""
                                                ? item.product.imageUrl
                                                : "https://placehold.co/150x120?text=No+Image"
                                        }
                                        alt={item.product.productName}
                                    />

                                    <div className="cart-details">

                                        <h2>{item.product.productName}</h2>

                                        <p>{item.product.description}</p>

                                        <h3>₹ {item.product.price}</h3>

                                        <div className="quantity-box">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item, item.quantity - 1)
                                                }
                                            >
                                                -
                                            </button>

                                            <span>{item.quantity}</span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item, item.quantity + 1)
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => deleteCart(item.id)}
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            ))

                        }

                        <div className="cart-summary">

                            <h2>Total Items : {totalItems}</h2>

                            <h2>Total Price : ₹ {totalPrice}</h2>

                        </div>

                    </>

            }

        </div>

    );

}

export default Cart;