"use client"
import UserProtectedRoute from '@/components/protectedRoute/UserProtectedRoute';
import useAxiosPublic from '@/hooks/axiosPublic/useAxiosPublic';
import useAuth from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const userProfile = () => {

    const [havePet, setHavePet] = useState(null);
    const [isDescription, setIsDescription] = useState("")
    const [openPersonalInfo, setOpenPersonalInfo] = useState(false);
    const [openAddressInfo, setOpenAddressInfo] = useState(false);
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const onOpenPIModal = () => setOpenPersonalInfo(true);
    const onClosePIModal = () => setOpenPersonalInfo(false);
    const onOpenAddModal = () => setOpenAddressInfo(true);
    const onCloseAddModal = () => setOpenAddressInfo(false);



    const { data: userData = [], refetch, isLoading: loading } = useQuery({
        queryKey: ["userData", user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user?.email}`);
            return res.data
        }
    })

    console.log('checking data', userData);


    useEffect(() => {
        setHavePet(userData?.isHavePets)
    }, [userData?.isHavePets])

    const {
        register: register1,
        handleSubmit: handleSubmit1,
        formState: { errors: errors1 },
    } = useForm()

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
    } = useForm()


    // Perosonal Submit form
    const onSubmit1 = async (data) => {
        console.log(data)
    }

    // Address Submit form
    const onSubmit2 = async (data) => {
        console.log(data)
        const otherInfo = {
            address: data.address,
            isHavePets: havePet,
            currentPetsQuantity: data.currentPetsQuantity,
            preferredPetType: data.preferredPetType,
            aboutUser: isDescription
        }

        const res = await axiosPublic.patch(`/user/${user?.email}`, otherInfo)
        if (res.status === 200) {
            refetch()
            onCloseAddModal()
        }

        console.log('checking other information', otherInfo);
    }





    return (
        <UserProtectedRoute>
             <div className='p-5'>
            <div className='flex flex-col justify-center items-center'>
                <div style={{ backgroundImage: `url(${"https://i.ibb.co.com/XrQj0pcg/dark-geometric-background-with-copy-space.jpg"})` }} className='bg-cover bg-center bg-no-repeat border w-full h-40'>
                </div>
                <div className='-mt-20 flex flex-col justify-center items-center gap-2'>
                    <div className='w-32'>
                        <Image className='border rounded-full w-32 h-32' src={userData.photo ? userData?.photo : "https://i.ibb.co.com/WcTWxsN/nav-img.png"} width={500} height={300} alt={userData?.name} />
                    </div>
                    <h1 className='text-xl'>{userData?.name ? userData?.name : "N/A"}</h1>
                </div>
            </div>
            <div className='border my-2'>
                <div className='border-b p-2 flex items-center justify-between'>
                    <p className='font-bold'>Personal Information</p>
                    <button onClick={onOpenPIModal} className='btn rounded-sm bg-[#E76F51] text-white border-0'>Edit</button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2'>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Full Name</h3>
                        <p>{userData?.name ? userData?.name : "N/A"}</p>
                    </div>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Email</h3>
                        <p>{userData?.email ? userData?.email : "N/A"}</p>
                    </div>
                    {/* <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Phone</h3>
                        <p>{userData?.name ? userData?.name : "N/A"}</p>
                    </div>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Date of birth</h3>
                        <p>01/05/2000</p>
                    </div> */}
                </div>
            </div>
            <div className='border my-2'>
                <div className='border-b p-2 flex items-center justify-between'>
                    <p className='font-bold'>Other Information</p>
                    <button onClick={onOpenAddModal} className='btn rounded-sm bg-[#E76F51] text-white border-0'>Edit</button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2'>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Address</h3>
                        <p>{userData?.address ? userData?.address : "N/A"}</p>
                    </div>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Your have pets</h3>
                        <p>{userData?.isHavePets ? "Yes" : "No" || "N/A"}</p>
                    </div>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>How many pets are there</h3>
                        <p>{userData?.currentPetsQuantity || "N/A"}</p>
                    </div>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Which animal do you like</h3>
                        <p>{userData?.preferredPetType || "N/A"}</p>
                    </div>
                    <div className='py-5 space-y-1'>
                        <h3 className='text-[#686868]'>Your About</h3>
                        <p>{userData?.aboutUser || "N/A"}</p>
                    </div>
                </div>
            </div>
            {/* Personal Info Modal */}
            <Modal open={openPersonalInfo} onClose={onClosePIModal} center>
                <form onSubmit={handleSubmit1(onSubmit1)} className='space-y-2'>
                    <p className='font-semibold'>Personal Info Update</p>
                    <div>
                        <label htmlFor="">Name</label>
                        <input {...register1("name", { required: true })} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your name' type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Phone</label>
                        <input {...register1("phone_number", { required: true })} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your phone number' type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Date Of Birth</label>
                        <input {...register1("dob", { required: true })} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your phone number' type="date" />
                    </div>
                    <div className='text-center'>
                        <button className='btn text-center border-0 bg-[#e76f51] text-white'>Submit</button>
                    </div>
                </form>
            </Modal>
            {/* Address Info Modal */}
            <Modal open={openAddressInfo} onClose={onCloseAddModal} center>
                <form onSubmit={handleSubmit2(onSubmit2)} className='space-y-2'>
                    <p className='font-semibold'>Address Info Update</p>
                    <div>
                        <label htmlFor="">Address</label>
                        <input {...register2("address", { required: true })} defaultValue={userData?.address} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your address' type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Your have pets?</label>
                        <div className='flex items-center gap-5 my-2'>
                            <div className='flex items-center gap-2'>
                                <p>Yes</p>
                                <input onClick={() => setHavePet(true)} checked={havePet} type="checkbox" className="checkbox border-2 border-[#bbb] checkbox-neutral" />
                            </div>
                            <div className='flex items-center gap-2'>
                                <p>No</p>
                                <input onClick={() => setHavePet(false)} checked={!havePet} type="checkbox" className="checkbox border-2 border-[#bbb] checkbox-neutral" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">How many pets are there</label>
                        <input {...register2("currentPetsQuantity", { required: true })} defaultValue={userData?.currentPetsQuantity} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your quantity' type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Which animal do you like</label>
                        <input {...register2("preferredPetType", { required: true })} defaultValue={userData?.preferredPetType} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your animal' type="text" />
                    </div>
                    <div>
                        <label htmlFor="">Your About</label>
                        <textarea onChange={(e) => setIsDescription(e.target.value)} defaultValue={userData?.aboutUser} className='w-full border border-[#bbbb] bg-white text-black dark:bg-black dark:text-white input focus:outline-0' placeholder='Enter your about' type="text" />
                    </div>
                    <div className='text-center'>
                        <button className='btn text-center border-0 bg-[#e76f51] text-white'>Submit</button>
                    </div>
                </form>
            </Modal>


            {/* <div>
                <div>
                    <input className='input bg-white border border-[#bbb] focus:outline-0 text-black' type="text" />
                </div>
            </div> */}
        </div>
       </UserProtectedRoute>
    );
};

export default userProfile;