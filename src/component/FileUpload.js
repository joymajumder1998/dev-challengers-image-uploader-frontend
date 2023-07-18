import React, { useState } from "react";
import FileDragandDrop from "./FileDragandDrop";
import Loader from "../layouts/Loader";

export default function FileUpload() {
  const [LOADING, setLoading] = useState(false);
  const [PATH, setPath] = useState(null);

  const onChange = (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    fetch("https://devchallengersservice.onrender.com/upload", {
      method: "POST",
      headers: {
        "Contentt-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) => {
        if (res.status === 200) {
          res.blob().then((imageBlob) => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setPath(imageObjectURL);
            setLoading(false);
          });
        } else {
          alert("Error to upload image");
          setLoading(false);
        }
      })
      .catch((err) => {
        alert("Error to fetch upload api");
      });
  };

  const onBack = (e) => {
    setPath(null);
  };

  const onUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e);
  };

  console.log(PATH);

  if (LOADING) {
    return <Loader />;
  }

  return (
    <div className="my-container">
      <div className="card">
        {!PATH ? (
          <FileDragandDrop onChange={onChange} onUpload={onUpload} />
        ) : (
          <>
            <img src={PATH} height="150" />
            <br />
            <br />
            <label className="onHover" htmlFor="img" onClick={onBack}>
              Back
            </label>
          </>
        )}
      </div>
    </div>
  );
}
