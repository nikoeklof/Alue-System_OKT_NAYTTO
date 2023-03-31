import { useState } from "react";

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
              const layer = layerContext;
              console.log(layer);
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
              console.log(layerContext.layer);
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
