// src/features/book/components/LibrosList.jsx
import React, { useEffect } from 'react';
import { useInicio } from '../hooks/index'

const LibrosList = () => {
    const { libros, isLoading, loadLibros } = useInicio();

    useEffect(() => {
        // Aquí podrías pasar parámetros como searchTerm y page
        loadLibros('default search', 1);
    }, [loadLibros]);

    if (isLoading) return <p>Cargando libros...</p>;

    return (
        <div>
            {libros.length > 0 ? (
                libros.map(libro => (
                    <div key={libro.id}>
                        <h3>{libro.title}</h3>
                        <p>{libro.author}</p>
                    </div>
                ))
            ) : (
                <p>No hay libros disponibles</p>
            )}
        </div>
    );
};

export default LibrosList;

