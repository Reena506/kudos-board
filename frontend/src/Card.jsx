// Card.js
import "./Card.css";
const Card=({ card, onDelete, onUpvote }) =>{
  return (
    <div className="card">
      {/* <h4>{card.text}</h4> */}
      <p>{card.text}</p>
      {card.gif && <img src={card.gif} alt="gif" className="gif" />}
      {card.author && <small>By {card.author}</small>}
      <div className="card-actions">
        <button onClick={onUpvote}>👍 {card.upvotes}</button>
        <button onClick={onDelete}>🗑️</button>
      </div>
    </div>
  );
}

export default Card
