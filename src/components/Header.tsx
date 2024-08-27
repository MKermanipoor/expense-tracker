import { MdAccountBox } from "react-icons/md";

const Header: React.FC = () => {
    return (
        <div className="bg-blue-400 h-12 fixed top-0 left-0 w-screen flex flex-row-reverse items-center z-10">
            <MdAccountBox className="mr-6 text-3xl text-white"/>
        </div>
    )
}

export default Header;