import React, {PropTypes} from 'react';

const TextInput = ({ name, label, onChange, type, placeholder, value, error, checkUserExists}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type={type}
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={checkUserExists} />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  checkUserExists: PropTypes.func,
};

export default TextInput;