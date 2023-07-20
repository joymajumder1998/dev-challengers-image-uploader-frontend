import React, { useEffect, useState } from "react";
import FileDragandDrop from "./FileDragandDrop";
import Loader from "../layouts/Loader";
import { backendUrl } from "../config/config";

export default function FileUpload() {
  const [LOADING, setLoading] = useState(false);
  const [PATH, setPath] = useState(null);
  const [FILES, setFiles] = useState(null);

  const onFetchFiles = () => {
    fetch(backendUrl + "/files", {
      method: "GET",
      headers: {
        "Contentt-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) =>
        res.json().then((data) => {
          if (res.status === 200) {
            const DATA = data.data;
            setFiles(DATA);
          }
        })
      )
      .catch((err) => {
        alert("Error to fetch upload api");
      });
  };

  const onChange = (e) => {
    setLoading(true);
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    fetch(backendUrl + "/upload", {
      method: "POST",
      headers: {
        "Contentt-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then((res) =>
        res.json().then((data) => {
          if (res.status === 200) {
            setLoading(false);
            onFetchFiles();
            const MESSAGE = data.message || "File uploaded successfully";
            alert(MESSAGE);
          } else {
            setLoading(false);
            const MESSAGE = data.message || "Error to upload file";
            alert(MESSAGE);
          }
        })
      )
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

  const onView = (e, d) => {
    fetch(backendUrl + "/image?PATH=" + d, {
      method: "GET",
      headers: {},
    })
      .then((res) => {
        if (res.status === 200) {
          res.blob().then((imageBlob) => {
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setPath(imageObjectURL);
          });
        } else {
          alert("Error to preview image");
        }
      })
      .catch((err) => {
        alert("Error to fetch upload api");
      });
  };

  const onDelete = (e, d) => {
    setLoading(true);
    fetch(backendUrl + "/delete?PATH=" + d, {
      method: "POST",
      headers: {
        "Contentt-Type": "multipart/form-data",
      },
      body: "{}",
    })
      .then((res) =>
        res.json().then((data) => {
          if (res.status === 200) {
            setLoading(false);
            onFetchFiles();
            const MESSAGE = data.message || "File deleted successfully";
            alert(MESSAGE);
          } else {
            setLoading(false);
            const MESSAGE = data.message || "Error to delete file";
            alert(MESSAGE);
          }
        })
      )
      .catch((err) => {
        alert("Error to fetch upload api");
      });
  };

  useEffect(() => {
    onFetchFiles();
  }, []);

  console.log(FILES);

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
      <div className="view-file-card">
        <div className="card-margin">
          {FILES?.length > 0 ? (
            FILES.map((d, i) => (
              <div key={i} className="file-details">
                <div className="index-no">{i + 1}</div>
                <div className="file-name">{d}</div>
                <div className="file-view">
                  <i
                    className="material-icons file-image onHover"
                    title="Open"
                    style={{ marginTop: "-2px" }}
                    onClick={(e) => onView(e, d)}
                  >
                    file_open
                  </i>
                </div>
                <div>
                  <i
                    className="material-icons file-image onHover"
                    style={{ marginTop: "-2px" }}
                    title="Delete"
                    onClick={(e) => onDelete(e, d)}
                  >
                    delete
                  </i>
                </div>
              </div>
            ))
          ) : (
            <span>Empty</span>
          )}
        </div>
      </div>
    </div>
  );
}
