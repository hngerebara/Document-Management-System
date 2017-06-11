import React, {PropTypes} from 'react';

const TextInput = ({name, label, onChange, placeholder, value, type='text', ...props}) => {

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
          />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default TextInput;