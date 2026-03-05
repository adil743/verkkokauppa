import "./etusivu.css";
import ModalReg from "../modal/modalreg";
import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Etusivu() {
    const [open, setOpen] = useState(false);
     
    const kaikki = [
            { title: "Rekisteröityminen", icon: "fi fi-rr-pencil", kuvaus: "Aloita rekisteröitymällä Tuottajamarket-verkkopalveluun omalla käyttäjätunnuksellasi ja salasanallasi." },
            { title: "Selaa tuotteita", icon: "fi fi-rr-search", kuvaus: "Kirjauduttuasi sisään voit selata monipuolista valikoimaa laadukkaita ja lähellä tuotettuja tuotteita. Käy läpi eri tuotekategorioita ja tutustu tarjontaan."},
            { title: "Lisää ostoskoriin", icon: "fi fi-rr-shopping-cart", kuvaus: "Valittuasi haluamasi tuotteet voit lisätä ne ostoskoriin. Voit valita useita tuotteita eri kategorioista." },
            { title: "Tarkista ostokset", icon: "fi fi-rr-smile", kuvaus: "Siirry ostoskoriin ja tarkista valintasi ennen tilauksen vahvistamista. Voit muuttaa määriä tai poistaa tuotteita tarvittaessa."},
            { title: "Tilauksen vahvistus", icon: "fi fi-rr-check", kuvaus: "Kun olet tyytyväinen ostoskoriisi, vahvista tilauksesi ja syötä tarvittavat toimitustiedot."},
            { title: "Toimitus kotiovelle", icon: "fi fi-rr-truck-side", kuvaus: "Odota tuotteiden saapumista kotiovellesi. Tuottajamarket-verkkopalvelu toimittaa laadukkaat lähiruokatuotteet vaivattomasti sinulle." },
            { title: "Nauti lähiruoasta", icon: "fi fi-rr-heart", kuvaus: "Saapuneet tuotteet ovat nyt valmiita nautittavaksi. Nauti herkullisista ja laadukkaista lähiruoista omassa arjessasi!" },
          ];
          
  return (
    <div className="page">

      <header className="nav">
        <img src="/logo.png" alt="Logo" className="logo-img" />
        <Link to="/mainpage">
            <button className="btn">Kauppaan »</button>
        </Link>
      </header>

      <section className="hero">
        <div className="hero-text">
          <h1>Tuoretta lähiruokaa suoraan kotiovellesi!</h1>
          <p>
            Tuottajamarket - Kaupunkilaisille vaivatonta lähiruoan hankintaa.
          </p>
          <Link to="/mainpage">
            <button className="btn">Selaa tuotteita</button>
          </Link>
        </div>
      </section>



      <section className="section">
        <h2>Kuinka Se Toimii</h2>

        <div className="grid">
          {kaikki.map((step, index) => (
            <div key={index} className="card">
                { step.title === "Rekisteröityminen" ? (
                    <button type="button" className="card-icon" onClick={() => setOpen(true)}><i className={step.icon}></i></button>
                ) : step.title === "Selaa tuotteita" ? (
                    <Link to="/kauppa">
                        <button type="button" className="card-icon"><i className={step.icon}></i></button> 
                    </Link>
                ) : (
              <div className="card-icon"><i className={step.icon}></i></div>
              )}
              <h3>
                {index + 1}. {step.title}
              </h3>
              <p>
                {step.kuvaus}
               </p>
            </div>
          ))}
        </div>
      </section>

      <ModalReg open={open} onClose={() => setOpen(false)} />

      <footer className="footer">
        <p>© OPISKELIJA 2026</p>
        <p>Adil Akhmetov</p>
        <p>Omnia</p>
      </footer>

    </div>
  );
}