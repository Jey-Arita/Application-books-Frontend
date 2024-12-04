import { useState } from "react";
import {
  MdOutlineDriveFileRenameOutline,
  MdDescription,
} from "react-icons/md";
import { FaFileImage, FaTrash, FaEdit, FaTags, FaLink } from "react-icons/fa";
import { BsPerson } from "react-icons/bs";

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
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Cien Años de Soledad",
      description: "Una obra maestra de la literatura latinoamericana.",
      genre: "Ficción",
      urlImg:
        "https://m.media-amazon.com/images/I/A1lNJP8sC6L._AC_UF1000,1000_QL80_.jpg",
      urlPdf:
        "https://www.secst.cl/upfiles/documentos/19072016_1207am_578dc39115fe9.pdf",
      authorId: 1,
    },
  ]);

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
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Administración de Libros
        </h1>
        <form onSubmit={addOrEditBook} className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-lg font-medium text-gray-700">
              <MdOutlineDriveFileRenameOutline className="mr-2 text-blue-500"/>
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
              <FaTags className="mr-2 text-rose-500"/>
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
              <FaFileImage className="mr-2 text-purple-500"/>
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
              <BsPerson className="mr-2 text-gray-500"/>
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
            <FaLink className="mr-2 text-yellow-500"/>
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
              <MdDescription className="mr-2 text-green-500"/>
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

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="p-4 bg-gray-50 border rounded-lg shadow-md hover:shadow-lg"
            >
              <img
                src={book.urlImg}
                alt={book.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-gray-600">{book.description}</p>
              <p className="mt-2">
                <span className="font-semibold">Autor: </span>
                {AUTHORS.find((a) => a.id === Number(book.authorId))?.name ||
                  "Desconocido"}
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
          ))}
        </div>
      </div>
    </div>
  );
};
