import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
        field: 'picture',
        headerName: 'Photo',
        width: 150,
        editable: true,
        renderCell: (params) => <img src={params.value} />, // renderCell will render the component
    },
    { field: 'picture', headerName: 'Photo', width: 80 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];

let rows: [];


const Home = () => {

    interface error {
        message: string,
    }

    interface user {
        id: number;
        picture: string;
        title: string;
        firstName: string;
        lastName: string;

    }

    const emptyError: error = { message: '' };

    const [error, setError] = useState(emptyError);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState<any>([]);

    const baseURL = 'https://dummyapi.io/data/v1';
    let data: any;

    useEffect(() => {


        fetch('https://dummyapi.io/data/v1/user?limit=100', {
            headers: {
                'Content-Type': 'application/json',
                'app-id': '62455a80c16bc16205384d1a',

            },


        })

            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data.data)
                    rows = data.data
                    setIsLoaded(true);
                    setUsers(data.data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error.message.length > 0) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <div style={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                        checkboxSelection
                    />
                </div>
                {
                    /* without grid component:
                    <ul>
                       {users.map((user: user) => (
                           <li key={user.id}>
                               <Link to={`user/${user.id}`}>
                                   <img src={user.picture} /><span>{user.title} {user.firstName} {user.lastName}</span></Link>
                           </li>
                       ))}
                   </ul>*/
                }

            </>
        );
    }
}

export default Home;
