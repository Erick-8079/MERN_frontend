import { useState } from "react";
import { Link } from "react-router-dom";
import bgimg from "../assets/img/bg-pass2.jpg";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlerta({ smg: "El email es obligatorio", error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post(
        "/doctores/olvide-password",
        { email }
      );
      setAlerta({ msg: data.msg });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;


  return (
    <>
      <div className="md:grid md:grid-cols-2 bg items-center px-10">
        <h1 className="text-gray-100 text-center font-black text-4xl md:text-6xl px-10 my-5">
          ¿Olvidaste la contraseña?
        </h1>
        <div className="bg-log shadow-lg px-5 pt-5 rounded-xl">
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
                className="boeder w-full p-3 mt-3 bg-gray-100 rounded-xl my-5"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Enviar email"
              className=" bg-rose-500 w-full my-5 py-3 px-10 rounded-xl text-white uppercase font-boldmt-5 hover:cursor-pointer hover:bg-rose-700 md:w-auto"
            />
          </form>

          <nav className="mt-5 lg:flex lg:justify-between">
            <Link
              className="block text-center my-5 text-gray-100 hover:text-rose-400"
              to="/"
            >
              ¿Ya tienes una cuenta? Inicia Sesión
            </Link>

            <Link
              className="block text-center my-5 text-gray-100 hover:text-rose-400"
              to="/registrar"
            >
              ¿No tienes una cuenta? Registrate
            </Link>
          </nav>
        </div>
      </div>

      <style>{`
        .bg{
          background-image: linear-gradient(to right, rgb(0 0 0/.10), rgb(0 0 0 / .1)),url(${bgimg});
          width: 100%;
          min-height: 100vh;
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

export default OlvidePassword;
