import {Link, Navigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {UserContext} from "../UserContext.jsx";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const {data} = await axios.post('/login', {email,password});
      setUser(data);
      alert('Login successful!');
      setRedirect(true);
    } catch (e) {
      alert('Login failed or User not found');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  
  return (
      <Card color="transparent" className="pt-20 flex items-center justify-center" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Login
      </Typography>
      <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleLoginSubmit}>
        <div className="mb-4 flex flex-col gap-2">
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
              onChange={ev => setPassword(ev.target.value)}
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
        <Button className="mt-4 bg-primary rounded-xl" fullWidth onClick={handleLoginSubmit}>
          Login
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Don't have an account yet ?{" "}
          <Link className="font-medium text-primary transition-colors underline" to={'/register'}> 
            Register
          </Link>
        </Typography>
      </form>
      </Card>
  );
}