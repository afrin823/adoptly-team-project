"use client"
import { SidebarTrigger } from '../ui/sidebar';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser/useUser';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserDashboardHeader = () => {

    const { user, loading, logoutSystem } = useAuth();
    const [userData, userRefetch, userLoading] = useUser();
    console.log('checking user data', userData);

    return (
        <div className='border px-5 py-2'>
            <div className='flex items-center justify-between '>
                <div>
                    <SidebarTrigger />
                </div>
                <div className='flex items-center space-x-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="w-12 h-12 rounded-full cursor-pointer">
                                <img
                                    className='w-full h-full rounded-full'
                                    src={`${userData?.photo ? userData?.photo : "https://i.ibb.co.com/0VpT31Vw/user.png"}`}
                                    width={500}
                                    height={300}
                                    alt=""
                                />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>
                                <Link href={"/"} className="justify-between">
                                    Home
                                </Link>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <p className='cursor-pointer' onClick={logoutSystem}>Logout</p>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div className='flex flex-col'>
                        <p className='font-bold'>Hello</p>
                        <p className='text-[15px] text-[#E76F51]  font-bold'>
                            {
                                userLoading ? (
                                    <div className="w-20 h-5 rounded-sm animate-pulse bg-gray-200"></div>
                                ) : (
                                    userData?.name || "Men"
                                )
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardHeader;