import "./mainpage.css";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const cardProducts = async () => {
      const response = await fetch("http://localhost:5050/products");
      const data = await response.json();

      setProducts(data);
    };

    cardProducts();
  }, []);

  const categories = (id) => {
    if(selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(c => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  }

  const filteredProducts = selectedCategories.length === 0
    ? products
    : products.filter(product => selectedCategories.includes(product.category_id));

  return (
    <div className="page">

      <header className="navbar">
        <div className="logo">LOGO</div>

        <div className="nav-right">
          <div className="cart"><i className="fi fi-rr-shopping-cart"></i></div>
          <div className="home">Etusivu</div>
        </div>
      </header>


      <div className="maincon">
        <h1>Verkkokauppa</h1>
        <div className="search">
          <input type="search" placeholder="Etsi tuotteita" />
        </div>
        <div className="luokat">
          <label><input type="checkbox" /> Kaikki</label>
          <label><input type="checkbox" value="1" onChange={(e) => categories(Number(e.target.value))}/> Luokka 1</label>
          <label><input type="checkbox" value="2" onChange={(e) => categories(Number(e.target.value))}/> Luokka 2</label>
          <label><input type="checkbox" value="3" onChange={(e) => categories(Number(e.target.value))}/> Luokka 3</label>
          <label><input type="checkbox" value="4" onChange={(e) => categories(Number(e.target.value))}/> Luokka 4</label>
          <label><input type="checkbox" value="5" onChange={(e) => categories(Number(e.target.value))}/> Luokka 5</label>
          <label><input type="checkbox" value="6" onChange={(e) => categories(Number(e.target.value))}/> Luokka 6</label>
        </div>
      </div>

      <div>
        <div className="cards">
          {filteredProducts.map(product => (
            <div className="card" key={product.id}>
                <div className="card-top">
                    <h3>{product.name}</h3>
                    <span>Luokka {product.category_id}</span>
                    <p>{product.description}</p>
                </div>

                <div className="card-bottom">
                    <span className="price">{product.prize}€</span>
                    <button type="button">Osta</button>
                </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
          Adil Akhmetov
          Omnia
      </footer>
    </div>
  );
}