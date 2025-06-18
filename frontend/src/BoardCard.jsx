import "./BoardCard.css";
const BoardCard=({ board, onDelete, onViewBoard })=>{
  return (
    <div className="board">
      <img src={board.image} alt={board.title} />
      <h2 >{board.title}</h2>
      {/* <p >{board.description}</p> */}
      <p >By: {board.author}</p>
      <p>{board.category}</p>
      <button
        onClick={() => onDelete(board.id)}>
        Delete
      </button>
      <button onClick={()=>onViewBoard(board)}>View Board</button>
    </div>
  );
}


export default BoardCard;

