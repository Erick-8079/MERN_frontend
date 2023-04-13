import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bgimg from "../assets/img/bg-regis.jpg";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes("")) {
      setAlerta({ msg: "Todos los campos son obligatorios", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "los password no coinciden", error: true });
      return;
    }

    setAlerta({})

    //Crear el usuario en la api
    try {
      await clienteAxios.post("/doctores", {nombre, email, password})
      setAlerta({
        msg: 'Creado Correctamente, revisa tu email',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
    setNombre("")
    setEmail("")
    setPassword("")
    setRepetirPassword("")
  }

  const { msg } = alerta;

  return (
    <>
      <div className="md:grid md:grid-cols-2 bg items-center px-10">
        <h1 className="text-gray-100 text-center font-black text-6xl px-10 my-5">
          Crea una Cuenta{" "}
        </h1>
        <div className="bg-log shadow-lg px-5 pt-5 rounded-xl">
        {msg && <Alerta 
            alerta={alerta} 
        />}
          <form
            onSubmit={handleSubmit}
          >
            <div className="">
              <label
                className="uppercase text-gray-100 block text-xl font-bold"
                htmlFor=""
              >
                Nombre
              </label>
              <input
                type="text"
                placeholder="Tu Nombre"
                className="boeder w-full p-3 mt-3 bg-gray-100 rounded-xl"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div className="my-2">
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

            <div className="my-2">
              <label
                className="uppercase text-gray-100 block text-xl font-bold"
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

            <div className="my-5">
              <label
                className="uppercase text-gray-100 block text-xl font-bold"
                htmlFor=""
              >
                Repetir Password
              </label>
              <input
                type="password"
                placeholder="Repite tu password"
                className="boeder w-full p-3 mt-3 bg-gray-100 rounded-xl"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Crear Cuenta"
              className=" bg-rose-500 w-full my-5 py-3 px-10 rounded-xl text-white uppercase font-boldmt-5 hover:cursor-pointer hover:bg-rose-700 md:w-auto"
            />
          </form>

          <nav className="lg:flex lg:justify-between pb-5">
            <Link className="block text-center my-5 text-gray-100 hover:text-rose-400" to="/">
              ¿Ya tienes una cuenta? Inicia Sesión
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

export default Registrar;
