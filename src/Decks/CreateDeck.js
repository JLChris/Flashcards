import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import React, { useState } from "react";
import { newId } from "../Layout/index";

function CreateDeck({ decks }) {
    const history = useHistory();
    const id = newId(decks);
    const [newDeck, setNewDeck] = useState({ id: id, name: "", description: "", cards: [] });

    const handleDeckChange = (event) => {
        setNewDeck({ ...newDeck, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createDeck(newDeck);
        decks.push(newDeck);
        history.push(`/decks/${newDeck.id}`);
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Deck Name" onChange={handleDeckChange} value={newDeck.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="4" placeholder="Brief description of the deck" onChange={handleDeckChange} value={newDeck.description} ></textarea>
                </div>
                <button type="reset" className="btn btn-secondary" onClick={() => {
                    history.push("/");
                }}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateDeck;