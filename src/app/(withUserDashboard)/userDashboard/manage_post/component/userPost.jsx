"use client"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import { FaCircleUser } from 'react-icons/fa6';
import UserDataUpdate from './userDataUpdate';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { FaCamera } from 'react-icons/fa';
import Link from 'next/link';
const IMG_API_KEY = process.env.NEXT_PUBLIC_IMG_HOSTING;
const IMG_HOSTING = `https://api.imgbb.com/1/upload?key=${IMG_API_KEY}`

const UserPost = ({ user, refetch, loading, userPostData, open, onOpenModal, onCloseModal }) => {

    const [isDescription, setIsDescription] = useState("");
    const axiosPublic = useAxiosPublic()
    // Pets data Update Modal
    const [petDataOpen, setPetDataOpen] = useState(false);
    const onPetDataOpenModal = () => setPetDataOpen(true);
    const onPetDataCloseModal = () => setPetDataOpen(false);
    // Pets data update selected statement
    const [petSelectedData, setPetSelectedData] = useState(null);
    // Image hosting statement
    const [imageHosting, setImageHosting] = useState("");
    const [imgHostingLoading, setImgHostingLoading] = useState(false);
    const userDataLoading = 10


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log('checking data', data);
        const userPostData = {
            name: data.name,
            image: imageHosting || "",
            description: isDescription || "",
            age: parseInt(data.age) || "",
            gender: data.gender || "",
            breed: data.breed || "",
            species: data.species || "",
            weight: parseInt(data.weight) || "",
            vaccinated: data.vaccinated || false,
            address: {
                district: data.district || "",
                division: data.division || "",
            },
            adoptedCount: 0,
            quantity: parseInt(data.quantity) || 1,
            phoneNumber: data.phoneNumber || "",
            userEmail: user?.email || "",
            status: "pending",
            isAdopted: false,
        };

        console.log('checking final data', userPostData);

        try {
            const res = await axiosPublic.post(`/pets`, userPostData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('checking update', res)
            if (res.status === 201) {
                refetch()
                onCloseModal()
            }
        } catch (error) {
            console.log(error)
        }

    }

    // Pet Delete Function
    const handlePetDelete = (id) => {
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
                const res = await axiosPublic.delete(`/pets/${id}`);
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


    const handleImageHosting = async (event) => {
        const imageSelected = event.target.files[0];
        setImgHostingLoading(true)
        const formData = new FormData()
        formData.append("image", imageSelected);
        try {
            const res = await fetch(`${IMG_HOSTING}`, {
                method: "POST",
                body: formData
            })
            const data = await res.json();
            if (data.success) {
                setImageHosting(data.data.url);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setImgHostingLoading(false)
        }
    }

    return (
        <div>
            <div className="w-full overflow-x-auto rounded-box border border-base-content/5 ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-black'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Weight</th>
                            <th>Breed</th>
                            <th>Species</th>
                            <th>Queantity</th>
                            <th>Contact</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            userPostData.length > 0 ? (
                                userPostData.map(pets => (
                                    <tr className='my-20'>
                                        <th>
                                            <div className='w-16 h-16'>
                                                {
                                                    pets.image ? (
                                                        <Image className='w-full h-full rounded-full' src={pets.image} width={500} height={300} alt='' />
                                                    ) : (
                                                        <FaCircleUser className='text-5xl' />
                                                    )
                                                }
                                            </div>
                                        </th>
                                        <td>{pets?.name}</td>
                                        <td>{pets?.age}</td>
                                        <td>{pets?.gender}</td>
                                        <td>{pets?.weight}</td>
                                        <td>{pets?.breed}</td>
                                        <td>{pets?.species}</td>
                                        <td>{pets?.quantity}</td>
                                        <td>
                                            <div className='flex flex-col gap-2'>
                                                <span>{pets?.phoneNumber}</span>
                                                <span>{pets?.userEmail}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-col gap-2'>
                                                <span>{pets?.address.district}</span>
                                                <span>{pets?.address.division}</span>
                                            </div>
                                        </td>
                                        <td>{pets?.status}</td>
                                        <td>
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="btn bg-white text-black shadow-none border border-[#bbb] m-1">...</div>
                                                <ul tabIndex={0} className="space-y-2 dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
                                                    <li className='bg-[#219ebc] text-white'><Link href={`/userDashboard/manage_post/${pets?._id}`}>Total Request</Link></li>
                                                    <li className='bg-[#219ebc] text-white' onClick={() => { onPetDataOpenModal(), setPetSelectedData(pets) }}><a>Update</a></li>
                                                    <li className='bg-[#c1121f] text-white' onClick={() => handlePetDelete(pets?._id)}><a>Delete</a></li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <>
                                    {
                                        loading && (
                                            [...Array(userDataLoading)].map((_, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-14 h-14 rounded-full bg-gray-200"></div>
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
                                                            <div className="w-14 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex items-center animate-pulse space-x-4">
                                                            <div className="w-14 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex flex-col animate-pulse space-y-2">
                                                            <div className="w-20 h-5 animate-pulse bg-gray-200"></div>
                                                            <div className="w-32 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex flex-col animate-pulse space-y-2">
                                                            <div className="w-20 h-5 animate-pulse bg-gray-200"></div>
                                                            <div className="w-32 h-5 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="w-full flex flex-col animate-pulse space-y-2">
                                                            <div className="w-20 h-5 animate-pulse bg-gray-200"></div>
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
                                                            <div className="w-16 h-10 animate-pulse bg-gray-200"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                    {
                                        !loading && (
                                            <tr>
                                                <td></td>
                                                <td></td>
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
                </table>
            </div>
            <UserDataUpdate
                refetch={refetch}
                petSelectedData={petSelectedData}
                petDataOpen={petDataOpen}
                onPetDataCloseModal={onPetDataCloseModal}
            />
            <Modal open={open} onClose={onCloseModal} center>
                <p className='my-5 font-bold'>Create Post</p>
                <div className='flex justify-center items-center'>
                    <div className="relative w-28 h-28 mb-5 rounded-full">
                        <Image
                            className='w-full h-full rounded-full'
                            src={imageHosting ? imageHosting : "https://i.ibb.co/WcTWxsN/nav-img.png"}
                            width={500}
                            height={300}
                            alt={""}
                        />

                        <div onClick={() => document.querySelector('input[type="file"]').click()} className={`absolute cursor-pointer bottom-0 right-0 ${imgHostingLoading ? "bg-[#39b9ca]" : "bg-[#cfcfcf]"}  p-2 w-10 h-10 flex justify-center items-center rounded-full`}>
                            {
                                imgHostingLoading ? <span className="loader"></span> : <FaCamera className=' text-xl' />
                            }

                            <input onChange={handleImageHosting} hidden type="file" />
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className=' space-y-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                        <div>
                            <label htmlFor="">Name:</label>
                            <input {...register("name", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Email' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Species:</label>
                            <input {...register("species", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Species' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Phone:</label>
                            <input {...register("phoneNumber", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Phone Number' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Quantity:</label>
                            <input {...register("quantity", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Queantity' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Age:</label>
                            <input {...register("age", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Age' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Gender:</label>
                            <input {...register("gender", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Gender' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Breed:</label>
                            <input {...register("breed", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Breed' type="text" />
                        </div>
                        <div>
                            <label htmlFor="">Weight:</label>
                            <input {...register("weight", { required: true })} className='input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Weight' type="text" />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="">Distric:</label>
                            <input {...register("district", { required: true })} className='w-full input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Distric' type="text" />
                        </div>
                        <div className='w-full'>
                            <label htmlFor="">Division:</label>
                            <input {...register("division", { required: true })} className='w-full input border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Enter Your Division' type="text" />
                        </div>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="">Description:</label>
                        <textarea onChange={(e) => setIsDescription(e.target.value)} className='w-full textarea border border-[#bbb] focus:outline-0 bg-white text-black dark:bg-black dark:text-white' placeholder='Description...' />
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='btn bg-[#E76F51] text-white rounded-xl border-0'>Submit</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UserPost;