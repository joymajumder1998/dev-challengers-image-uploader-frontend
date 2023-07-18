import { LinearProgress } from "@mui/material";
import React from "react";

export default function Loader({ label = "Loading" }) {
  return (
    <div id="loader-conatiner">
      <div id="loader-card">
        <div>
          <label id="loader-label">{label}</label>
        </div>
        <div id="loader-progressbar">
          <LinearProgress color="success" />
        </div>
      </div>
    </div>
  );
}
