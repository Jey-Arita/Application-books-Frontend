import { Barra } from "../components";
import { LibrosList } from "../components/LibrosList";

export const InicioPage = () => {
  return (
    <main className="container mx-auto py-6 px-4 bg-gray-100 sm:px-6">
      <div className="py-1">
        <Barra />
      </div>
      <div className="py-3">
        <h2 className="text-3xl font-bold text-blue-600">Libros Recientes</h2>
      </div>
      <LibrosList />
    </main>
  );
};
