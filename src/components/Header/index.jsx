import React, { useEffect, useState } from 'react'
import './index.css'
import MoonPicture from '../../assets/images/moon-picture.png'
import CartPicture from '../../assets/images/cart-shopping.png'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const [count, setCount] = useState(0)
  const cart = useSelector(state => state.cart)

  console.log(cart);

  useEffect(() => {
    let sum = 0
    cart.length > 0 && cart.forEach(value => {
      console.log(value);
      if (value.count && !isNaN(Number(value.count))) {
        sum += Number(value.count)
      }
    })

    setCount(sum)
  }, [cart])

  return (
    <div className="container">
      <header className="header">
        <button>C</button>
        <div className="data">
          <NavLink className="aHref" to='/'>Home</NavLink>
          <NavLink className="aHref" to='/about'>About</NavLink>
          <NavLink className="aHref" to='/products'>Products</NavLink>
          <NavLink className="aHref" to='/cart'>Cart</NavLink>
        </div>

        <div className="images">
          <img className='moon' src={MoonPicture} alt="" />
          <img className='shopping' src={CartPicture} alt="" />
        </div>

        <p className='counter'>{count}</p>

        {
          console.log(count)
        }
      </header>
    </div>
  )
}

export default Header
