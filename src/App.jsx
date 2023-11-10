import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import dataApi from './services/data';
import Notes from './components/Notes';
import Compose from './components/Compose';

function App() {
  const [composeNote, setComposeNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [cursorFocus, setCursorFocus] = useState(0);
  const [isMouseHovered, setIsMouseHovered] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [editedNoteId, setEditedNoteId] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    dataApi().then((data) => {
      console.log(data.notes);
      const newTextNote = data.notes.map((post) => ({
        ...post,
        newText: post.text,
      }));
      const currentUser = data.me;
      setNotesList(newTextNote);
      setCurrentUser(currentUser);
    });
  }, []);
  console.log(currentUser);

  const handleComposeNote = (ev) => {
    setComposeNote(ev.target.value);
  };

  const handlePostSubmit = (ev) => {
    ev.preventDefault();
    notesList.unshift({
      id: Date.now().toString(),
      createdAt: Math.floor(Date.now() / 1000),
      text: composeNote,
      type: 'userGenerated',
      author: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
    });
    setNotesList([...notesList]);
    setComposeNote('');
    console.log(notesList);
  };

  const handleKeyDown = (ev) => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      ev.preventDefault();
      handlePostSubmit(ev);
      console.log('Pressed Enter!');
    }
  };

  const handleArrowKeyUpDown = (ev) => {
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      console.log('Pressed keyDown!');
      setCursorFocus(
        cursorFocus === null
          ? 0
          : cursorFocus === notesList.length - 1
          ? 0
          : cursorFocus + 1
      );
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      console.log('Pressed keyUp!');
      setCursorFocus(
        cursorFocus === null
          ? notesList.length - 1
          : cursorFocus === 0
          ? notesList.length - 1
          : cursorFocus - 1
      );
    }
  };

  // const handleClick = (index) => {
  //   setCursorFocus(index);
  // };

  const handleMouseEnter = () => {
    setIsMouseHovered(true);
  };

  const handleMouseLeave = () => {
    setIsMouseHovered(false);
  };

  const handleEdit = (id, ev) => {
    const noteSelected = notesList.find(
      (post) => parseInt(post.id) === parseInt(id)
    );
    if (
      ((ev && ev.key === 'e') || ev === undefined) &&
      !isEditing &&
      noteSelected.author.id === currentUser.id
    ) {
      ev && ev.preventDefault();
      console.log(
        `I've pressed letter E on the keyboard for editing note with id: ${id}`
      );
      setEditing(true);
      setEditedNoteId(id);
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };
  const handleChangeText = (ev) => {
    ev.preventDefault();
    const editedPostList = notesList.map((post) => {
      if (editedNoteId === post.id) {
        return { ...post, newText: ev.target.value };
      }
      return post;
    });
    setNotesList(editedPostList);
  };

  const handleChangeTextSubmit = (ev) => {
    ev.preventDefault();
    const updatedNotesList = notesList.map((post) => {
      if (post.id === editedNoteId) {
        return { ...post, text: post.newText };
      }
      return post;
    });
    setNotesList(updatedNotesList);
    setEditedNoteId(null);
    setEditing(false);
  };

  const handleDelete = (id, ev) => {
    const noteSelected = notesList.find(
      (post) => parseInt(post.id) === parseInt(id)
    );

    if (
      (ev &&
        (ev.key === 'd' || ev.key === 'D' || ev.key === 'Backspace') &&
        !isEditing &&
        noteSelected.author.id === currentUser.id) ||
      ev === undefined
    ) {
      ev && ev.preventDefault();
      console.log(
        `I've pressed Delete on the keyboard for remove note with id: ${id}`
      );
      const updatedNotesList = notesList.filter((post) => post.id !== id);
      setNotesList(updatedNotesList);
    }
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">Notes Widget</h1>
      </header>
      <main className="main">
        <div className="notes">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Notes
                    notesList={notesList}
                    handleArrowKeyUpDown={handleArrowKeyUpDown}
                    cursorFocus={cursorFocus}
                    isMouseHovered={isMouseHovered}
                    //handleClick={handleClick}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    handleEdit={handleEdit}
                    handleChangeText={handleChangeText}
                    handleChangeTextSubmit={handleChangeTextSubmit}
                    isEditing={isEditing}
                    editedNoteId={editedNoteId}
                    handleDelete={handleDelete}
                    handleCancel={handleCancel}
                    currentUser={currentUser}
                  />
                  <Compose
                    composeNote={composeNote}
                    handlePostSubmit={handlePostSubmit}
                    handleComposeNote={handleComposeNote}
                    handleKeyDown={handleKeyDown}
                  />
                </>
              }
            ></Route>
          </Routes>
        </div>
      </main>
      <footer className="footer">Silvia Parada | 2023</footer>
    </>
  );
}

export default App;
