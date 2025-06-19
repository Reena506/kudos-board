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




  const handleAddCard = async (boardId, newCard) => {
    try {
      console.log(board.id);
      const res = await fetch(`http://localhost:3000/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...newCard, boardId}),
      });

      if (!res.ok) throw new Error("Failed to add card");

    const savedCard = await res.json();
      setCards((prevCards) => [...prevCards, savedCard]);
    } catch (err) {
      console.error("Error adding card:", err);
    }
  };




  const handleDeleteCard = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/cards/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete card");

    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  } catch (err) {
    console.error("Error deleting card:", err);
  }
};




  const handleUpvoteCard = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/cards/${id}/upvote`, {
      method: "PATCH",
    });

    if (!res.ok) throw new Error("Failed to upvote");

    const updatedCard = await res.json();

    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? updatedCard : card
      )
    );
  } catch (err) {
    console.error("Error upvoting card:", err);
  }
};




  return (
    <div className="board-detail">
      <button onClick={onBack} className="back-button">Back</button>
      <h2>{board.title}</h2>
      {/* <p>{board.description}</p> */}
      <img src={pic} alt={board.title} className="board-img" />

      <h3>Cards</h3>
      <NewCardForm onAddCard={(newCard)=>handleAddCard(board.id, newCard)} />
      <CardList cards={cards} onDelete={handleDeleteCard} onUpvote={handleUpvoteCard} />
    </div>
  );
}


export default BoardDetail