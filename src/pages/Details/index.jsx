import React, { useContext, useEffect, useState } from 'react';
import './index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../axios';
import { CountCart } from '../../App';
import toast, { Toaster } from 'react-hot-toast';

function Details() {
    const [products, setProducts] = useState({});
    const [productColor, setProductColor] = useState("");
    const [amount, setAmount] = useState(1);
    const { count, setCount } = useContext(CountCart);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`api/products/${id}`)
            .then(response => {
                if (response.status === 200) {
                    const productData = response.data.data;
                    setProducts(productData);
                    if (productData?.attributes?.colors?.length > 0) {
                        setProductColor(productData.attributes.colors[0]);
                    }
                }
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
            });
    }, [id]);

    function handleToHomePage() {
        navigate('/');
    }

    function handleToProductsPage() {
        navigate('/products');
    }

    function handleAddCard(event) {
        event.preventDefault();

        const card = {
            cartId: products.id + productColor,
            productId: products.id,
            image: products.attributes.image,
            title: products.attributes.title,
            price: products.attributes.price,
            company: products.attributes.company,
            productColor: productColor,
            amount
        };

        toast.success("Cart muvaffaqiyatli qo'shildi!")

        let margeCart = JSON.parse(localStorage.getItem('cart')) || [];
        margeCart.push(card);
        localStorage.setItem('cart', JSON.stringify(margeCart));
    }

    return (
        products?.id && (
            <div className="wrapper">
                <Toaster />
                
                <div className="top">
                    <button onClick={handleToHomePage}>Home</button>
                    <p>{'>'}</p>
                    <button onClick={handleToProductsPage}>Products</button>
                </div>

                <div className="wrapperData">
                    <img src={products.attributes.image} alt="Product" />

                    <div className="wrapper-right">
                        <h3>{products.attributes.title}</h3>
                        <h5>{products.attributes.brand}</h5>
                        <p className="price">${products.attributes.price}</p>

                        <p className="desc">{products.attributes.description}</p>

                        <h5 className="color">Colors</h5>

                        <div className="btns">
                            {products.attributes.colors && products.attributes.colors.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    style={{ backgroundColor: color }}
                                    onClick={() => setProductColor(color)}
                                ></button>
                            ))}
                        </div>

                        <label htmlFor="amount">
                            Amount
                            <select
                                name="amount"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                            >
                                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </label>

                        <button onClick={handleAddCard} className="add">ADD TO BAG</button>
                    </div>
                </div>
            </div>
        )
    );
}

export default Details;
