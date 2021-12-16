import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Index = ({columns, rows, clickHandler, customRows, noHover, Action, setRows}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(customRows? customRows: 10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns?.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ 
                                minWidth: column.minWidth,
                                width: 'fit-content',
                                fontWeight: '700',
                                fontFamily: 'Montserrat'
                            }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            return (
                            <TableRow hover = {noHover? false : true} role="checkbox" tabIndex={-1} key={row.code} onClick={() => clickHandler && clickHandler(row._id, index)} >
                                {columns.map((column) => {
                                let value = row[column.id];
                                if(Action)
                                {
                                    if(column.id === 'action')
                                    {
                                        return(
                                            <TableCell>
                                                <Action id={row._id} index={index}/>
                                            </TableCell>
                                        )
                                    }
                                }
                                if(typeof value === 'boolean'){
                                    if(value === true){
                                        value = 'true';
                                    }else{
                                        value = 'false';
                                    }
                                }
                                return (
                                    <TableCell key={column.id} align={column.align} style={{
                                        width: 'fit-content',
                                        fontFamily: 'Montserrat'
                                    }} >
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default Index
