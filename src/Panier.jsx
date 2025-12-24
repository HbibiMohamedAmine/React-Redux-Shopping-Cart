import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  augmenterQuantite,
  diminuerQuantite,
  viderPanier,
  afficherPanier,
} from "./features/counter/counterSlice";
import "./Panier.css";

const Panier = () => {
  const items = useSelector((state) => state.panier.items);
  const dispatch = useDispatch();

  // 🔹 State pour ajout de produit
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleAddProduct = () => {
    if (title.trim() === "" || price === "" || url==="") return;

    dispatch(
      addItem({
        id: Date.now(),
        title,
        price: Number(price),
        quantity: 1,
        url,
      })
    );

    setTitle("");
    setPrice("");
    setUrl("");
  };

  return (
    <div className="panier-container">
      <h2>🛍️ Ajouter un produit</h2>

      {/* 🔹 Ajout produit */}
      <div className="add-product">
        <input
          type="text"
          placeholder="Nom du produit"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Prix (TND)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleAddProduct}>Ajouter</button>
      </div>

      <hr />

      <h2>🛒 Mon Panier</h2>

      {items.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          {items.map((item) => (
            <div className="panier-item" key={item.id}>
              <img src={item.url} alt={item.title} width="80" />

              <div>
                <h4>{item.title}</h4>
                <p>{item.price} TND</p>
              </div>

              <div className="actions">
                <button onClick={() => dispatch(diminuerQuantite(item.id))}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => dispatch(augmenterQuantite(item.id))}>
                  +
                </button>
              </div>

              <button
                className="remove"
                onClick={() => dispatch(removeItem(item.id))}
              >
                Supprimer
              </button>
            </div>
          ))}

          <hr />
          <h3>Total : {total.toFixed(2)} TND</h3>

          <button className="clear" onClick={() => dispatch(viderPanier())}>
            Vider le panier
          </button>

        <button className="clear" onClick={() => dispatch(afficherPanier())}>
            Afficher le panier dans la console
        </button>
        </>
      )}
    </div>
  );
};

export default Panier;
