import React from 'react';
import UserRequestPets from '../userRequestPets';

const RequestPets = ({ params }) => {



    return (
        <div>
            <UserRequestPets id={params.id} />
        </div>
    );
};

export default RequestPets;