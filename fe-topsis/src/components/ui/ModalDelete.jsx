import Button from "./Button";

export default function ModalDelete({ onClose, onDelete }) {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      id="modal-backdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/3 px-8 py-8 rounded-lg shadow-md"
        onClick={stopPropagation}
      >
        <h1 className="text-2xl font-semibold text-center">
          Yakin Mau Hapus data ini?
        </h1>
        <section className="mt-6 flex justify-center gap-4">
          <Button variant="danger" onClick={onDelete}>
            Hapus
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
        </section>
      </div>
    </div>
  );
}
