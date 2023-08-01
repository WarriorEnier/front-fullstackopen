import { useState, useEffect } from "react";
import noteService from "./services/notes";
import "./App.css";

const History = ({ allClicks }) => {
  if (allClicks.length === 0) {
    return <div>the app is used by ressing the buttons</div>;
  }
  return <div>button press history: {allClicks.join(" ")}</div>;
};

const Notes = ({ note, toggleImportant }) => {
  const label = note.important ? "Importante" : "No importante";

  return (
    <li>
      {note.content}
      <Button onClick={toggleImportant} text={label} />
    </li>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  /* const [clicks, setClicks] = useState({
    left: 0,
    right: 0,
  });
  const [allClicks, setAll] = useState([]);

  const handleClick = (bol) => {
    if (bol) {
      setClicks({ ...clicks, left: clicks.left + 1 });
      setAll(allClicks.concat("L"));
    } else {
      setClicks({ ...clicks, right: clicks.right + 1 });
      setAll(allClicks.concat("R"));
    }
  };

  const handleReset = () => {
    setClicks({ left: 0, right: 0 });
    setAll([]);
  }; */
  useEffect(() => {
    noteService
      .getAll()
      .then((res) => setNotes(res))
      .catch((err) => console.error("Error al obtener notas ", err));
    setIsLoading(false);
  }, []);

  const toggleImportantOfId = (id) => {
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService.update(id, changedNote).then((res) => {
      setNotes(notes.map((note) => (note.id !== id ? note : res)));
    });
  };

  const addNote = (e) => {
    e.preventDefault();

    const noteObject = {
      id: notes.length + 1,
      content: newNote.content,
      /*valor: newNote.valor,
      precio: newNote.precio, */
      date: Date.now(),
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then((res) => {
        setNotes(notes.concat(res));
        setNewNote("");
      })
      .catch((err) => console.error("No se pudo guardar: ", err));

    //setNotes([...notes, noteObject]);
  };

  const handleNoteChange = (e) => {
    let { name, value } = e.target;
    setNewNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <>
      <h1>Notas</h1>
      <Button
        onClick={() => setShowAll(!showAll)}
        text={showAll ? "important" : "all"}
      />
      {isLoading ? (
        "Cargando..."
      ) : (
        <ul>
          {notesToShow.map((note) => (
            <Notes
              key={note.id}
              note={note}
              toggleImportant={() => toggleImportantOfId(note.id)}
            />
          ))}
        </ul>
      )}
      <form onSubmit={addNote}>
        <input
          type="text"
          name="content"
          value={newNote.content || ""}
          onChange={handleNoteChange}
        />

        <button>Guardar</button>
      </form>
      {/* {clicks.left}
      <Button onClick={() => handleClick(true)} text={"Left"} />
      <Button onClick={handleReset} text={"Reset"} />
      <Button onClick={() => handleClick(false)} text={"Right"} />
      {clicks.right}
      <History allClicks={allClicks} /> */}
    </>
  );
}

export default App;
