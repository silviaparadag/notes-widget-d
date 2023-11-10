import PropTypes from 'prop-types';
import logoEdit from '../../design/edit.svg';
import logoTrash from '../../design/trash.svg';

const DisplayIcons = (props) => {
  return (
    <div className={`note__edit`}>
      <button
        type="button"
        className="note__edit--btn"
        onClick={() => props.handleEdit(props.oneNote.id)}
      >
        <img
          className="note__edit--edit"
          src={logoEdit}
          alt={`Button for editing post`}
        />
      </button>
      <button
        type="button"
        className="note__edit--btn"
        onClick={() => props.handleDelete(props.oneNote.id)}
      >
        <img
          className="note__edit--trash"
          src={logoTrash}
          alt={`Button for remove post`}
        />
      </button>
    </div>
  );
};

DisplayIcons.propTypes = {
  oneNote: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DisplayIcons;
