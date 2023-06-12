import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";


export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function registerUser(ev) {
    ev.preventDefault();
    try{
    await axios.post('/register', {
        name,
        email,
        password,
    });
      alert('Registration successful, Now you can login');
      setRedirect(true);
    } catch(e) {
        alert('Registration Failed, Please try again later');
    }
  }

  if(redirect) {
    return <Navigate to={'/login'} />
  }

  return (
    <Card color="transparent" className="pt-16 flex items-center justify-center" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to register.
      </Typography>
      <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={registerUser}>
        <div className="mb-4 flex flex-col gap-2">
        <input
            type="text"
            size="lg"
            placeholder="Full Name"
            value={name}
            onChange={ev => setName(ev.target.value)}
            style={{ borderRadius: '0.375rem' }}
          />
          <input
            type="email"
            size="lg"
            placeholder="Email"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
            style={{ borderRadius: '0.375rem' }}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              size="lg"
              placeholder="Password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              style={{ borderRadius: "0.375rem" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
            </button>
          </div>
        </div>
        <Checkbox
          label={
            (
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-medium"
              >
                Remember me
                {/* <a
                  href=""
                  className="font-medium transition-colors hover:text-primary"
                >
                  &nbsp;Terms and Conditions
                </a> */}
              </Typography>
            )
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-4 bg-primary rounded-xl" fullWidth onClick={registerUser}>
          Register
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link className="font-medium text-primary transition-colors underline" to={"/login"}>
              Login
          </Link>
        </Typography>
      </form>
    </Card>
  );
}
