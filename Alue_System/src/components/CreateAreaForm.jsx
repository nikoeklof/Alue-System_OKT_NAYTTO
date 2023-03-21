import { useEffect, useState } from "react";
import { GetCoordinates } from "./Coordinates";
import { useMap } from "react-leaflet";

const CreateAreaForm = () => {
  const [formActive, setFormActive] = useState(true);
  const [areaName, setAreaName] = useState("");
  const [apartmentAmount, setApartmentAmount] = useState("");
  const [areaOwner, setAreaOwner] = useState("");

  return (
    <>
      {formActive ? (
        <div>
          <button
            onClick={() => {
              setFormActive(!formActive);
              console.log(GetCoordinates());
            }}
          >
            Luo uusi alue
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
          <input
            onChange={(e) => setAreaOwner(e.target.value)}
            type="text"
            placeholder="Alueen omistaja..."
          />
          <button
            type="button"
            onClick={() =>
              handleSubmit({
                areaName,
                apartmentAmount,
                areaOwner,
                coords: GetCoordinates(),
              })
            }
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

const handleSubmit = (props) => {
  //
  console.log(props);
};

export default CreateAreaForm;
