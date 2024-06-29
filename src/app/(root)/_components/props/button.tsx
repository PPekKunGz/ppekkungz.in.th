
import Link from "next/link";
import React, { FunctionComponent, ReactNode } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

interface LinkButtonProps {
  text: string
  link: string
  className?: string
  children?: ReactNode
}

const Button: FunctionComponent<LinkButtonProps> = ({ text, link, className = "", children }) => {
    return (
        <div className="border-2 border-black/20 w-full h-fit py-2 text-black text-base text-center rounded-lg">
            <div className="flex justify-between mx-3 items-center">
            <div className="flex gap-2">
                <div className={className}>{children}</div>
                <p>{text}</p>
                <div className="text-green-200">
                <MdVerified size={22}/>
                </div>
            </div>
            <Link href={link} target="_blank" className="text-gray-500 hover:text-gray-100 cursor-pointer">
                <FaArrowUpRightFromSquare />
            </Link>
            </div>
        </div>
    )
};

export default Button;