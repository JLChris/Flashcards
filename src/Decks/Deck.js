import { useParams, Link, Route, Switch, useRouteMatch, useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";


function Deck({ decks, setDecks }) {
    const params = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    const deckId = parseInt(params.deckId);
    const [deck, setDeck] = useState({ id: 0, name: "", description: "", cards: [] });

    useEffect(() => {
        readDeck(deckId).then(setDeck);
    }, []);

    // readDeck(deckId).then(setDeck);
    // const deck = decks.find((deck) => deck.id === deckId);
    // const [cards, setCards] = useState(deck.cards);

    const cardDeleteHandler = (cardId) => {
        const index = deck.cards.findIndex(card => card.id === cardId);
        // if (updatedCards.length >= 1) {
        //     updatedCards.forEach((card) => {
        //         if (card.id > cardId) card.id -= 1;
        //     });
        // }
        deleteCard(cardId);
        deck.cards.splice(index, 1);
        history.push(`${url}`);
    }

    const deckDeleteHandler = (deckId) => {
        const updatedDecks = decks.filter((deck) => deck.id !== deckId);
        deleteDeck(deckId);
        setDecks(updatedDecks);
    }

    return (
        <Switch>
            <Route exact path={url}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active">{deck.name}</li>
                    </ol>
                </nav>
                <div className="card my-4">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <p className="card-text">{deck.description}</p>
                        <div className="d-flex justify-content-between">
                            <div>
                                <button type="button" className="btn btn-secondary mr-2" onClick={() => history.push(`${url}/edit`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                </svg> Edit</button>
                                <button type="button" className="btn btn-primary mr-2" onClick={() => history.push(`${url}/study`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                                </svg> Study</button>
                                <button type="button" className="btn btn-primary" onClick={() => history.push(`${url}/cards/new`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16">
                                    <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                                </svg> Add Cards</button>
                            </div>
                            <div>
                                <button type="button" className="btn btn-danger" onClick={() => {
                                    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
                                        deckDeleteHandler(deck.id);
                                        history.push("/");
                                    }
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg></button>
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Cards</h3>
                {deck.cards.length < 1 ? <p>This deck has no cards</p> :
                    deck.cards.map((card) => {
                        return (
                            <div className="card-body w-50 border my-3" key={card.id}>
                                <div className="d-flex justify-content-between">
                                    <p className="card-text text-muted">{card.front}</p>
                                    <p className="card-text text-muted">{card.back}</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary mr-2" onClick={() => history.push(`${url}/cards/${card.id}/edit`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                    </svg> Edit</button>
                                    <button type="button" className="btn btn-danger" onClick={() => {
                                        if (window.confirm("Delete this card?\n\nYou will not be able to recover it."))
                                            cardDeleteHandler(card.id);
                                    }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg></button>
                                </div>
                            </div>
                        )
                    })}
            </Route>
            <Route path={`${url}/study`}>
                <Study deck={deck} />
            </Route>
            <Route path={`${url}/edit`}>
                <EditDeck deck={deck} setDeck={setDeck} />
            </Route>
            <Route path={`${url}/cards/new`}>
                <AddCard deck={deck} />
            </Route>
            <Route path={`${url}/cards/:cardId/edit`}>
                <EditCard deck={deck} />
            </Route>
        </Switch >
    )
}

export default Deck;