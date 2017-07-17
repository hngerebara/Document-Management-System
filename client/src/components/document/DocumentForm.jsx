import React, { PropTypes } from 'react';
import TinyMCE from 'react-tinymce';

const DocumentForm = ({
  document,
  onSave,
  onChange,
  handleEditorChange,
  saving,
  errors
}) => (
  <form>
    <h1>Create document</h1>
    <div className="row col s12">
      <div className="input-field">
        <input
          type="text"
          className="validate"
          name="documentName"
          value={document.documentName}
          onChange={onChange}
          error={errors.documentName}
        />
        <label htmlFor="icon_prefix">Doocument Name</label>
      </div>

      <div className="input-field">
        <input
          type="text"
          className="validate"
          name="description"
          value={document.description}
          onChange={onChange}
          error={errors.description}
        />
        <label htmlFor="icon_prefix">Description</label>
      </div>

      <div className="input-field access-dropdown">
        <select
          onChange={onChange}
          name="access"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="role">Role</option>
        </select>

      </div>


      <div className="row tiny-mce">
        <TinyMCE
          content={document.content}
          config={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
          }}
          onChange={handleEditorChange}
        />
      </div>

      <div className="row">
        <button
          className="btn waves-effect waves-light col s12"
          disabled={saving}
          type="submit"
          onClick={onSave}
          value={saving ? 'Saving...' : 'Save'}
        >
          Submit
        </button>
      </div>
    </div>
  </form>
);

DocumentForm.propTypes = {
  document: PropTypes.object.isRequired,
  saving: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handleEditorChange: PropTypes.func.isRequired
};

export default DocumentForm;
