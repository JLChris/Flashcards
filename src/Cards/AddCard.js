import { Link, useHistory } from "react-router-dom";
import React, { useState } from "react";
import { createCard } from "../utils/api";
import { newId } from "../Layout/index";

function AddCard({ deck }) {
    const history = useHistory();
    const id = newId(deck.cards);
    const [newCard, setNewCard] = useState({ front: "", back: "" });

    const handleCardChange = (event) => {
        setNewCard({ ...newCard, [event.target.id]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const card = { id: id, ...newCard, deckId: deck.id };
        await createCard(deck.id, card);
        deck.cards.push(card);
        // await updateDeck(deck.id);
        setNewCard({ front: "", back: "" });
    };


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea className="form-control" id="front" rows="2" placeholder="Front side of card" onChange={handleCardChange} value={newCard.front}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea className="form-control" id="back" rows="2" placeholder="Back side of card" onChange={handleCardChange} value={newCard.back}></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => {
                    setNewCard({ front: "", back: "" });
                    history.push(`/decks/${deck.id}`);
                }}>Done</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddCard;