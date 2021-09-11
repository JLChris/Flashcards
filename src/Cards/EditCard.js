import { useParams, Link, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateCard, readCard } from "../utils/api";

function EditCard({ deck }) {
    const history = useHistory();
    const params = useParams();
    const cardId = parseInt(params.cardId);
    // const card = deck.cards.find((card) => card.id === cardId);
    const [card, setCard] = useState({ id: 0, front: "", back: "", deckId: 0 });
    // const [updatedCard, setUpdatedCard] = useState({ id: 0, front: "", back: "", deckId: 0 });

    useEffect(() => {
        readCard(cardId).then(setCard);
    }, []);

    const handleCardChange = (event) => {
        setCard({ ...card, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const index = deck.cards.findIndex((element) => element.id === card.id);
        await updateCard(card);
        deck.cards.splice(index, 1, card);
        history.push(`/decks/${deck.id}`);
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>Deck {deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea className="form-control" id="front" rows="2" placeholder={card.front} onChange={handleCardChange} value={card.front}></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea className="form-control" id="back" rows="2" placeholder={card.back} onChange={handleCardChange} value={card.back}></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => history.push(`/decks/${deck.id}`)}>Done</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default EditCard;