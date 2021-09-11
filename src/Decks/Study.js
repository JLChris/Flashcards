import React from "react";
import { Link, useHistory } from "react-router-dom";
import StudyCard from "./StudyCard";

function Study({ deck }) {
    const history = useHistory();
    const cards = deck.cards;

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <h2>{deck.name}: Study</h2>
            {deck.cards.length < 3 ?
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Not enough cards.</h5>
                        <p className="card-text">You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.</p>
                        <button type="button" className="btn btn-primary" onClick={() => history.push(`/decks/${deck.id}/cards/new`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                            <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                        </svg> Add Cards</button>
                    </div>
                </div> :
                <StudyCard cards={cards} />
            }
        </div>
    )

}

export default Study;