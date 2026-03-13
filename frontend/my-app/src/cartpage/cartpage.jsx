import "./cartpage.css";
import Header from "../header/header";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";

export default function CartPage() {
    const [orderProducts, setOrderProducts] = useState([]);
    const [carts, setCarts] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });
    console.log(carts);


    useEffect(() => {
        const backendProducts = async () => {
            const response = await fetch("http://localhost:5050/products");
            const data = await response.json();

            setOrderProducts(data);
        };

        backendProducts();
    }, []);
    

    

    const checkedCarts = orderProducts.filter(product => carts.some(item => item.id === product.id));
    
    const yhteensa = checkedCarts.reduce((sum, product) => {
        const qty = carts.find(item => item.id === product.id)?.qty || 1;
        const a = product.prize * qty;
        return sum + a;
    }, 0);

    const removeFromCart = (id) => {
        const deleted = carts.filter(item => item.id !== id);
        setCarts(deleted);
        localStorage.setItem("cart", JSON.stringify(deleted));
    };

    return(
        <>
        <div className="cart-page">
            <Header />
            <h2>Ostoskori</h2>
            <div className="cart-layout">
                <div className="ostoskori">
                    { checkedCarts.length === 0 ? <p>Pahoittelemme, mutta ostoskorisi on tällä hetkellä tyhjä. <br />Jatka ostosten tekemistä lisätäksesi tuotteita ostoskoriisi.</p> : 
                    checkedCarts.map(product => {
                        const qty = carts.find(item => item.id === product.id)?.qty || 1;
                    return(
                        <div className="cart-products" key={product.id}>
                            <div className="productsInCarts">
                                <div className="cart-trash" onClick={() => removeFromCart(product.id)}>
                                    <i className="fi fi-rr-trash"></i>
                                </div>

                                <div className="cart-product-info">
                                    <p className="cart-product-name">{product.name}</p>
                                    <p className="cart-product-id">Tuote #{product.id}</p>
                                </div>

                                <div className="cart-product-qty">
                                    <input type="number" value={carts.find(item => item.id === product.id)?.qty || 1}  onChange={((e) => { const uusiQty = Number(e.target.value)
                                         const updatedQty = carts.map(item => item.id === product.id ? {...item, qty: uusiQty} : item); 
                                         setCarts(updatedQty);
                                         localStorage.setItem("cart", JSON.stringify(updatedQty)); 
                                    })} />
                                </div>

                                <div className="cart-product-price">
                                    <p>{(product.prize * qty).toFixed(2)}€</p>
                                </div>
                            </div>
                        </div>
                    )})}

                    <div className="cart-bottom">
                        <Link to="/mainpage">
                            <p>« Takaisin kauppaan</p>
                        </Link>
                        <p>Yhteensä {(yhteensa).toFixed(2)}€</p>
                    </div>

                </div>
                <div className="tilaus">
                    <input type="text" placeholder="Nimi" />
                    <input type="email" placeholder="Sähkopostiosoite" />
                    <input type="number" placeholder="Puhelinnumero" />
                    <button>Tee tilaus</button>
                </div>

            </div>
            <Footer />
        </div>
        </>
    );
}