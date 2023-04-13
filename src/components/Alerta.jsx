
const Alerta = ({ alerta }) => {
    return (
      <div
        className={`${
          alerta.error
            ? "from-red-800 to-red-600"
            : "from-rose-500 to-rose-400"
            } bg-gradient-to-r text-center p-3 rounded-xl uppercase text-white font-bold text-sm mb-10`      
        }>
        {alerta.msg}
      </div>
    );
  };
  
  export default Alerta;