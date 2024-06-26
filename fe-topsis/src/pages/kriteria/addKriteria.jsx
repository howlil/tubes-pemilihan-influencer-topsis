import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useState } from "react";
import addKriteria from "./api/addKriteria";
import Select from "@/components/ui/Select";

const typeOptions = [
  { value: "BENEFIT", label: "BENEFIT" },
  { value: "COST", label: "COST" },
];

const AddKriteria = ({ onClose, refreshData }) => {
  const [nama, setNama] = useState("");
  const [bobot, setBobot] = useState("");
  const [data, setData] = useState([]);
  const [tipe, setType] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  let bobotFloat = parseFloat(bobot);
  try {
    const result = await addKriteria({ nama, bobotFloat, tipe });
    setData(result);
    onClose();
    refreshData();
  } catch (error) {
    console.log('Error:', error);
  }
};
  const stopPropagation = (e) => {
    e.stopPropagation(); 
  };
  return (
    <div
      id="modal-backdrop"
      className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-1/3 px-8 py-8 rounded-lg shadow-md"
        onClick={stopPropagation}
      >
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
          <Input
            label="Nama Kriteria"
            placeholder="Nama Kriteria"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
          <Input
            label="Jumlah Bobot"
            placeholder="Masukan Bobot"
            type="number"
            value={bobot}
            onChange={(e) => setBobot(e.target.value)}
          />
          <Select
            label="Tipe"
            options={typeOptions}
            onChange={(e) => setType(e.target.value)}
          />
          <Button>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default AddKriteria;
