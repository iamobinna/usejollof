import React from 'react';
import TimePicker from '@mui/lab/TimePicker';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Checkbox from '@mui/material/Checkbox';
import './styles/style.css';

const Index = ({timings, setTimings}) => {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <div className="vendor-time-select-container">
                {timings.map((timing, index) => (
                    <div className={'vendor-time-select'}>
                        <Checkbox
                            style={{marginLeft: '-10px'}}
                            value={timing.service}
                            onChange={() => {
                                let arr = [...timings];
                                arr[index] = {...arr[index], service: !arr[index].service};
                                setTimings(arr);
                            }}
                        />
                        <span>{timing.name}</span>
                        <div className={`times ${timing.service === false && 'time-disabled'}`}>
                            <TimePicker
                                InputProps={{
                                    style:{
                                        width: '150px',
                                        fontSize: '13px'
                                    }
                                }}
                                className='time-picker'
                                label="From"
                                value={timing.from}
                                onChange={(newValue) => {
                                    let arr = [...timings];
                                    arr[index] = {
                                        ...arr[index],
                                        from: newValue,
                                    };
                                    setTimings(arr);
                                }}
                                renderInput={(params) => (
                                    <TextField size="small" {...params} />
                                )}
                            />
                            <TimePicker
                                InputProps={{
                                    style:{
                                        width: '150px',
                                        fontSize: '13px'
                                    }
                                }}
                                label="To"
                                value={timing.to}
                                onChange={(newValue) => {
                                    let arr = [...timings];
                                    arr[index] = {
                                        ...arr[index],
                                        to: newValue,
                                    };
                                    setTimings(arr);
                                }}
                                renderInput={(params) => (
                                    <TextField size="small" {...params} />
                                )}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </LocalizationProvider>
    );
}

export default Index
