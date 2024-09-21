import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


import { DefinedRange } from 'react-date-range';

const DateRangeCalendar = () => {
    let currentDate = String(new Date()).split(" ").slice(1, 4).join()
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ]);
    const [datePicker, setDatepicker] = useState(false);
    const [showDateValue, setShowDateValue] = useState(currentDate + " - " + currentDate);
    function ChangeDate() {
        state.map((date) => {
            setShowDateValue(String(date.startDate).split(" ").slice(1, 4).join() + " - " + String(date.endDate).split(" ").slice(1, 4).join());
        })
    }
    return (
        <>
            <div className="range-data-input">
                <input type="text" value={showDateValue} onClick={() => setDatepicker(!datePicker)}
                    className="range-input"
                    // readOnly
                    onChange={(e) => console.log(e.target.value)}
                />
                <i className="fas fa-chevron-down ms-sm-3 ms-0"></i>
                {datePicker &&
                    <DefinedRange
                        onChange={item => { setState([item.selection]); setDatepicker(false); ChangeDate() }}
                        className='range-input-btn'
                        ranges={state}
                        showPreview={false}
                    />
                }
            </div>
        </>
    );
};

export default DateRangeCalendar;