import { useState } from "react";
import image from "./assets/image.jpeg"

export default function NewBoardForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, category } = form;
    if (!title || !description || !category ) {
      alert("Please fill all required fields.");
      return;
    }
    onAdd({ ...form, id: Date.now(), image });
    setForm({
      title: "",
      description: "",
      category: "",
      author: "",
    });
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title*" value={form.title} onChange={handleChange} />
      <input name="description" placeholder="Description*" value={form.description} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="">Select category*</option>
        {/* <option value="recent">Recent</option> */}
        <option value="celebration">Celebration</option>
        <option value="thank you">Thank You</option>
        <option value="inspiration">Inspiration</option>
      </select>
      {/* <input name="image" placeholder="Image URL*" value={form.image} onChange={handleChange} /> */}
      <input name="author" placeholder="Author (optional)" value={form.author} onChange={handleChange} />
      <button type="submit" className="submit-board">Add Board</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}


