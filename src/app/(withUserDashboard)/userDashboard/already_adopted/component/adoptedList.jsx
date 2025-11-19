import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';
import React from 'react';

const AdoptedList = ({ adoptedData, adoptedFilterData }) => {
    return (
        <UserProtectedRoute>
             <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 ">
                <table className="table">
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
                        {/* row 1 */}
                        {
                            adoptedFilterData.length > 0 ? (
                                adoptedFilterData.map(adopted => (
                                    <tr>
                                        <th>{adopted?.petId}</th>
                                        <th>{new Date(adopted?.requestDate).toDateString()}</th>
                                        <td>{adopted?.userEmail}</td>
                                        <td>{adopted?.phoneNumber}</td>
                                        <td>{adopted?.quantity}</td>
                                        <td>{adopted?.status}</td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="btn bg-white text-black shadow-none border border-[#bbb] m-1">...</div>
                                                <ul tabIndex={0} className="space-y-2 dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
                                                    <li className='bg-[#219ebc] text-white' onClick={() => { onOpenModal(), setSelectedData(adopted) }}><a>Update</a></li>
                                                    <li className='bg-[#c1121f] text-white' onClick={() => handleRequestDataDelete(adopted._id)}><a>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                               <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>No Data</td>
                                <td></td>
                               </tr>
                            )
                        }


                    </tbody>
                </table>
            </div>
        </div>
       </UserProtectedRoute>
    );
};

export default AdoptedList;