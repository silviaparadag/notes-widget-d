import PropTypes from 'prop-types';
import DisplayIcons from './DisplayIcons';

const EachNote = (props) => {
  const noteClassName = `note ${
    props.isMouseHovered && props.isCursor ? 'focused' : ''
  }`;

  const showIcons =
    props.isCursor &&
    props.isMouseHovered &&
    !props.isEditing &&
    props.currentUser.id === props.oneNote.author.id ? (
      <DisplayIcons
        oneNote={props.oneNote}
        handleEdit={props.handleEdit}
        handleDelete={props.handleDelete}
      />
    ) : null;

  return (
    <li
      className={noteClassName}
      onMouseEnter={props.handleMouseEnter}
      onMouseLeave={props.handleMouseLeave}
      onKeyDown={(ev) => {
        props.handleEdit(props.oneNote.id, ev);
        props.handleDelete(props.oneNote.id, ev);
      }}
      tabIndex={0}
      // onClick={props.handleClick(props.isCursor)}
      // onClick={props.handleClick(props.cursorFocus)}
    >
      <div className="note__post">
        <img
          className="note__userImage"
          src={`${props.oneNote.author.avatar}`}
          alt={`Avatar of ${props.oneNote.author.name}`}
        />
        <div className="note__text">
          {props.isEditing &&
          props.currentUser.id === props.oneNote.author.id &&
          props.editedNoteId === props.oneNote.id ? (
            <form
              className="note__editText"
              type="submit"
              onSubmit={props.handleChangeTextSubmit}
            >
              <textarea
                id={props.oneNote.id}
                type="text"
                value={props.oneNote.newText}
                className="note__editText--text"
                onChange={props.handleChangeText}
              />
              <div className="note__editText--btns">
                <button
                  className="note__editText--cancel"
                  type="button"
                  onClick={props.handleCancel}
                >
                  Cancel
                </button>
                <button className="note__editText--save" type="submit">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              <h4 className="note__text--user">{props.oneNote.author.name}</h4>
              <p className="note__text--post">{props.oneNote.text}</p>
            </>
          )}
        </div>
      </div>
      {showIcons}
    </li>
  );
};

EachNote.propTypes = {
  oneNote: PropTypes.object.isRequired,
  isCursor: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired,
  isMouseHovered: PropTypes.bool.isRequired,
  handleMouseEnter: PropTypes.func.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleChangeTextSubmit: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editedNoteId: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
};
export default EachNote;
