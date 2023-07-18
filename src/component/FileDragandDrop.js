import React from "react";
// import PropTypes from "prop-types";

export default function FileDragandDrop({ onUpload, onChange }) {
  return (
    <div className="image-upload">
      <form onDragEnter={onUpload}>
        <div>
          <i className="material-icons">cloud_upload</i>
        </div>
        <div id="image-upload-heading">
          <h4>Drag & Drop</h4>
        </div>
        <div id="select-image">
          <input
            id="img"
            className="select-image-input"
            accept="image/*"
            title="Choose a image please"
            type="file"
            onChange={onChange}
          />
          <label className="onHover" htmlFor="img">
            Click me to upload image
          </label>
        </div>
      </form>
    </div>
  );
}

// FileDragandDrop.propTypes = {
//   onUpload: PropTypes.func.isRequired,
// };
