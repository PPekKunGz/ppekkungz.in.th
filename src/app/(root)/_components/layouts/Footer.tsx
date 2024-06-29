import Link from "next/link"

export default function Footer() {
    return (
        <footer className="text-white p-3 bg-[#070714] flex items-center justify-center">
                <p>Copyright &copy; 2021-2024 - All right reserved by
                    <Link href="https://github.com/PPekKunGz" className="hover:text-red-400"> PPekKunGzDev </Link>
                    &
                    <Link href="https://github.com/mckimkung" className="hover:text-red-400"> MCKimKunG</Link>
                </p>
        </footer>
    )
}