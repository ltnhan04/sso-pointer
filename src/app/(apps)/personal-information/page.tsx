"use client"
import Sidebar from '@/components/ui/sidebar'
import React, { useState } from 'react'
import HeaderComponent from '../../../../components/headerComponent'
import AvatarDefault from '../../../../public/images/avatardefault.png'
import { MdModeEdit } from "react-icons/md";
import { IoMdUnlock } from "react-icons/io";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { schema, SchemaPassword } from '../../../schemaValidations/form.schema'
import { IoClose } from "react-icons/io5"
import Image from 'next/image';
export default function PersonalInformationPage() {
  const [hideForm, setHideForm] = useState<boolean>(false)
  const handleClick = () => {
    setHideForm(prev => !prev)
  }

  const { register, handleSubmit, formState: { errors } } = useForm<SchemaPassword>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: SchemaPassword) => {
    console.log(data);
  };
  return (
    <div className='w-full h-screen overflow-auto'>
      <HeaderComponent title='Personal Information' />
      <Sidebar />
      <div id='Content' className='mt-[125px] max-w-[1300px] lg:mt-[100px] lg:ml-[320px] mx-auto p-8 border'>
        <div id="Information-Detail">
          <div id="Avatar" className='grid grid-cols-[1fr_80px] lg:grid-cols-[1fr_80px] border-b-[1px] py-6 '>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_1fr]'>
              <p className='text-gray-900 font-bold text-lg'>Avatar Profile</p>
              <p>Avatar create unique for your account</p>
            </div>
            <div className='lg:w-fit flex justify-center items-center'>
              <Image src={AvatarDefault} alt='Avatar' width={60} height={60} className='border-[1px] object-cover rounded-full' />
            </div>
          </div>

          <div id="Name" className='grid grid-cols-[1fr_80px] lg:grid-cols-[1fr_80px] border-b-[1px] py-6 '>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_200px]'>
              <p className='text-gray-900 font-bold text-lg'>Name</p>
              <p>SanqDuonq</p>
            </div>
            <div className='lg:w-fit flex justify-center items-center'>
              <MdModeEdit className='size-[25px]' />
            </div>
          </div>

          <div id="Name" className='grid grid-cols-[1fr_80px] lg:grid-cols-[1fr_80px] border-b-[1px] py-6 '>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_200px]'>
              <p className='text-gray-900 font-bold text-lg'>Email</p>
              <p>namsang0902s@gmail.com</p>
            </div>
            
          </div>

          <div id="Name" className='grid grid-cols-[1fr_80px] lg:grid-cols-[1fr_80px] border-b-[1px] py-6 '>
            <div className='flex flex-col lg:grid lg:grid-cols-[200px_200px]'>
              <p className='text-gray-900 font-bold text-lg'>Join</p>
              <p>09-02-2024</p>
            </div>
          </div>

          <div className='pt-6 rounded-[4px] text-[#0094FF] active:opacity-60 transition-opacity duration-300'>
            <button onClick={handleClick} className='underline'>Change Password?</button>
          </div>
        </div>

        {hideForm && (
          <div>
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20"></div>
            <div id="Change Password" className={`fixed inset-0 flex items-center justify-center z-30`}>
              <div className="border-[1px] px-6 py-8 bg-white rounded-[4px] space-y-[40px] w-[450px] relative">
                <p className="flex items-center justify-center">
                  <IoMdUnlock className="text-5xl absolute top-[-30px] bg-[#cee3f3] text-[#0094FF] rounded-[4px] p-2" />
                </p>
                <div>
                  <p className="text-center text-3xl font-bold">Change Password</p>
                  <p className="text-gray-400 text-center">Must be at least 8 characters</p>
                </div>
                <div className=' absolute top-[-10px] right-[30px] cursor-pointer transition-all duration-300' onClick={handleClick} >
                  <IoClose className='text-3xl' />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-[5px]">
                    <div className="space-y-[10px] h-[70px]">
                      <input
                        type="password"
                        {...register('password')}
                        className={`w-full border-b-[1px] ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-black  py-2 outline-none`}
                        placeholder="Password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-[10px] h-[70px]">
                      <input
                        type="password"
                        {...register('newPassword')}
                        className={`w-full border-b-[1px] ${errors.newPassword ? 'border-red-500' : 'border-b-gray-300'} focus:border-black  py-2 outline-none`}
                        placeholder="New password"
                      />
                      {errors.newPassword && (
                        <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
                      )}
                    </div>

                    <div className='space-y-[10px] h-[70px]'>
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`w-full border-b-[1px] ${errors.confirmPassword ? 'border-red-500' : 'border-b-gray-300'} focus:border-black py-2 outline-none`}
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                    <div>
                      <button type="submit" className="bg-[#0094FF] w-full text-white p-2 rounded-[4px] active:opacity-60 transition-opacity duration-300">Reset password</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

