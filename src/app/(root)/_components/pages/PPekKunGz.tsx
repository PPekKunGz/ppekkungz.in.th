import Link from 'next/link';
import ppekkungz from '../../../../../data/ppekkungz.json';
import { FaCode } from "react-icons/fa";
import React from 'react';

export default function PPekKunGz() {
    const data = ppekkungz;

    return (
        <div className='flex flex-auto lg:w-[1200px] sm:w-[400px] w-[350px] gap-5 flex-wrap justify-center' id='PPekKunGz'>
        </div>
    )
}