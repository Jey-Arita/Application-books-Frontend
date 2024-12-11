import { useEffect, useState } from 'react'
import { useLibrosPopulares } from '../hooks/useLibrosPopulares';
import { useGeneroList } from '../../book/hooks';
import { formatoTiempo } from '../../../shared/utils';

export const LibrosPopulares = () => {
    const { librosPopulares } = useLibrosPopulares();
    const { generos, loadGenero } = useGeneroList();
    const [generosMap, setGenerosMap] = useState({});
  
    useEffect(() => {
      loadGenero();
    }, []);
  
    useEffect(() => {
      // Crea un mapa de id a nombre de genero
      const generoMap = generos.reduce((map, genero) => {
        map[genero.id] = genero.nombre;
        return map;
      }, {});
      setGenerosMap(generoMap);
    }, [generos]);
    
  return (
    <div className="bg-white shadow-md rounded-xl p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-6">
      Libros Más Populares
    </h2>
    {librosPopulares.slice(0, 5).map((libro) => (
      <div key={libro.id} className="mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={libro.urlImg}
            alt={libro.titulo}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 className="font-medium text-gray-700">
              {libro.titulo}
            </h3>
            <p className="text-sm text-gray-500">
              Género: {generosMap[libro.idGenero]}
            </p>
            <p className="text-sm text-gray-500">
              Fecha de Creación:{" "}
              {formatoTiempo(libro.fechaCreacion)}
            </p>
            <p className="text-sm text-gray-500">
              Promedio: {libro.promedio}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="h-2.5 rounded-full bg-blue-500"
            style={{ width: `${libro.promedio}%` }}
          />
        </div>
      </div>
    ))}
  </div>
  )
}
