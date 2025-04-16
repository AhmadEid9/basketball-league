import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff} from "lucide-react"
import {Toaster, toast} from 'sonner'
import { useNavigate } from "react-router-dom";
import darkTheme from "../themes/dark.js";
import "../App.css";
export const Login = () => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  }

  const resetFormData = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
      email,
      password
    }

    try{
      const res = await axios.post('http://localhost:8000/api/auth/login', userData);
      localStorage.setItem('token', res.data.token);
      toast.success("Login successful");
      
      resetFormData();

      setTimeout(() => {toast.success("Redirecting to home page")}, 2000);
      setTimeout(() => {navigate("/")}, 3000);
    } catch (err){
      console.log(err);
      
      toast.error("Error: " + err.response.data.message);

    }
  }
  return (
    <div className='h-screen flex flex-col items-center pt-6'>
      <h1 className='font-bold underline text-4xl mb-6 p-5 hover:no-underline hover:border hover:border-purple-500 hover:rounded inline-block transition-all duration-200'>Welcome! Great to have you joining us!!</h1>
      <div className={'w-1/2 h-fit bg-gradient-to-r flex justify-center py-6' + darkTheme.orangeGradient}>
        <div className='w-8/9 h-full border-gray-300 border py-4 rounded-2xl bg-[#1d1d1d] p-2'>
          <div className="w-full flex flex-col items-center">
            <div className="space-y-4 w-full max-w-2xl mx-auto">
              <div className="flex items-center gap-6 p-2 w-full">
                <label htmlFor="email" className="w-1/4 text-right">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="Your email"
                  className="pl-3 border border-gray-300 p-2 rounded-2xl w-3/4"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="flex items-center gap-6 p-2 w-full">
                <label htmlFor="password" className="w-1/4 text-right">
                  Password:
                </label>
                {/* <input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Your password"
                  className="pl-3 border border-gray-300 p-2 rounded-2xl w-3/4"
                /> */}
                <div className="relative w-full max-w-md">
                  <input
                    name="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter password"
                    className="border border-gray-300 p-2 rounded-2xl w-105/100"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-600"
                  >
                    {isPasswordVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-6 p-2 w-full">
              <button className="bg-green-500 p-3 rounded-2xl hover:bg-green-600" onClick={handleSubmit}>
                Submit
              </button>

              <button className="bg-red-500 p-3 rounded-2xl hover:bg-red-600" onClick={resetFormData}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors expand={true} closeButton visibleToasts={3}/>
    </div>
  )
}
