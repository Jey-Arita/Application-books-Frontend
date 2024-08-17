import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiOutlineStar } from "react-icons/hi";
import { BsHeart } from "react-icons/bs";
import { useBookDetalles } from '../../../shared/hooks/useBookDetalles'; // Ajusta la ruta según sea necesario

export const LibroPage = () => {
  const { id } = useParams(); // Obtener el id del libro desde la URL
  const { bookDetalles, isLoading, error } = useBookDetalles(id);
  
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      text: "Increíble Libro tiene una historia fascinante",
    },
  ]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  const handleBookRating = (newRating) => {
    setRating(newRating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      name: "Anonymous",
      text: comment,
    };
    setComments([...comments, newComment]);
    setComment("");
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar los detalles del libro: {error.message}</div>;
  }

  if (!bookDetalles) {
    return <div>No se encontraron detalles del libro.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={bookDetalles.urlImg}
            alt={bookDetalles.titulo}
            width={400}
            height={600}
            className="w-full h-auto rounded-lg border border-gray-300 shadow-lg"
            style={{ aspectRatio: "400/600", objectFit: "cover" }}
          />
        </div>
        <div className="grid gap-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{bookDetalles.titulo}</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <HiOutlineStar
                    key={i}
                    className={`w-6 h-6 ${
                      i < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">{rating ? rating.toFixed(1) : "N/A"}</span>
            </div>
            <div className="mt-2 text-gray-600">
              {bookDetalles.genero}
            </div>
          </div>
          <div className="prose max-w-none text-gray-800">
            <p>
              {bookDetalles.descripcion}
            </p>
            <Link to={`/autor/${bookDetalles.idAutor}`} className="font-semibold text-blue-600 hover:text-blue-800">
              {bookDetalles.autorNombre}
            </Link>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:gap-4">
            <Link
              to={bookDetalles.urlPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Leer Libro en Nueva Pestaña
            </Link>
            <button
              type="button"
              className={`flex items-center h-9 mt-4 sm:mt-0 text-blue-600 hover:text-blue-800 transition-colors duration-200 ${
                isFavorite ? 'text-rose-500' : ''
              }`}
              onClick={handleFavoriteClick}
            >
              <BsHeart className={`w-4 h-4 mr-2 transition-transform duration-200 transform hover:scale-125 ${
                isFavorite ? 'fill-current text-rose-500' : ''
              }`} />
              {isFavorite ? 'Favorito' : 'Agregar a Favoritos'}
            </button>
          </div>

          {/* Sección para calificar el libro */}
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">Calificar Libro</h2>
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <HiOutlineStar
                  key={i}
                  className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${
                    i < rating ? "text-yellow-500 scale-125" : "text-gray-300"
                  }`}
                  onClick={() => handleBookRating(i + 1)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-12 border-t border-gray-300" />

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Comentarios</h2>
        <form onSubmit={handleCommentSubmit} className="grid gap-4">
          <textarea
            className="w-full p-4 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            rows="4"
            placeholder="Escribe tu comentario aquí..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar Comentario
          </button>
        </form>
      </div>

      <div className="my-12 border-t border-gray-300" />

      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comentarios</h2>
        <div className="grid gap-8">
          {comments.map((comment) => (
            <div className="flex gap-4 p-4 border border-gray-300 rounded-md shadow-sm" key={comment.id}>
              <div className="w-12 h-12 border rounded-full flex items-center justify-center">
                <img
                  src="https://img.asmedia.epimg.net/resizer/v2/6OTABRTH3NFIPBIGSREW7C6ACA.jpg?auth=f5f14d21cc8dc0271f90eb98fcb2fa949d7bf56df64218ceb8cfa1e595afe8c5&width=1472&height=1104&smart=true"
                  alt="@username"
                  className="rounded-full w-full h-full object-cover"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-800">{comment.name}</div>
                </div>
                <p className="text-gray-600">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
