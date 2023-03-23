import { useEffect, useState } from "react";

import { GetCoordinates } from "./Variables";
import { getArea } from "./Variables";

const CreateAreaForm = ({ newArea }) => {
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
            onClick={() => {
              const layer = getArea();
              console.log(layer);
              layer.oldLayer.remove();

              newArea({
                id: layer.oldLayer._leaflet_id,
                areaName: areaName,
                apartmentAmount: parseInt(apartmentAmount),

                latlngs: layer.coords,
              });
            }}
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

export default CreateAreaForm;
