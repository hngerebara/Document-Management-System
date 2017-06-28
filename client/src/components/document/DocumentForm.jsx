import React from 'react';
import TextInput from '../common/TextInput';
import TextArea from '../common/TextArea';
import TinyMCE from 'react-tinymce';

const DocumentForm = ({ document, onSave, onChange, handleEditorChange, saving, errors }) => (
  <form>
    <h1>Manage Documents</h1>
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
    <div className="input-field col s12">
    <select
      value={document.access}
      onChange={onChange}
    >
      <option value="" disabled >Select Access Type</option>
      <option value="public">Public</option>
      <option value="private">Private</option>
      <option value="role">Role</option>
    </select>
    </div>

    <TinyMCE
      content={document.content}
      config={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
      onChange={handleEditorChange}
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

DocumentForm.propTypes = {
  document: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool,
  errors: React.PropTypes.object
};

export default DocumentForm;
