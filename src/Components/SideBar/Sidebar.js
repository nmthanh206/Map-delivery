import React, { useState } from "react";
import LocationDetail from "./LocationDetail";
import "./Sidebar.css";
import { SolveSTP2 } from "../../Ulti/solveSTP2";
import { v4 as uuidv4 } from "uuid";
import { address } from "../../Ulti/address";
import { control } from "../../Map";
// let method = "walking";

const SideBar = ({ points, map, setPoints, children }) => {
  // console.log("METHOD", method);
  const [method, setMethod] = useState("walking");
  const listLocationDetails = points.map((point, i) => {
    const addressName = address.data.find(({ po }) => {
      return JSON.stringify(po) === JSON.stringify(point);
    });
    return point ? (
      <div key={uuidv4()} className="container-box">
        <h1>{i}</h1>
        <LocationDetail
          map={map}
          point={point}
          add={addressName ? addressName.add : ""}
        />
      </div>
    ) : null;
  });
  console.log("SlideBar Run");
  // console.log(listLocationDetails);
  const handleOptionChange = e => {
    // e.preventDefault();
    setMethod(e.currentTarget.value);
  };

  return (
    <>
      {children}
      <div className="SupportToolsArea">
        <form>
          <h4 style={{ margin: "2rem auto", display: "inline-block" }}>
            LOCATION IN JOURNEY:
          </h4>
          <div className="box"> {listLocationDetails}</div>
          {/* <input  type="button" value="START" id="Start" className="button" /> */}
          <div className="slidebar-container">
            <button
              onClick={e => {
                e.preventDefault();
                SolveSTP2(control, setPoints, method);
              }}
              className="btn btn-find"
            >
              Find Route
            </button>
            <button
              onClick={e => {
                e.preventDefault();
                control.hide();
                control.getPlan().setWaypoints([null]);
                setPoints([]);
              }}
              className="btn btn-clear"
            >
              Clear Points
            </button>
          </div>
          <div className="radio-btn">
            <div>
              <input
                checked={method === "walking"}
                onChange={handleOptionChange}
                type="radio"
                id="walking"
                name="method"
                value="walking"
              />
              <label htmlFor="walking">walking</label>
            </div>
            <div>
              <input
                checked={method === "cycling"}
                onChange={handleOptionChange}
                type="radio"
                id="cycling"
                name="method"
                value="cycling"
              />
              <label htmlFor="cycling">cycling</label>
            </div>
            <div>
              <input
                checked={method === "driving"}
                onChange={handleOptionChange}
                type="radio"
                id="driving"
                name="method"
                value="driving"
              />
              <label htmlFor="driving">Driving</label>
            </div>
            <div>
              <input
                checked={method === "driving-traffic"}
                onChange={handleOptionChange}
                type="radio"
                id="driving-traffic"
                name="method"
                value="driving-traffic"
              />
              <label htmlFor="driving-traffic">Driving- Traffic</label>
            </div>
          </div>
          {/* <div>
          <button
            onClick={e => {
              e.preventDefault();
              method = "walking";
            }}
            className="btn btn-method"
          >
            Walking
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              method = "cycling";
            }}
            className="btn btn-method"
          >
            Cycling
          </button>
          <button
            onClick={e => {
              e.preventDefault();
              method = "driving";
            }}
            className="btn btn-method"
          >
            Driving
          </button>
        </div> */}
        </form>
      </div>
    </>
  );
};

export default SideBar;
