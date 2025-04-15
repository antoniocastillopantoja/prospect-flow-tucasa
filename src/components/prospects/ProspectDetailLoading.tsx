
import React from "react";

const ProspectDetailLoading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-500">Cargando información del prospecto...</p>
      </div>
    </div>
  );
};

export default ProspectDetailLoading;
