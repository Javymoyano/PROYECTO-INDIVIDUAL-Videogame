import React from "react";
import { Pulsar } from "@uiball/loaders";
import "../styles/loading.css";
export default function Loading() {
  return (
    <div>
      <div className="spinner-wrapper">
        <div className="spinner">
          <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
          </div>
        </div>
      </div>
      <h1 className="loading_h1">LOADING...</h1>
    </div>
  );
}
