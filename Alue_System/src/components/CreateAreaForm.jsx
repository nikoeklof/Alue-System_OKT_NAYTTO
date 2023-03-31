import { useEffect, useState } from "react";

const CreateAreaForm = ({
  newArea,
  clearSelected,
  setFormActive,
  formActive,
  layerContext,
}) => {
  const [areaName, setAreaName] = useState("");
  const [apartmentAmount, setApartmentAmount] = useState("");
  const [areaNeighborhood, setAreaNeighborhood] = useState("");

  return (
    <>
      {formActive ? (
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
            onChange={(e) => setAreaNeighborhood(e.target.value)}
            type="text"
            placeholder="Kaupunginosa..."
          />
          <button
            type="button"
            onClick={() => {
              if (
                areaName !== "" &&
                areaNeighborhood !== "" &&
                apartmentAmount !== ""
              ) {
                const layer = layerContext;
                layer.layer.remove();
                newArea({
                  id: layer.layer._leaflet_id,
                  areaName: areaName,
                  apartmentAmount: parseInt(apartmentAmount),
                  neighborhood: areaNeighborhood,
                  areaOwner: "admin",
                  latlngs: layer.coords,
                });
                setFormActive(!formActive);
              } else {
                return alert("Check inputs!");
              }
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
      ) : (
        <div>
          <button
            onClick={() => {
              setFormActive(!formActive);
              clearSelected();
            }}
          >
            Luo uusi alue
          </button>
        </div>
      )}
    </>
  );
};

export default CreateAreaForm;
