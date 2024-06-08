import Link from 'next/link';
import React from 'react';
import { BiSupport } from 'react-icons/bi';
import { GoProjectRoadmap } from 'react-icons/go';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { RiProfileLine } from 'react-icons/ri';
import { SiExpertsexchange } from 'react-icons/si';

export default function Sidebar() {
  const itemMenuClass =
    'flex w-full items-center rounded-lg pl-3 py-3 text-start leading-tight outline-none transition-all hover:bg-blue-50 hover:bg-opacity-80 hover:text-blue-900 focus:bg-blue-50 focus:bg-opacity-80 focus:text-blue-900 active:bg-blue-50 active:bg-opacity-80 active:text-blue-900';
  return (
    <>
      <div className='relative flex w-[200px] flex-col lg:w-[270px]'>
        <div className='mb-3 ml-4'>
          <h3 className='text-lg'>Welcome Back</h3>
          <div className='text-xs text-gray-600'>
            Access world-class freelance developers, designers, and marketers.
          </div>
        </div>
        <nav className='gap-1 font-sans text-sm font-normal text-gray-700'>
          <Link href='/admin/projects' className={itemMenuClass}>
            <GoProjectRoadmap className='mr-4 h-5 w-5' />
            Projects
          </Link>
          <Link href='/admin/experts' className={itemMenuClass}>
            <SiExpertsexchange className='mr-4 h-5 w-5' />
            Experts
          </Link>

          <Link href='/admin/profile' className={itemMenuClass}>
            <RiProfileLine className='mr-4 h-5 w-5' />
            My profile
          </Link>
          <Link href='/admin/support' className={itemMenuClass}>
            <BiSupport className='mr-4 h-5 w-5' />
            Support
          </Link>
          <div className='border-slate-200 my-3 border-t'></div>

          <Link href='/user/account' className={itemMenuClass}>
            <MdOutlineAccountCircle className='mr-4 h-5 w-5' />
            Account
          </Link>
        </nav>
      </div>
    </>
  );
}
