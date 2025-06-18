import { useState } from "react";

const GIPHY_API_KEY = "wJPTfmSra7xidFvt6e4lBhwJUcJfJV6R";

export default function NewCardForm({ onAddCard }) {
  const [text, setText] = useState("");
  const [gifSearch, setGifSearch] = useState("");
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [customGifUrl, setCustomGifUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleSearchGifs = async () => {
    if (!gifSearch.trim()) return;

    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=8`
    );
    const json = await res.json();
    setGifResults(json.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const gifToUse = customGifUrl.trim() || selectedGif;
    if (!gifToUse) return; // A gif is required

    const newCard = {
      id: Date.now(),
      text,
      gif: gifToUse,
      author: author.trim() || null,
      upvotes: 0,
    };

    onAddCard(newCard);
    setText("");
    setGifSearch("");
    setGifResults([]);
    setSelectedGif(null);
    setCustomGifUrl("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="new-card-form">
      <textarea
        placeholder="Write a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Author (optional)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <div className="gif-section">
        <input
          type="text"
          placeholder="Search GIFs..."
          value={gifSearch}
          onChange={(e) => setGifSearch(e.target.value)}
        />
        <button type="button" onClick={handleSearchGifs}>
          Search GIFs
        </button>

        <div className="gif-grid">
          {gifResults.map((gif) => (
            <img
              key={gif.id}
              src={gif.images.fixed_height_small.url}
              alt={gif.title}
              className={`gif-thumb ${
                selectedGif === gif.images.fixed_height_small.url ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedGif(gif.images.fixed_height_small.url);
                setCustomGifUrl(""); // clear manual input if GIF is selected
              }}
            />
          ))}
        </div>

        <div className="manual-gif-url">
          <input
            type="text"
            placeholder="Or paste a GIF URL..."
            value={customGifUrl}
            onChange={(e) => {
              setCustomGifUrl(e.target.value);
              setSelectedGif(null); // clear Giphy selection if custom URL is typed
            }}
          />
        </div>
      </div>

      {(customGifUrl || selectedGif) && (
        <div className="selected-gif-preview">
          <p>Selected GIF:</p>
          <img src={customGifUrl || selectedGif} alt="Selected GIF" />
        </div>
      )}

      <button type="submit">Add Card</button>
    </form>
  );
}


