import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import bgimg from "../assets/img/bg-pass2.jpg";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
    const [password, setPassword] = useState("");
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const comprobarToken = async () => {
          try {
            await clienteAxios(`/doctores/olvide-password/${token}`);
            setAlerta({
              msg: "Coloca tu Nuevo Password",
            });
            setTokenValido(true);
          } catch (error) {
            setAlerta({
              msg: "Hubo un error con el enlace",
              error: true,
            });
          }
        };
        comprobarToken();
      }, []);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password.length < 6) {
          setAlerta({
            msg: "El Password debe ser minimo de 6 caracteres",
            error: true,
          });
          return;
        }
    
        try {
          const url = `/doctores/olvide-password/${token}`;
          const { data } = await clienteAxios.post(url, { password });
          setAlerta({
            msg: data.msg,
          });
          setPasswordModificado(true);
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
        Restablece tu password
        </h1>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-log">
        {msg && <Alerta alerta={alerta} />}
        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>
              <div className="my-5">
                <label
                  className="uppercase text-gray-100 block text-xl font-bold"
                  htmlFor=""
                >
                  Nuevo Password
                </label>
                <input
                  type="password"
                  placeholder="Tu Nuevo Password"
                  className="boeder w-full p-3 mt-3 bg-gray-100 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Guardar Nuevo Password"
                className="bg-rose-500 w-full py-3 px-10 rounded-xl text-white uppercase font-boldmt-5 hover:cursor-pointer hover:bg-rose-700 md:w-auto"
              />
            </form>
          </>
        )}

        {passwordModificado && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Iniciar Sesión
          </Link>
        )}
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

export default NuevoPassword;
