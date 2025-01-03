import React, { useEffect } from 'react';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { cart, remove, update } from '../../store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.cart);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(cart(storedCart));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cards));
  }, [cards]);

  const handleRemove = (cartId) => {
    const confirmDelete = confirm("Rostdan ham o'chirmoqchimisiz?");
    if (confirmDelete) {
      dispatch(remove(cartId));
    }
  };

  const handleAmountChange = (cartId, amount) => {
    dispatch(update({ cartId, amount: Number(amount) }));
  };

  const subtotal = cards.reduce((total, cart) => total + cart.price * cart.amount, 0);
  const shipping = 5.00;
  const tax = subtotal * 0.1;
  const orderTotal = subtotal + shipping + tax;

  return (
    <div className='card_container'>
      <h2 className='card_title'>{cards.length === 0 ? "Hozircha kartalar mavjud emas!" : "Your Cart"}</h2>
      <div className="hr">
        <hr />
      </div>

      <div className="aboutCard">
        <div className="differentCard">
          {cards.map((cart, index) => (
            <div key={index} className="anyCard">
              <img src={cart.image} alt="" />

              <div className="dataOne">
                <h4>{cart.title}</h4>
                <p>{cart.company}</p>
                <label htmlFor="color">
                  Color:
                  <span style={{ backgroundColor: cart.productColor }}></span>
                </label>
              </div>

              <div className="dataTwo">
                <label htmlFor="select">
                  Amount
                  <select
                    name="select"
                    id="select"
                    value={cart.amount}
                    onChange={(e) => handleAmountChange(cart.cartId, e.target.value)}
                  >
                    {[...Array(20)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </label>
                <button onClick={() => handleRemove(cart.cartId)} id="remove">Remove</button>
              </div>

              <h4 className='price'>${cart.price}</h4>
            </div>
          ))}
        </div>

        <div className="resultPrice">
          <div className="result">
            <span>Subtotal <strong>${subtotal.toFixed(2)}</strong></span>
            <span>Shipping <strong>${shipping.toFixed(2)}</strong></span>
            <span>Tax <strong>${tax.toFixed(2)}</strong></span>
            <span className='res'>Order Total <strong>${orderTotal.toFixed(2)}</strong></span>
          </div>
          <button className="login">PLEASE LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;