import BoardCard from "./BoardCard";
import './BoardList.css'

const BoardList=({ boards, onDelete, onViewBoard })=> {
  if (boards.length === 0) {
    return <p>No boards in this category.</p>
  }

  return (
    <div className="boardlist">
      {boards.map((board) => (
        <BoardCard key={board.id} board={board} onDelete={onDelete} onViewBoard={onViewBoard} />
      ))}
    
    </div>
  );
}

export default BoardList;
