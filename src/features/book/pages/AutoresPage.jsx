import React, { useEffect, useState } from "react";
import { useAutor } from "../hooks/index";
import { useNavigate } from 'react-router-dom';
import { AutorListSkeleton } from "../components";

export const AutoresPage = () => {
    const { autores, isLoading, loadAutores } = useAutor();
    const [expandedAutor, setExpandedAutor] = useState(null);
    const navigate = useNavigate();

    const handleAuthorClick = (id) => {
        navigate(`/autor/${id}`);
    };

    useEffect(() => {
        loadAutores();
    }, [loadAutores]);

    if (isLoading) {
        return <AutorListSkeleton/>;
    }

    if (!autores || autores.length === 0) {
        return <p className="text-center text-gray-500">No hay autores disponibles.</p>;
    }

    const handleToggleBio = (id) => {
        setExpandedAutor(expandedAutor === id ? null : id);
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen py-14">
            <h2 className="text-3xl font-bold text-center mb-6 text-blue-500">Lista de Autores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {autores.map((autor) => (
                    <div key={autor.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
                        <img 
                            src={autor.urlImg} 
                            alt={`Imagen de ${autor.nombreAutor}`} 
                            className="w-full h-48 object-cover" 
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{autor.nombreAutor}</h3>
                            <p className="text-gray-600">
                                <strong>Biografía:</strong> 
                                {expandedAutor === autor.idAutor 
                                    ? autor.bibliografia 
                                    : `${autor.bibliografia.substring(0, 100)}...`}
                            </p>
                            <button 
                                onClick={() => handleAuthorClick(autor.id)} 
                                className="text-blue-500 mt-2 hover:underline"
                            >
                                Ver detalles
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
