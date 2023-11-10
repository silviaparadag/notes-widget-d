import PropTypes from 'prop-types';
import EachNote from './EachNote';

const Notes = (props) => {
  const htmlNotes = props.notesList.map((oneNote, index) => {
    const isCursor = index === props.cursorFocus;
    return (
      <EachNote
        key={oneNote.id}
        oneNote={oneNote}
        isCursor={isCursor}
        currentUser={props.currentUser}
        isMouseHovered={props.isMouseHovered}
        handleMouseEnter={props.handleMouseEnter}
        handleMouseLeave={props.handleMouseLeave}
        handleEdit={props.handleEdit}
        handleChangeText={props.handleChangeText}
        handleChangeTextSubmit={props.handleChangeTextSubmit}
        handleDelete={props.handleDelete}
        isEditing={props.isEditing}
        editedNoteId={props.editedNoteId}
        handleCancel={props.handleCancel}
        // handleClick={props.handleClick}
        // cursorFocus={props.cursorFocus}
      />
    );
  });
  console.log(htmlNotes);

  return (
    <ul
      className="notes__list"
      onKeyDown={(ev) => {
        props.handleArrowKeyUpDown(ev);
      }}
      tabIndex={0}
    >
      {htmlNotes}
    </ul>
  );
};

Notes.propTypes = {
  notesList: PropTypes.array.isRequired,
  cursorFocus: PropTypes.number.isRequired,
  currentUser: PropTypes.object.isRequired,
  isMouseHovered: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleChangeTextSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  editedNoteId: PropTypes.string.isRequired,
  handleArrowKeyUpDown: PropTypes.func.isRequired,
};

export default Notes;
