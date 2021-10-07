import './styles/style.css';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { useState } from 'react';
import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '../../../components/table';

const Index = () => {
    const [value, setValue] = useState([null, null]);
    const [value1, setValue1] = useState([null, null]);
    const columns = [
        {id: 'orderNumber', label: 'Order No.', minWidth: ''},
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'state', label: 'Order state', minWidth: ''},
    ];
    const [rows, setRows] = useState([
        {id: 1, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'delivered'},
        {id: 2, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'rejected'},
        {id: 3, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'delivered'},
        {id: 4, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'delivered'},
        {id: 5, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'failed'},
    ]);
    const columns1 = [
        {id: 'orderNumber', label: 'Order No.', minWidth: ''},
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'state', label: 'Order state', minWidth: ''},
    ];
    const [rows1, setRows1] = useState([
        {id: 1, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'delivered'},
        {id: 2, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'rejected'},
        {id: 3, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'delivered'},
        {id: 4, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'delivered'},
        {id: 5, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'failed'},
    ]);

    return (
        <div className="vendor-reports">
            <div className="card flex fit">
                <Table rows={rows} noHover={true} columns={columns} />
                <span className='vendor-report-range-head' >Get reports from date range</span>
                <DateRangePicker
                    InputProps={{
                        style: {
                            fontSize: "13px",
                        },
                    }}
                    startText="From"
                    endText="To"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField
                                inputProps={{
                                    style: { fontSize: 13, width: "80px" },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 13 },
                                }}
                                size="small"
                                {...startProps}
                            />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField
                                inputProps={{
                                    style: { fontSize: 13, width: "80px" },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 13 },
                                }}
                                size="small"
                                {...endProps}
                            />
                        </React.Fragment>
                    )}
                />
            </div>
            <h3 style={{marginTop: '30px'}} >Coupon report</h3>
            <div className="card flex fit">
                <Table columns={columns1} rows={rows1} />
                    <span className='vendor-report-range-head' >Get reports from date range</span>
                    <DateRangePicker
                    InputProps={{
                        style: {
                            fontSize: "13px",
                        },
                    }}
                    startText="From"
                    endText="To"
                    value={value1}
                    onChange={(newValue) => {
                        setValue1(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField
                                inputProps={{
                                    style: { fontSize: 13, width: "80px" },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 13 },
                                }}
                                size="small"
                                {...startProps}
                            />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField
                                inputProps={{
                                    style: { fontSize: 13, width: "80px" },
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 13 },
                                }}
                                size="small"
                                {...endProps}
                            />
                        </React.Fragment>
                    )}
                />
            </div>
        </div>
    );
}

export default Index;
