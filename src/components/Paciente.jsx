import { useState } from "react";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const [open, setOpen] = useState(false);

  const { setEdicion,eliminarPaciente } = usePacientes();

  const { email, fecha, nombre, sintomas, _id } = paciente;

  const formatearFecha = (fecha) => {
    const nuevaFecha = new Date(fecha);
    return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
      nuevaFecha
    );
  };

  return (
    <>
      <div
        className="mx-10 mb-10 bg-rose-400 shadow-md px-5 py-5 rounded-xl hover:cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        <p className="font-bold uppercase my-2 text-xl">
          Nombre: {""}
          <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase my-2 text-xl">
          Fecha: {""}
          <span className="font-normal normal-case text-black">
            {formatearFecha(fecha)}
          </span>
        </p>

        <div className="flex justify-between">
          <button
            type="button"
            className="py-2 text-xs md:text-lg px-5 bg-rose-500 hover:bg-rose-300 text-white uppercase font-bold rounded-lg"
            onClick={(e) => {
               e.stopPropagation();
              setEdicion(paciente)}}
          >
            Editar
          </button>

          <button
            type="button"
            className="py-2 text-xs md:text-lg px-5 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
            onClick={(e) => {
              e.stopPropagation();
              eliminarPaciente(_id)}}
          >
            Eliminar
          </button>
        </div>
      </div>

      {open && (
        <div
          className="flex flex-col items-center fixed top-0 left-0 w-full h-full px-4 py-16 md:py-40 bg-black bg-opacity-90 overflow-y-auto z-50 overflow-x-hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="mx-10 mb-10 bg-rose-400 shadow-md px-5 py-5 rounded-xl hover:cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
          >
            <p className="font-bold uppercase my-2 text-xl">
              Nombre: {""}
              <span className="font-normal normal-case text-black">
                {nombre}
              </span>
            </p>
            <p className="font-bold uppercase my-2 text-xl text-black">
              Email: {""}
              <span className="font-normal normal-case text-black">
                {email}
              </span>
            </p>
            <p className="font-bold uppercase my-2 text-xl">
              Fecha: {""}
              <span className="font-normal normal-case text-black">
                {formatearFecha(fecha)}
              </span>
            </p>
            <p className="font-bold uppercase my-2 text-xl text-black">
              DESCRIPCIÓAN: {""}
              <span className="font-normal normal-case text-black">
                {sintomas}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Paciente;
