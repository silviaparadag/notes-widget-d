import PropTypes from 'prop-types';

const Compose = (props) => {
  const isButtonDisabled = props.composeNote.length === 0;
  return (
    <div className="compose">
      <form
        type="submit"
        className="compose__form"
        onSubmit={props.handlePostSubmit}
      >
        <textarea
          className="compose__form--textarea"
          placeholder="Add a note..."
          value={props.composeNote}
          onChange={props.handleComposeNote}
          onKeyDown={props.handleKeyDown}
        />
        <button className="compose__form--btn" disabled={isButtonDisabled}>
          Post
        </button>
      </form>
    </div>
  );
};

Compose.propTypes = {
  composeNote: PropTypes.string.isRequired,
  handleComposeNote: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  handlePostSubmit: PropTypes.func.isRequired,
};

export default Compose;
