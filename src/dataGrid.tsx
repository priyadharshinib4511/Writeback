import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams, GridToolbar, GridEventListener, useGridApiRef, GridCellParams, gridExpandedSortedRowIdsSelector, gridVisibleColumnDefinitionsSelector } from '@mui/x-data-grid';
import { useState } from 'react';
import axios from 'axios';
import { Drawer, IconButton, Snackbar } from '@mui/material';
import { Button } from '@mui/material';
import SimpleDialog from './dialog'
import {ChatBot} from './chatbox'



export default function DataGridDemo({ columns, rows }) {
  const [queryResult, setQueryResult] = useState(null);
  const [queryError, setQueryError] = useState(null);
  const [rows1, setRows1] = useState(rows)
  const [columns1, setColumns1] = useState(columns)
  const [open, setOpen] = useState(true)

  /*const executeQuery = async () => {
    console.log("inside the function")
    const apiUrl = 'https://yw94880.central-india.azure.snowflakecomputing.com';
    const username = 'priyadharshini';
    const password = 'Sumathi08!';
    const warehouseName = 'COMPUTE_WH';
    const databaseName = 'SNOWFLAKE_SAMPLE_DATA';
    const schemaName = 'TPCDS_SF10TCL';
    const sqlQuery = 'SELECT * FROM CALL_CENTER';
    console.log("before the auth")

    try {
        const response = await axios.post(
            `/api/v2/statements/`,
            {
                sqlText: sqlQuery
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',              
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
                }
            },
        );
        console.log("data from snowflake", response?.data)

        setQueryResult(response?.data);
        setQueryError(null);
    } catch (error) {
      console.log("error from snowflake", error)
        setQueryResult(null);
        setQueryError(error.response ? error.response.data : error.message);
    }
};*/

  // React.useEffect(() => {
  //   setRows1(rows1)

  //   console.log("inside effect", rows1)

  // }, [])

  const apiRef = useGridApiRef();



  const handleProcessRowUpdate = (newRow, oldRow) => {
    const updatedRows = rows1.map(row => (row.id === oldRow.id ? newRow : row));
    setRows1(updatedRows);
    return newRow;
  };



  const handleSubmit = () => {

    setRows1(rows1)
    console.log("inside submit ", rows1)



    let data = {
      "rows": rows1,
      "columns": columns1
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    axios.post('http://localhost:3000/api/', data)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });

    setOpen(true);

  };

  const handleSubmit1 = () => {
    console.log("hey you there")
  }

  console.log("rows ", rows1)

  const handleEditCellChange = (params) => {
    console.log("sample on edit", rows1)
    const { id, field, value } = params;
    // Update the corresponding row's state
    setRows1(prevRows => prevRows.map(row => (row.id === id ? { ...row, [field]: value, state: 'edited' } : row)));
    console.log("sample on edit 2", value)

  };

  const handleEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(`Movie "${params.row.title}" clicked`);
  };

  const [coordinates, setCoordinates] = React.useState({
    rowIndex: 0,
    colIndex: 0,
  });


  React.useEffect(() => {
    const { rowIndex, colIndex } = coordinates;
    // apiRef.current.scrollToIndexes(coordinates);
    const id = gridExpandedSortedRowIdsSelector(apiRef)[rowIndex];
    const column = gridVisibleColumnDefinitionsSelector(apiRef)[colIndex];
    // apiRef.current.setCellFocus(id, column.field);
  })

  const handleCellClick = (params: GridCellParams) => {
    const rowIndex = gridExpandedSortedRowIdsSelector(apiRef).findIndex(
      (id) => id === params.id,
    );
    const colIndex = gridVisibleColumnDefinitionsSelector(apiRef).findIndex(
      (column) => column.field === params.field,
    );
    setCoordinates({ rowIndex, colIndex });
  };


  // const handleClick = () => {

  // };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={handleClose}>
        X
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );


  return (
    <>
      {/* {open && <SimpleDialog />} */}
      <Drawer
        variant="temporary"
        ModalProps={{
          keepMounted: false,
        }}
      />

      <Box sx={{
        width: '100%',
        '& .MuiDataGrid-cell--editable': {
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
        },
        "& .MuiDataGrid-columnHeaders": {
          color: "white",
          backgroundColor: "rgb(97, 152, 202)"
        },
      }}>

        <Button variant="contained" onClick={handleSubmit}>Writeback</Button>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Data Submitted successfully"
          action={action}
          color='primary'
        />

        <DataGrid
          apiRef={apiRef}
          rows={rows1}
          columns={columns1}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          processRowUpdate={handleProcessRowUpdate}
          sx={{ overflowX: 'scroll' }}

          
        />
      </Box>
    </>
  );
}
