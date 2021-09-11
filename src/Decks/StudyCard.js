import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({ cards }) {
    const history = useHistory();
    const [card, setCard] = useState({ id: 0, flipped: false });
    const nextCard = () => {
        if (card.id < cards.length - 1) {
            setCard({ ...card, id: card.id + 1, flipped: false });
        } else {
            const result = window.confirm("Restart cards?");
            if (result) {
                setCard({ ...card, id: 0, flipped: false });
            } else {
                setCard({ ...card, id: 0, flipped: false });
                history.push("/");
            }
        }
    }

    if (cards.length === 0) return <p>loading...</p>;

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {card.id + 1} of {cards.length}</h5>
                <p className="card-text">{card.flipped ? cards[card.id].back : cards[card.id].front}</p>
                <button type="button" className="btn btn-secondary mr-2" onClick={() => setCard({ ...card, flipped: !card.flipped })}>Flip</button>
                {card.flipped ?
                    <button type="button" className="btn btn-primary" onClick={nextCard}>Next</button> :
                    ""}
            </div>
        </div>

    )
}

export default StudyCard;