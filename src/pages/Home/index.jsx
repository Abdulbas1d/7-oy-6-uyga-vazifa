import React, { useEffect, useState } from 'react'
import './index.css'
import axios from 'axios'
import TableOne from '../../assets/images/tableOne.webp'
import TableTwo from '../../assets/images/tableTwo.webp'
import TableThree from '../../assets/images/tableThree.webp'
import TableFour from '../../assets/images/tableFour.webp'
import { useNavigate } from 'react-router-dom'
import { api } from '../../axios'

function Home() {
  const [data, setData] = useState([])
  const navigate = useNavigate()

  useEffect(function () {
    api.get("api/products?featured=true")
      .then(response => {
        if (response.status == 200) {
          setData(response.data.data)
        }
      })

      .catch(error => {
        console.log(error);
      })
  }, [])

  function handleProducts() {
    navigate("/products")
  }

  function handleProductsId(id) {
    navigate(`/products/${id}`)
  }

  return (
    <div className='container_Home'>
      <div className='containers'>
        <div className="container-left">
          <h2>We are changing the way people shop</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.</p>
          <button className="btn">OUR PRODUCTS</button>
        </div>

        <div className="container-right">
          <div className="table"><img src={TableOne} alt="" /></div>
          <div className="table"><img src={TableTwo} alt="" /></div>
          <div className="table"><img src={TableThree} alt="" /></div>
          <div className="table"><img src={TableFour} alt="" /></div>
        </div>
      </div>

      <div className="any">
        <h2 className='anyProducts'>Featured Products</h2>
        <hr />
      </div>

      <div className="cards">
        {
          data && data.map((product, index) => (
            <div key={index} onClick={() => {handleProductsId(product.id)}} className="card">
              <img src={product.attributes.image} alt="" />
              <h4>{product.attributes.title}</h4>
              <h5>${product.attributes.price}</h5>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Home