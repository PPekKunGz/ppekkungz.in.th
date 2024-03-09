import Dimension from "@/components/pages/Dimension";
import PPekKunGz from "@/components/pages/PPekKunGz";


export default function Contents() {
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div id="PPekKunGz">
                <PPekKunGz />
            </div>
            <div className="mt-5" />
            <div id="Dimension">
                <Dimension />
            </div>
        </main>
    )
}