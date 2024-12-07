import { IoExitOutline } from "react-icons/io5";

export const PdfVista = ({ isOpen, closeModal, pdfUrl }) => {
    if (!isOpen) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-100 py-8"
        onClick={closeModal}
      >
        <div
          className="bg-white p-4 w-[90%] h-[90%] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full  hover:bg-red-600"
            onClick={closeModal}
          >
            <IoExitOutline className="w-6 h-6"/>
          </button>
          <iframe
            src={`${pdfUrl}#toolbar=0`}
            width="100%"
            height="100%"
            title="Vista del libro en PDF"
            frameBorder="0"
          />
        </div>
      </div>
    );
  };
  