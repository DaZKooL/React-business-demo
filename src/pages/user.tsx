import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { format } from "date-fns";

const User = (props: any) => {
    const { id } = useParams()
    interface error {
        message: string,
    }



    const emptyError: error = { message: '' };

    const [error, setError] = useState(emptyError);
    const [isLoaded, setIsLoaded] = useState(false);
    const [user, setUser] = useState<any>({});

    useEffect(() => {
        fetch('https://dummyapi.io/data/v1/user/' + id, {
            headers: {
                'Content-Type': 'application/json',
                'app-id': '62455a80c16bc16205384d1a',

            },


        })

            .then(res => res.json())
            .then(
                (data) => {
                    console.log(data)
                    setIsLoaded(true);
                    setUser(data);
                },
                (error) => {
                    console.log(error, "error")
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    if (error.message.length) {
        return <div>Error: {error.message}</div>;
    }
    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    let formattedDate="";
    if (user.dateOfBirth){
    const date = new Date(user.dateOfBirth);
    formattedDate = format(date, "MMMM do, yyyy H:mma");
    }
   // console.log (formattedDate);

    return (
        <>
            <img src={user.picture} />
            <div>
                {user.firstName}----{user.lastName}----
               {formattedDate}------

                {user.email}
            </div>
        </>
    )

}
export default User;


