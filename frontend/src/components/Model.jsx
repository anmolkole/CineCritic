const Model = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred Background */}
          <div
            className="absolute inset-0  bg-opacity-10 backdrop-blur-xl"
            onClick={onClose}
          ></div>

          {/* Modal Content */}
          <div className="relative z-50 bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-96">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
