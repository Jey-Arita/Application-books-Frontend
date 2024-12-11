import {ProtectedLink} from "../../../shared/components";
import { Barra } from "../components";
import { LibrosList } from "../components/LibrosList";

export const InicioPage = () => {
  return (
    <main className="container mx-auto py-14 px-4 bg-gray-100 sm:px-6">
      <div className="py-1">
      <h1 className="text-3xl font-bold text-blue-500">Libros destacados</h1>
      <Barra />
      </div>
      <div className="py-3">
        <h2 className="text-3xl font-bold text-blue-500">Libros Recientes</h2>
      </div>
      <LibrosList />
    </main>
  );
};
