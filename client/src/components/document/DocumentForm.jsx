import React from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';

const DocumentForm = ({ document, onSave, onChange, saving, errors }) => (
  <form>
    <h1>Manage Course</h1>
    <TextInput
      name="documentName"
      label="DocumentName"
      value={document.documentName}
      onChange={onChange}
      error={errors.documentName}
    />

    <TextInput
      name="description"
      label="Description"
      value={document.description}
      onChange={onChange}
      error={errors.description}
    />


    <select
      name="access"
      label="Access"
      value={document.access}
      onChange={onChange}
      error={errors.access}
    >
      <option value="" disabled >Select Access Type</option>
      <option value="public">Public</option>
      <option value="private">Private</option>
      <option value="role">Role</option>
    </select>

    <TextArea
      name="content"
      label="content"
      value={document.content}
      onChange={onChange}
      error={errors.content}
    />

    <input
      type="submit"
      disabled={saving}
      value={saving ? 'Saving...' : 'Save'}
      className="btn btn-primary"
      onClick={onSave}
    />
  </form>
  );

// DocumentForm.propTypes = {
//   document: React.PropTypes.object.isRequired,
//   onSave: React.PropTypes.func.isRequired,
//   onChange: React.PropTypes.func.isRequired,
//   saving: React.PropTypes.bool,
//   errors: React.PropTypes.object
// };

export default DocumentForm;
