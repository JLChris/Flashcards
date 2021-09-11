import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import CreateDeck from "../Decks/CreateDeck";
import Deck from "../Decks/Deck";
import { Route, Switch } from "react-router-dom";

function newId(array) {
  let id = 1;
  if (array.length >= 1) {
    const ids = array.map(element => element.id);
    while (ids.includes(id)) {
      id++;
    }
  }
  return id;
}


function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    listDecks(abortController.signal)
      .then((res) => {
        setDecks(res);
        // res = res.map(async (deck) => {
        //   const cards = await listCards(deck.id);
        //   deck.cardCount = cards.length;
        //   return deck;
        // });
        // Promise.all(res).then(setDecks);
      })
      .catch((err) => {
        if (err === "AbortError") {
          console.log("aborted");
        } else {
          throw err;
        }
      });
    return () => {
      abortController.abort();
    }
  }, []);


  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} setDecks={setDecks} />
          </Route>
          <Route path="/decks/new">
            <CreateDeck decks={decks} />
          </Route>
          <Route path="/decks/:deckId">
            <Deck decks={decks} setDecks={setDecks} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
export { newId };
