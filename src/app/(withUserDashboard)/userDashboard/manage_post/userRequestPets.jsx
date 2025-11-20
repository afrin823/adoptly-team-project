"use client"
import React from 'react';

const UserRequestPets = ({ id }) => {
    const userDataLoading = 10


    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 ">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-black'>
                        <th>Pet Id</th>
                        <th>Request Date</th>
                        <th>Email</th>
                        <th>Mobile Number</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>dfdfdf</th>
                        <th>Email</th>
                        <td>Mobile</td>
                        <td>Distric</td>
                        <td>Division</td>
                        <td>Queantity</td>
                        <td>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn bg-white text-black shadow-none border border-[#bbb] m-1">...</div>
                                <ul tabIndex={0} className="space-y-2 dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li className='bg-[#219ebc] text-white'><a>Update</a></li>
                                    <li className='bg-[#c1121f] text-white'><a>Delete</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody> 
            </table>
        </div>
    );
};

export default UserRequestPets;