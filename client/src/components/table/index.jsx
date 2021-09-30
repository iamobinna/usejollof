import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const Index = ({columns, rows, Action}) => {
    // const columns = [
    //     {id: 'name', label: 'Name'},
    //     {id: 'fullName', label: 'Full Name'},
    // ];

    // const rows = [
    //     {name: 'Fahad', fullName: 'Shah Fahad'},
    //     {name: 'Feroz', fullName: 'Shah Feroz'},
    //     {name: 'Faisal', fullName: 'Shah Faisal'},
    //     {name: 'Khan', fullName: 'Shah Khan'},
    // ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                if(column.id === 'action')
                                return <Action/>
                                const value = row[column.id];
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
