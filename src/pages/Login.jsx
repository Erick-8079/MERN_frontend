import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import bgimg from "../assets/img/bg-login.jpg";
import useAuth from "../hooks/useAuth";
import clienteAxios from "../config/axios";

const Login = () => {
  const [email, setEmail] = useState("correo@correo.com");
  const [password, setPassword] = useState("123456");
  const [alerta, setAlerta] = useState({});  

  const {setAuth} = useAuth()

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los campos son Obligatorios",
        error: true,
      });
      setTimeout(() => {
        setAlerta({})
      }, 2000);
      return;
    }

    try {
      const { data } = await clienteAxios.post("/doctores/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data)
      navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    }
  };

  const { msg } = alerta;


  return (
    <>
      <div className="bg flex flex-col justify-center items-center">       

        <div className="bg-log md:mt-0 shadow-lg px-5 py-10 rounded-xl  w-full md:w-[40rem]">
        <h1 className=" text-gray-100 font-black text-6xl text-center">
          Inicia Sesión
        </h1>

        {msg && <Alerta alerta={alerta} />}

          <form onSubmit={handleSubmit}>
          <div className="my-5">
          <label
            className="uppercase text-gray-100 block text-xl font-bold"
            htmlFor=""
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Email de Registro"
            className="boeder w-full p-3 mt-3 bg-gray-100 rounded-xl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

            <div className="my-5">
              <label
                className="uppercase text-gray-100  block text-xl font-bold"
                htmlFor=""
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Tu Password"
                className="boeder w-full p-3 mt-3 bg-gray-100 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Iniciar Sesión"
              className=" bg-rose-500 w-full my-5 py-3 px-10 rounded-xl text-white uppercase font-boldmt-5 hover:cursor-pointer hover:bg-rose-700 md:w-auto"
            />
          </form>

          <nav className=" lg:flex lg:justify-between">
            <Link
              className="block text-center my-5 text-gray-100 hover:text-rose-400"
              to="/registrar"
            >
              ¿No tienes una cuenta? Registrate
            </Link>

            <Link
              className="block text-center my-5 text-gray-100 hover:text-rose-400"
              to="/olvide-password"
            >
              Olvide Password
            </Link>
          </nav>
        </div>
      </div>

      <style>{`
        .bg{
          background-image: linear-gradient(to right, rgb(0 0 0/.10), rgb(0 0 0 / .1)),url(${bgimg});
          width: 100%;
          height: 100vh;
          background-size: cover;
          background-position: center; 
          background-repeat: no-repeat;
          position: absolute;
          z-index: -1;
        }
        .bg-log {
          background-color: rgba(0, 0, 0, .3);
        }
      `}</style>
    </>
  );
};

export default Login;
