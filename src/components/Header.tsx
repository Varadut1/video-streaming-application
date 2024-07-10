import { Link } from "react-router-dom";

const Header = () => {
    const glow:string = 'hover:text-sky-500 hover:shadow-lg transition duration-300 mr-5'
    return (
        <div className="text-slate-100 font-medium bg-zinc-900 p-6 flex justify-between">
            <Link to="/" className={glow}> Home </Link>
            <Link to="/protected" className={glow}> Protected </Link>
            <div>
                <Link to="/Signup" className={glow}> SignUp </Link>
                <Link to="/Signin" className={glow}> SignIn </Link>
            </div>
        </div>
    )
}

export default Header;