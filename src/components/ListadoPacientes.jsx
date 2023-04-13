import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";



const ListadoPacientes = () => {
  const { pacientes } = usePacientes();
  return (
    <>
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center mb-10">Listado Pacientes</h2>

          {pacientes.map(paciente => (
            <Paciente
              key={paciente._id}
              paciente={paciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
        </>
      )}
    </>
  );
}

export default ListadoPacientes