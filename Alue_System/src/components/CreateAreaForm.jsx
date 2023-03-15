import { useEffect, useState } from "react";

const CreateAreaForm = () => {
  const [formActive, setFormActive] = useState(true);
  const [areaName, setAreaName] = useState("");
  const [apartmentAmount, setApartmentAmount] = useState("");

  return (
    <>
      {formActive ? (
        <div>
          <button
            onClick={() => {
              setFormActive(!formActive);
            }}
          >
            Luo alue
          </button>
        </div>
      ) : (
        <div>
          <input
            onChange={(e) => setAreaName(e.target.value)}
            type="text"
            placeholder="Alueen nimi..."
          />
          <input
            onChange={(e) => setApartmentAmount(e.target.value)}
            type="text"
            placeholder="Asuntojen määrä..."
          />
          <button
            type="button"
            onClick={() => handleSubmit(areaName, apartmentAmount)}
          >
            Tallenna
          </button>
          <button
            onClick={() => {
              setFormActive(!formActive);
            }}
          >
            Peruuta
          </button>
        </div>
      )}
    </>
  );
};

const handleSubmit = (areaName, apartmentAmount) => {
  console.log(areaName, apartmentAmount);
};

export default CreateAreaForm;
