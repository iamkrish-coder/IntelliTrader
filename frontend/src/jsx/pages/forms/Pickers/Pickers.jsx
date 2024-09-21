import React, { useState, Fragment } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TimePicker from './TimePicker';
import Gradient from "./LinearGradientPicker";


const Pickers = () => {
  const [colorChange, setColorChange] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2024/05/08"));
  const [endDate, setEndDate] = useState(new Date("2024/05/10"));
  return (
    <Fragment>     

      <div className="row">
        <div className="col-xl-6 col-lg-8">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Date Picker</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="example rangeDatePicker range-picker-date">
                    <p className="mb-1">Start Date </p>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      className="form-control"
                      startDate={startDate}
                      endDate={endDate}
                    />
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <div className="example rangeDatePicker">
                    <p className="mb-1">End date</p>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="form-control"
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Pick-Date picker</h4>
            </div>
            <div className="card-body">
              <p className="mb-1">Default picker</p>
              <DatePicker className="form-control" />
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Date Picker with time</h4>
            </div>
            <div className="card-body">
              <p className="mb-1">Picker with Input Time</p>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                timeInputLabel="Time:"
                dateFormat="MM/dd/yyyy h:mm aa"
                showTimeInput
              />

            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Time picker</h4>
            </div>
            <div className="card-body">
              <div className="row picker-data">
                <div className="col-md-6 col-xl-3 col-xxl-6 mb-3">
                  <div className="color-time-picker">
                    <p className="mb-1">Complex mode</p>
                    <TimePicker />
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 col-xxl-6 mb-3">
                  <div className="color-time-picker style-1">
                    <p className="mb-1">Auto close Clock Picker</p>
                    <TimePicker />
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 col-xxl-6 mb-3">
                  <div className="color-time-picker">
                    <p className="mb-1">Now time</p>
                    <TimePicker />
                  </div>
                </div>
                <div className="col-md-6 col-xl-3 col-xxl-6 mb-3">
                  <div className="color-time-picker style-1">
                    <p className="mb-1">Left Placement</p>
                    <TimePicker />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Color Picker</h4>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-xl-4 col-lg-6 mb-3">
                  <div className="example">
                    <p className="mb-1">Default Clock Picker</p>
                    <input
                      type="color"
                      className="as_colorpicker form-control"
                      value={colorChange}
                      onChange={(e) => setColorChange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-xl-4 col-lg-6 mb-3">
                  <div className="color-gradian-tixia">
                    <p className="mb-1">Gradiant mode</p>
                    <Gradient />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Pickers;