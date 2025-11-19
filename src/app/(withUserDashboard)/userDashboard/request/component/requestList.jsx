"use client"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import Swal from 'sweetalert2';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';

const RequestList = ({ userRequestData, refetch, requestLoading }) => {

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const [selectedData, setSelectedData] = useState(null);
    const axiosPublic = useAxiosPublic();
    const userDataLoading = 10;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        const requestUpdateData = {
            userEmail: data.userEmail,
            phoneNumber: data.phoneNumber,
            quantity: data.quantity
        }
        try {
            const res = await axiosPublic.put(`/request/${selectedData._id}`, requestUpdateData);
            console.log('checking update', res)
            if (res.status === 200) {
                refetch()
                onCloseModal()
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleRequestDataDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/request/${id}`);
                console.log('checking delete data', res);
                if (res.status === 200) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });
    }

    return (
        <UserProtectedRoute>
              <div>
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
                        {/* row 1 */}
                        {
                            userRequestData.length > 0 ? (
                                userRequestData.map(request => (
                                    <tr>
                                        <th>{request?.petId}</th>
                                        <th>{new Date(request?.requestDate).toDateString()}</th>
                                        <td>{request?.userEmail}</td>
                                        <td>{request?.phoneNumber}</td>
                                        <td>{request?.quantity}</td>
                                        <td>{request?.status}</td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="btn bg-white text-black shadow-none border border-[#bbb] m-1">...</div>
                                                <ul tabIndex={0} className="space-y-2 dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
                                                    <li className='bg-[#219ebc] text-white' onClick={() => { onOpenModal(), setSelectedData(request) }}><a>Update</a></li>
                                                    <li className='bg-[#c1121f] text-white' onClick={() => handleRequestDataDelete(request._id)}><a>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    {
                                        requestLoading && (
                                            [...Array(userDataLoading)].map((_, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-40 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-22 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-32 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-32 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-14 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-14 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-14 h-10 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                    {
                                        !requestLoading && (
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>No Data</td>
                                            </tr>
                                        )
                                    }

                                </>

                            )
                        }
                    </tbody>
                    <Modal open={open} onClose={onCloseModal} center>
                        <p className='my-5 font-bold'>Update Your Request</p>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                            <div>
                                <label htmlFor="">Email:</label>
                                <input {...register("userEmail", { required: true })} defaultValue={selectedData?.userEmail} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Email' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Phone:</label>
                                <input {...register("phoneNumber", { required: true })} defaultValue={selectedData?.phoneNumber} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Phone Number' type="text" />
                            </div>
                            <div>
                                <label htmlFor="">Quantity:</label>
                                <input {...register("quantity", { required: true })} defaultValue={selectedData?.quantity} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Queantity' type="text" />
                            </div>
                            <div className='flex justify-center items-center'>
                                <button type='submit' className='btn bg-[#E76F51] text-white rounded-xl border-0'>Submit</button>
                            </div>
                        </form>
                    </Modal>
                </table>
            </div>
        </div>
      </UserProtectedRoute>
    );
};

export default RequestList;