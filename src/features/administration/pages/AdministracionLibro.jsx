import { useEffect, useState } from "react";
import { MdOutlineDriveFileRenameOutline, MdDescription } from "react-icons/md";
import { FaFileImage, FaTrash, FaEdit, FaTags, FaLink } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { useInicio } from "../../book/hooks";
import { Pagination } from "../../../shared/components/pagination";
import { CiSearch } from "react-icons/ci";

const GENRES = [
  "Ficción",
  "No Ficción",
  "Ciencia Ficción",
  "Fantasía",
  "Romance",
  "Misterio",
  "Historia",
  "Poesía",
  "Biografía",
  "Terror",
];

const AUTHORS = [
  { id: 1, name: "Gabriel García Márquez" },
  { id: 2, name: "Isabel Allende" },
  { id: 3, name: "Jorge Luis Borges" },
];

export const AdministracionLibro = () => {
  const { libros, loadLibros, isLoading } = useInicio(); // lo tomamos para listar los libros
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLibros(searchTerm, currentPage);
  }, [loadLibros, searchTerm, currentPage]);

  // Manejo de páginas anterior y siguiente
  const handlePreviousPage = () => {
    if (libros.data.hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (libros.data.hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Manejo del envío del formulario de búsqueda
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reinicia a la primera página cuando se realiza una búsqueda
    loadLibros(searchTerm, 1); // Recarga los libros con el término de búsqueda
  };

  const [newBook, setNewBook] = useState({
    title: "",
    description: "",
    genre: "",
    urlImg: "",
    urlPdf: "",
    authorId: "",
  });

  const [editingBookId, setEditingBookId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  const addOrEditBook = (e) => {
    e.preventDefault();
    if (Object.values(newBook).some((value) => value === "")) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (editingBookId) {
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBookId
            ? { ...book, ...newBook, id: editingBookId }
            : book
        )
      );
      setEditingBookId(null);
    } else {
      const bookToAdd = {
        ...newBook,
        id: books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1,
      };
      setBooks([...books, bookToAdd]);
    }

    setNewBook({
      title: "",
      description: "",
      genre: "",
      urlImg: "",
      urlPdf: "",
      authorId: "",
    });
  };

  const editBook = (id) => {
    const bookToEdit = books.find((book) => book.id === id);
    setNewBook(bookToEdit);
    setEditingBookId(id);
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div className="container p-8 bg-gray-50 min-h-screen">
      <div className="mx-auto">
        <div className="justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
            Administración de Libros
          </h1>
          <form onSubmit={addOrEditBook} className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <MdOutlineDriveFileRenameOutline className="mr-2 text-blue-500" />
                Título del Libro
              </label>
              <input
                type="text"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                placeholder="Título del Libro"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaTags className="mr-2 text-rose-500" />
                Género
              </label>
              <select
                name="genre"
                value={newBook.genre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Género</option>
                {GENRES.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaFileImage className="mr-2 text-purple-500" />
                URL Imagen
              </label>
              <input
                type="text"
                name="urlImg"
                value={newBook.urlImg}
                onChange={handleInputChange}
                placeholder="URL de la Imagen"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {newBook.urlImg && (
                <img
                  src={newBook.urlImg}
                  alt="Vista previa"
                  className="mt-4 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <BsPerson className="mr-2 text-gray-500" />
                Autor
              </label>
              <select
                name="authorId"
                value={newBook.authorId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Seleccionar Autor</option>
                {AUTHORS.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <FaLink className="mr-2 text-yellow-500" />
                URL del PDF
              </label>
              <input
                type="text"
                name="urlPdf"
                value={newBook.urlPdf}
                onChange={handleInputChange}
                placeholder="URL del PDF"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="flex items-center text-lg font-medium text-gray-700">
                <MdDescription className="mr-2 text-green-500" />
                Descripción
              </label>
              <textarea
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="col-span-2 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {editingBookId ? "Guardar Cambios" : "Añadir Libro"}
            </button>
          </form>

          {/* Campo de búsqueda */}
          <div className="mb-4 py-6">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center relative mb-6 md:mb-8 text-gray-900"
            >
              <div className="relative flex-1">
                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="search"
                  placeholder="Buscar libros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-white text-blue-600 placeholder-blue-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
              <button
                type="submit"
                className="ml-4 px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600"
              >
                Buscar
              </button>
            </form>
          </div>
          {/* Listar los libros */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {isLoading ? (
              <p>Cargando...</p>
            ) : (
              libros.data.items.map((book) => (
                <div
                  key={book.id}
                  className="p-6 bg-white border border-gray-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-full h-36 rounded-md flex items-center justify-center overflow-hidden ">
                    <img
                      src={book.urlImg}
                      alt={book.titulo}
                      className="w-32 h-32 max-w-xs object-cover rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105"
                    />
                  </div>

                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {book.titulo}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {book.descripcion}
                  </p>
                  <p className="text-md text-gray-700 font-semibold">
                    Autor: {book.idAutor}
                  </p>
                  <p className="text-md text-gray-700 font-semibold">
                    Genero: {book.idGenero}
                  </p>
                  <a
                    href={book.urlPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline mt-2 block"
                  >
                    Ver Libro
                  </a>
                  <p className="text-sm text-gray-500 mt-2">
                    fecha Creación: {book.fechaCreacion}
                  </p>

                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => editBook(book.id)}
                      className="px-4 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteBook(book.id)}
                      className="px-4 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <Pagination
            totalPages={libros.data.totalPages}
            handlePreviousPage={handlePreviousPage}
            hasPreviousPage={libros.data.hasPreviousPage}
            handleCurrentPage={setCurrentPage}
            currentPage={libros.data.currentPage}
            handleNextPage={handleNextPage}
            hasNextPage={libros.data.hasNextPage}
          />
        </div>
      </div>
    </div>
  );
};
