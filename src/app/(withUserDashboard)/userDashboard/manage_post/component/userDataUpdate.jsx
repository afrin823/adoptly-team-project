"use client"
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import useAuth from '@/hooks/useAuth';
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';

const UserDataUpdate = ({ refetch, petSelectedData, petDataOpen, onPetDataCloseModal }) => {

    const [isDescription, setIsDescription] = useState("");
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log('checking data', data);
        const requestData = {
            name: data.name,
            image: data.image || "",
            description: isDescription || "",
            age: parseInt(data.age) || "",
            gender: data.gender || "",
            breed: data.breed || "",
            species: data.species || "",
            weight: parseInt(data.weight) || "",
            address: {
                district: data.district || "",
                division: data.division || "",
            },
            quantity: parseInt(data.quantity) || 1,
            phoneNumber: data.phoneNumber || "",
            userEmail: user?.email || "",
        };

        console.log('checking final data', requestData);

        try {
            const res = await axiosPublic.put(`/pets/${petSelectedData?._id}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('checking update', res)
            if (res.status === 200) {
                refetch()
                onPetDataCloseModal()
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <UserProtectedRoute>
             <div>
            <Modal open={petDataOpen} onClose={onPetDataCloseModal} center>
                <p className='my-5 font-bold'>Update Pet Data</p>
                <form onSubmit={handleSubmit(onSubmit)} className=' space-y-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div>
                            <label htmlFor="">Name:</label>
                            <input {...register("name", { required: true })} defaultValue={petSelectedData?.name} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Email' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Species:</label>
                            <input {...register("species", { required: true })} defaultValue={petSelectedData?.species} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Species' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Phone:</label>
                            <input {...register("phoneNumber", { required: true })} defaultValue={petSelectedData?.phoneNumber} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Phone Number' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Quantity:</label>
                            <input {...register("quantity", { required: true })} defaultValue={petSelectedData?.quantity} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Queantity' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Age:</label>
                            <input {...register("age", { required: true })} defaultValue={petSelectedData?.age} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Age' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Gender:</label>
                            <input {...register("gender", { required: true })} defaultValue={petSelectedData?.gender} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Gender' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Breed:</label>
                            <input {...register("breed", { required: true })} defaultValue={petSelectedData?.breed} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Breed' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Weight:</label>
                            <input {...register("weight", { required: true })} defaultValue={petSelectedData?.weight} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Weight' type="text" />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="">Distric:</label>
                            <input {...register("district", { required: true })} defaultValue={petSelectedData?.address?.district} className='w-full input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Distric' type="text" />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="">Division:</label>
                            <input {...register("division", { required: true })} defaultValue={petSelectedData?.address?.division} className='w-full input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Division' type="text" />
                        </div>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="">Description:</label>
                        <textarea onChange={(e) => setIsDescription(e.target.value)} defaultValue={petSelectedData?.description} className='w-full textarea border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Description...' />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='btn bg-[#E76F51] text-white rounded-xl border-0'>Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
       </UserProtectedRoute>
    );
};

export default UserDataUpdate;