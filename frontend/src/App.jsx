// App.jsx
import initialBoards from "./data/boards";
import BoardList from "./BoardList";
import NewBoardForm from "./NewBoardForm";
import BoardDetail from "./BoardDetail";
import { useState, useEffect } from "react";
import "./App.css";

const filters = ["All", "Recent", "Celebration", "Thank You", "Inspiration"];
const BACKEND=import.meta.env.VITE_BACKEND;

export default function App() {
  const [boards, setBoards] = useState(initialBoards);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND}/boards`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setBoards(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowRecent = async () => {
    try {
      const res = await fetch(`${BACKEND}/boards/recent`);
      if (!res.ok) throw new Error("Failed to fetch recent boards");
      const data = await res.json();
      setBoards(data);
      setActiveFilter("Recent");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (boardId) => {
    try {
      const res = await fetch(`${BACKEND}/boards/${boardId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete board");
      setBoards((prevBoards) => prevBoards.filter((b) => b.id !== boardId));
      if (selectedBoard && selectedBoard.id === boardId) {
        setSelectedBoard(null);
      }
    } catch (err) {
      console.error("Error deleting board:", err);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchActive(searchQuery.trim() !== "");
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchActive(false);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value === "") setSearchActive(false);
  };

  const handleFilterClick = (filter) => {
    if (filter === "Recent") {
      handleShowRecent();
    } else {
      setActiveFilter(filter);
    }
  };

  const filteredBoards = boards.filter((board) => {
    const matchesFilter =
      activeFilter === "All" ||
      activeFilter === "Recent" ||
      board.category.toLowerCase() === activeFilter.toLowerCase();

    const matchesSearch = board.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (!searchActive || matchesSearch) && matchesFilter;
  });

  return (
    <div className="app">
      <h1 className="title">Kudos Boards</h1>

      {selectedBoard ? (
        <BoardDetail
          board={selectedBoard}
          onBack={() => setSelectedBoard(null)}
          onUpdateBoard={(updatedBoard) => {
            setBoards(
              boards.map((b) => (b.id === updatedBoard.id ? updatedBoard : b))
            );
            setSelectedBoard(updatedBoard);
          }}
        />
      ) : (
        <>
          {/* Search */}
          <form onSubmit={handleSearch}>
            <input
              className="search-input"
              type="text"
              placeholder="Search boards..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button className="search-button" type="submit">
              Search
            </button>
            {searchQuery && (
              <button type="button" className="clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </form>

          {/* Filter Buttons */}
          <div className="filters">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${
                  activeFilter === filter ? "active" : ""
                }`}
                onClick={() => {
                  setActiveFilter(filter);
                  if (filter === "All") {
                    fetchData(); // fetch all boards again
                  } else if (filter === "Recent") {
                    handleShowRecent(); // fetch only recent
                  }
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Create Button */}
          <button onClick={() => setShowForm(true)}>Create New Board</button>

          {/* New Board Form */}
          {showForm && (
            <NewBoardForm
              onAdd={(newBoard) => {
                setBoards([newBoard, ...boards]);
                setShowForm(false);
              }}
              onCancel={() => setShowForm(false)}
            />
          )}

          {/* Board List */}
          <BoardList
            boards={filteredBoards}
            onDelete={handleDelete}
            onViewBoard={(board) => setSelectedBoard(board)}
          />
        </>
      )}
      <footer className="footer">
        <p>By: Reena Vollala</p>
      </footer>
    </div>
  );
}
