import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

import bgimg from "../assets/img/bg-confir.jpg";

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/doctores/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg: data.msg,
        });
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div className="bg flex items-center justify-center">
        <div className="md:mt-5 shadow-lg px-5 pt-10 pb-5 rounded-xl w-[50rem] bg-log">
          {!cargando && <Alerta alerta={alerta} />}

          {!cuentaConfirmada && (
            <Link className="block text-xl text-center  text-gray-100 hover:text-rose-400" to="/">
              Regresar
            </Link>
          )}

          {cuentaConfirmada && (
            <Link className="block text-xl text-center my-5 text-gray-100 hover:text-rose-400" to="/">
              Iniciar Sesión
            </Link>
          )}
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

export default ConfirmarCuenta;
