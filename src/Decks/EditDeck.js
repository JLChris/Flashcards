import React from "react";
import { Link, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function EditDeck({ deck, setDeck }) {
    const history = useHistory();
    // const [updatedDeck, setUpdatedDeck] = useState({ id: 0, name: "", description: "", cards: [] });

    // useEffect(() => {
    //     readDeck(deck.id).then(setUpdatedDeck);
    // }, []);

    const handleDeckChange = (event) => {
        setDeck({ ...deck, [event.target.id]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await updateDeck(deck);
        history.push(`/decks/${deck.id}`);
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" placeholder={`${deck.name}`} onChange={handleDeckChange} value={deck.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" rows="4" placeholder={`${deck.description}`} onChange={handleDeckChange} value={deck.description}></textarea>
                </div>
                <button type="reset" className="btn btn-secondary mr-2" onClick={() => history.push(`/decks/${deck.id}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div >
    );
}

export default EditDeck;