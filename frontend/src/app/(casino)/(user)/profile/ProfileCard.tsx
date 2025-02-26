"use client"

import { useUser } from "@/hooks/useUser";
import { GiTwoCoins } from "react-icons/gi";
import { GrStatusUnknown } from "react-icons/gr"
import { IoIosStats } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { FaShieldAlt } from "react-icons/fa";
import { useModal } from "@/hooks/useModal";
import { IoLogInOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { changeUserAvatar, changeUserPassword, getProfileData } from "@/lib/clientRequests";
import Link from "next/link";
import { RiLockPasswordLine } from "react-icons/ri";
import Image from "next/image";
import { avatarUrls } from "@/lib/config";
import { revalidatePath } from "next/cache";
import { FaCheck } from "react-icons/fa6";
import { request } from "http";

export default function ProfileCard() {

    const { user, signOut, updateUser } = useUser() ?? { user: null };
    const { toggleModal, openModal } = useModal()

    const [stats, setStats] = useState<any>(null)

    const { requestMe } = useUser() ?? { user: null };

    const [isAvatarsButtonActive, setIsAvatarsButtonActive] = useState<boolean>(false)
    const [passwordChanged, setPasswordChanged] = useState<{
        message: string | null
    }>({
        message: null
    })

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (user) {
            requestMe?.()
        }
    }, [])

    useEffect(() => {
        if (user) {
            getProfileStats()
        }
    }, [user])

    async function getProfileStats() {
        const response = await getProfileData()

        if (!response) {
            throw new Error('Failed to fetch profile data');
        }

        setStats(response.stats)
        
    }

    if (!user) return (
        <div className="w-full bg-custom-gray-700 p-3">
                    <h4 className=" text-custom-gray-100 flex flex-row gap-1 items-center"><FaShieldAlt /> Authentication </h4>
                    <p className="text-xs py-2 text-custom-gray-400">If you need to see your account, you can log in here</p>
                    <button onClick={() => {
                        toggleModal('authentication')
                        openModal()
                    }} className="w-full bg-custom-gray-900 p-2 rounded text-sm text-custom-gray-300 flex items-center gap-1 justify-center"> <IoLogInOutline /> Sign in</button>
                </div>
    );

    if (!stats) return

    return (
        <>
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-3">
                            <span className="w-16 h-16 md:w-24 md:h-24 bg-custom-gray-700 rounded">
                            {user && 
                                                                (
                                                                    <>
                                                                    <Image
                                                                    src={`http://localhost:8000/${avatarUrls[user.avatarId.toString()]}`}
                                                    
                                                                    alt="avatar"
                                                                    width={80}
                                                                    height={80}
                                                                    className="w-full h-full object-contain rounded"
                                                                    />
                                                                    </>
                                                                )}
                            </span>
                            <h4 className="text-xl text-custom-gray-300">{user && user.username}</h4>
                            {user && user.username == 'admin' && (<Link href="/admin/wallets" className="text-custom-green-500">Admin</Link>)}
                        </div>


                        <div className="flex flex-col gap-2 items-start my-4">
                            <span className="block text-xs text-custom-gray-400">Pakeisti avatarą</span>
                            <form 
                            className="flex flex-row gap-2 items-end justify-start"
                            action={async (formData: FormData) => {
                                const avatar = formData.get('avatar') as string | null;
                                console.log(avatar)

                                if (!avatar) {
                                    return alert('Please select an avatar')
                                }

                                const data = await changeUserAvatar(avatar)

                                if (data.message === 'Avatar changed successfully') {
                                    updateUser({
                                        ...user,
                                        avatarId: parseInt(avatar)
                                    })
                                }

                            }}>
                                        <ul className="grid w-full gap-2 grid-cols-5 md:grid-cols-5">

                                            {Object.keys(avatarUrls).map((key, index) => (
                                                <li key={index}>
                                                    <input type="radio" id={`avatar-${key}`} name="avatar" value={`${key}`} className="hidden peer" required onChange={() => setIsAvatarsButtonActive(true)} />
                                                    <label htmlFor={`avatar-${key}`} className="inline-flex items-center justify-between w-full text-gray-500 bg-black border border-custom-gray-900 rounded cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-yellow-500 peer-checked:border-yellow-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                                                        {user && 
                                                                (
                                                                    <>
                                                                    <Image
                                                                    src={`http://localhost:8000/${avatarUrls[key]}`}
                                                    
                                                                    alt="avatar"
                                                                    width={40}
                                                                    height={40}
                                                                    className="w-full h-full object-contain rounded"
                                                                    />
                                                                    </>
                                                                )}
                                                    </label>
                                                </li>
                                            ))}
                                    </ul>

                                    <button className={` text-custom-gray-200 font-bold bg-custom-gray-700 mt-1 text-xs p-2 px-4 w-fit rounded hover:bg-custom-gray-800
                                        ${isAvatarsButtonActive ? 'inline' : 'hidden'}`} type="submit" ><FaCheck /></button>
                            </form>
                        </div>

                    <p className="text-sm text-custom-gray-400">Jūsų profilio informacija</p>

                    <div className="flex flex-row gap-2 items-center justify-center">

                        


                        <span className="text-sm text-custom-gray-400 flex flex-row items-center gap-1 bg-custom-gray-800 p-2 rounded">Lygis <p className="text-custom-green-500"> 
                            {user.xp && 
                            (user.xp < 100 ? 'Naujokas' :
                            user.xp < 250 ? 'Patyręs' :
                            user.xp < 500 ? 'Žaidėjas' : 'Priklausomas')} 
                            </p></span>
                        

                        <div className="w-full flex flex-col h-full gap-1 items-end">

                            {user.xp != null && 
                            <>
                                <span className="w-full bg-custom-gray-500 h-1">
                                    <span className={`bg-custom-green-500 h-1 block 
                                    ${
                                    user.xp < 10 ? `w-[10%]` :
                                    user.xp < 25 ? `w-[25%]` :
                                    user.xp < 50 ? `w-[50%]` :
                                    user.xp < 100 ? `w-[75%]` :

                                    user.xp < 125 ? `w-[10%]` :
                                    user.xp < 150 ? `w-[25%]` :
                                    user.xp < 200 ? `w-[50%]` :
                                    user.xp < 250 ? `w-[75%]` :

                                    user.xp < 275 ? `w-[10%]` :
                                    user.xp < 325 ? `w-[25%]` :
                                    user.xp < 375 ? `w-[50%]` :
                                    user.xp < 500 ? `w-[75%]` :
                                     'w-[0%]' }`}></span>
                                </span>
                            
                                <span className="text-sm text-custom-gray-400">{Number(user.xp)} / 
                                {user.xp != null && 
                                (user.xp < 100 ? '100' :
                                user.xp < 250 ? '250' :
                                user.xp < 500 ? '500' : '-')} 
                                </span>
                            </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>

          

            <div className="w-full flex flex-col gap-4">
                {/* <div className="flex flex-col gap-2">

                </div> */}
                <div className="flex flex-col w-full mx-auto py-3 gap-4 px-4 md:px-8
                                shadow-lg bg-custom-gray-700 rounded">
                    <h4 className="flex gap-2 items-center"><IoIosStats className="text-custom-gray-300" />Statistika</h4>
                    <div className="h-px bg-custom-gray-500 w-full"></div>

                    <ul className="w-full flex flex-col gap-2 items-start">
                        <li className="w-full flex flex-row justify-between">
                            <span className="text-sm text-custom-gray-300">Išviso pastatyta</span>
                            <span className="text-sm text-custom-gray-300 flex gap-1 items-center">{stats.totalWagered / 100} <GiTwoCoins className="text-custom-yellow-500 text-lg" /></span>
                        </li>

                        <li className="w-full flex flex-row justify-between">
                            <span className="text-sm text-custom-gray-300">Laimeta</span>
                            <span className="text-sm text-custom-gray-300 flex gap-1 items-center">{stats.totalWon / 100} <GiTwoCoins className="text-custom-yellow-500 text-lg" /></span>
                        </li>

                        <li className="w-full flex flex-row justify-between">
                            <span className="text-sm text-custom-gray-300">Pralošta</span>
                            <span className="text-sm text-custom-gray-300 flex gap-1 items-center">{stats.totalLost / 100} <GiTwoCoins className="text-custom-yellow-500 text-lg" /></span>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="w-full flex flex-col gap-4">
                {/* <div className="flex flex-col gap-2">

                </div> */}
                <div className="flex flex-col w-full mx-auto py-3 gap-4 px-4 md:px-8
                                shadow-lg bg-custom-gray-700 rounded">
                    <h4 className="flex gap-2 items-center"><RiLockPasswordLine  className="text-custom-gray-300" />Pakeisti slaptažodį</h4>
                    <div className="h-px bg-custom-gray-500 w-full"></div>

                    <form 
                        ref={formRef}
                        action={async (formData: FormData) => {
                            const newPassword = formData.get('newPassword') as string | null;
                            const confirmPassword = formData.get('confirmPassword') as string | null;
                            const oldPassword = formData.get('oldPassword') as string | null;
                        
                            if (!newPassword || !confirmPassword || !oldPassword) {
                                setPasswordChanged({ message: 'All password fields must be filled out' })
                              return 
                            }
                        
                            if (newPassword !== confirmPassword) {
                                setPasswordChanged({ message: 'Passwords do not match' })
                              return 
                            }
                        
                            let data;

                            try {
                                data = await changeUserPassword(oldPassword, newPassword)
                            } catch (error) {
                                console.log(error)
                                return alert('Failed to change password');
                            }



                            console.log(data)
                            setPasswordChanged(data)

                            if (data.message === 'Password changed successfully') {
                                formRef.current?.reset()
                            }
                          }}
                        className="flex flex-col gap-1 
                        [&>input]:bg-custom-gray-900 [&>input]:outline-none [&>input]:p-2 [&>input]:text-sm">
                        <input type="password" name="oldPassword" placeholder="Senas slaptažodis" />
                        <input type="password" name="newPassword" placeholder="Naujas slaptažodis" />
                        <input type="password" name="confirmPassword" placeholder="Pakartotinas slaptažodis" />

                        <p className="text-xs text-custom-gray-400">Prašome įvesti savo seną slaptažodį, tada naują norimą slaptažodį ir patvirtinkite pakeitimą</p>

                        <p className={`text-custom-yellow-500 text-xs`}>{passwordChanged.message}</p>
                        {/* <p className={`text-green-500 text-xs hidden ${passwordChanged.message != null && 'block'}`}>{passwordChanged.message != null && passwordChanged.message }</p> */}
                        <button className="text-custom-gray-200 bg-custom-gray-900 mt-6 text-sm p-2 px-4 w-fit rounded hover:bg-custom-gray-800" type="submit">Keisti slaptažodį</button>
                    </form>
                </div>
            </div>



            {/* logout button */}
            {user && (
                <div className="w-full bg-custom-gray-700 p-3">
                    <h4 className=" text-custom-gray-100 flex flex-row gap-1 items-center"><FaShieldAlt /> Autentifikavimas </h4>
                    <p className="text-xs py-2 text-custom-gray-400">Jeigu norite pakeisti paskyra, galite atsijungti čia</p>
                    <button onClick={signOut} className="w-full bg-custom-gray-900 p-2 rounded text-sm text-custom-gray-300 flex items-center gap-1 justify-center"> <IoLogOutOutline /> Atsijungti</button>
                </div>
            )}

        </>
    )

    // return (
    //     <>Hello world</>
    // )


}