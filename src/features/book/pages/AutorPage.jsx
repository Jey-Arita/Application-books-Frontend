import { useParams } from "react-router-dom";
import { useAutor } from "../hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const AutorPage = () => {
  const { idAutor } = useParams();
  const { autor, isLoading, loadAutor } = useAutor(idAutor);

  useEffect(() => {
    loadAutor();
  }, [loadAutor]);

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      {isLoading ? (
        <p className="text-center py-4">Cargando...</p>
      ) : autor ? (
        <>
          <header className="bg-primary text-primary-foreground py-8 px-4 md:px-6">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl font-bold text-blue-600">
                {autor.nombreAutor}
              </h1>
              <div className="mt-4 flex">
                <img
                  src={autor.urlImg}
                  alt={autor.nombreAutor}
                  width={200}
                  height={200}
                  className="rounded-full"
                  style={{ aspectRatio: "1 / 1", objectFit: "cover" }}
                />
              </div>
            </div>
          </header>
          <main className="flex-1 py-0 px-4 md:px-6">
            <div className="container mx-auto max-w-4xl grid gap-8">
              <div className="grid gap-4">
                <h2 className="text-3xl font-bold text-blue-600">Biografía</h2>
                <p className="text-gray-600">{autor.bibliografia}</p>
              </div>
              <div className="grid gap-4 py-2 px-0">
                <h2 className="text-3xl font-bold text-blue-600">
                  Obras publicadas
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {autor.libros?.map((libro) => (
                    <div
                      key={libro.idlibro}
                      className="flex flex-col mx-6 gap-2 p-4 bg-white shadow rounded"
                    >
                      <Link to={`/libro/${libro.idlibro}`} prefetch={false}>
                        <img
                          src={libro.urlImg}
                          alt={libro.titulo}
                          width={200}
                          height={300}
                          className="rounded-lg"
                          style={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                        />
                      </Link>
                      <div>
                        <h3 className="text-lg font-semibold">
                          <Link
                            to={`/libro/${libro.idlibro}`}
                            className="hover:underline hover:text-rose-500"
                            prefetch={false}
                          >
                            {libro.titulo}
                          </Link>
                        </h3>
                        <p className="text-gray-600">{libro.descripcion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </>
      ) : (
        <p className="text-center py-4">No se encontraron autores.</p>
      )}
    </div>
  );
};
