// BoardDetail.jsx
import { useState, useEffect } from "react";
import CardList from "./CardList";
import NewCardForm from "./NewCardForm";
import pic from "./assets/image.jpeg";

// Inside BoardDetail.jsx


const BoardDetail=({ board, onBack, onUpdateBoard }) =>{
  const [cards, setCards] = useState(board.cards || []);

  useEffect(() => {
  const fetchCards = async () => {
    try {
      const res = await fetch(`http://localhost:3000/cards/${board.id}/cards`);
      if (!res.ok) throw new Error("Failed to fetch cards");
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchCards();
}, [board.id]);




  const handleAddCard = (newCard) => {
    const updated = { ...board, cards: [newCard, ...cards] };
    setCards(updated.cards);
    onUpdateBoard(updated);
  };

  const handleDeleteCard = (id) => {
    const updated = { ...board, cards: cards.filter((c) => c.id !== id) };
    setCards(updated.cards);
    onUpdateBoard(updated);
  };

  const handleUpvoteCard = (id) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, upvotes: (card.upvotes || 0) + 1 } : card
    );
    const updated = { ...board, cards: updatedCards };
    setCards(updatedCards);
    onUpdateBoard(updated);
  };

  return (
    <div className="board-detail">
      <button onClick={onBack} className="back-button">Back</button>
      <h2>{board.title}</h2>
      {/* <p>{board.description}</p> */}
      <img src={pic} alt={board.title} className="board-img" />

      <h3>Cards</h3>
      <NewCardForm onAddCard={handleAddCard} />
      <CardList cards={cards} onDelete={handleDeleteCard} onUpvote={handleUpvoteCard} />
    </div>
  );
}


export default BoardDetail