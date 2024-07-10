import { useNavigate } from "react-router-dom";
import image from '../assets/img.jpg';
import axios from "axios";
import { ChangeEvent, useState } from "react";
import Cookies from "js-cookie";

interface Data1 {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

interface Data2 {
    email: string;
    password: string;
}

interface signinresponse{
    data: {accessToken: string, refreshToken: string},
    status: number
}

const LoginPage = ({ term }: { term: string }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Data1 | Data2>(
        term === 'signup'
            ? {
                name: '',
                email: '',
                password: '',
                passwordConfirmation: ''
            }
            : {
                email: '',
                password: ''
            }
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlesignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = "http://localhost:1337/api/users";

        // Validate password confirmation
        if ('passwordConfirmation' in formData && formData.password !== formData.passwordConfirmation) {
            setFormData(prevData => ({
                ...prevData,
                password: '',
                passwordConfirmation: ''
            }));
        }

        try {
            const response = await axios.post(url, formData);
            console.log(response); // Assuming server responds with useful data
            if(response.status !== 201){ navigate('/signup');}
            navigate('/');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handlesignin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const url = "http://localhost:1337/api/sessions";

        try {
            const response = (await axios.post(url, formData)) as signinresponse;
            if(response.status == 200){
                Cookies.set('accessToken', response.data.accessToken, { expires: new Date(Date.now() + 15 * 60 * 1000) });
                Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) });
                console.log(Cookies.get('accessToken'));
                // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
            }
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    const inputclass = "border rounded border-solid p-2 mb-2 md:w-80 lg:w-100 xl:w-120";
    const signclass = "border rounded border-solid border-sky-700 bg-sky-500 p-2 text-slate-100 mt-1 font-medium md:w-80 lg:w-100 xl:w-120";
    const formsize = `bg-gray-200 ${term === 'signup' ? 'p-14' : 'p-24'} pl-10 pr-10`;

    return (
        <div className="flex items-center justify-center mt-40">
            <div>
                <form onSubmit={term === 'signin' ? handlesignin : handlesignup} className={formsize}>
                    <p className="font-extrabold">Welcome to the Video Streaming Platform</p><br />
                    {term === 'signup' &&
                        <>
                            <label>Username</label>
                            <div>
                                <input type="text" name="name" id="name" className={inputclass} onChange={handleChange} required />
                            </div>
                        </>
                    }
                    <label>Email</label>
                    <div>
                        <input type="email" name="email" id="email" className={inputclass} onChange={handleChange} required />
                    </div>
                    <label>Password</label>
                    <div>
                        <input type="password" name="password" id="password" className={inputclass} onChange={handleChange} required />
                    </div>
                    {term === 'signup' &&
                        <>
                            <label>Confirm Password</label>
                            <div>
                                <input type="password" name="passwordConfirmation" id="passwordConfirmation" className={inputclass} onChange={handleChange} required />
                            </div>
                        </>
                    }
                    <div>
                        <button type="submit" className={signclass}>{term === 'signup' ? 'Sign Up' : 'Sign In'}</button>
                    </div>
                </form>
            </div>
            <div>
                <img src={image} alt="app" className="max-w-xl" />
            </div>
        </div>
    )
}

export default LoginPage;
