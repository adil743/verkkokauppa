import "./mainpage.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/footer";
import Header from "../header/header";
 
export default function MainPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [search, setSearch] = useState("");

  const [selectedCart, setSelectedCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  console.log(selectedCart)

  useEffect(() => {
    const cardProducts = async () => {
      const response = await fetch("http://localhost:5050/products");
      const data = await response.json();

      setProducts(data);
    };

    cardProducts();
  }, []);

  

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(selectedCart));
  }, [selectedCart]);

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
   
    const filterSearch = search.length !== 0
      ? filteredProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
      : filteredProducts;

  return (
    <div className="page">


      <Header /> 

      <div className="maincon">
        <h1>Verkkokauppa</h1>
        <div className="search">
          <input type="search" value={search} id="search" placeholder="Etsi tuotteita" autoFocus={true} onChange={(e) => setSearch(e.target.value)}/>
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
          {filterSearch.map(product => (
            <div className="product-card" key={product.id}>
                <div className="card-top">
                    <h3>{product.name}</h3>
                    <span>Luokka {product.category_id}</span>
                    <p>{product.description}</p>
                </div>

                <div className="card-bottom">
                    <span className="price">{product.prize}€</span>
                    <button type="button" className={selectedCart.some(item => item.id === product.id) ? "card-button-true" : "card-button-false"} onClick={() => 
                      { if(!selectedCart.some(item => item.id === product.id)){
                       setSelectedCart([...selectedCart, {id: product.id, qty: 1}]) }}}>{selectedCart.some(item => item.id === product.id) ? "On ostoskorissa" : "Osta"}</button>
                </div>
            </div>
          ))}
        </div>
      </div>

       <Footer />
    </div>
  );
}