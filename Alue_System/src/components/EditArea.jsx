import { useRef, useState } from "react";

const EditArea = ({ area, onSave }) => {
  if (!area) return <></>;
  console.log(area);
  const [areaName, setAreaName] = useState(area.areaName);
  const [areaNeighborhood, setAreaNeighborhood] = useState(area.neighborhood);
  const [areaApartmentAmount, setAreaApartmentAmount] = useState(
    area.apartmentAmount
  );
  const ref = useRef(null);

  return (
    <div>
      <form>
        Alueen Nimi:
        <input
          ref={ref}
          defaultValue={area.areaName}
          onChange={(e) => setAreaName(e.target.value)}
        />
        Kaupunginosa:
        <input
          ref={ref}
          defaultValue={area.neighborhood}
          onChange={(e) => setAreaNeighborhood(e.target.value)}
        />
        Asuntojen määrä
        <input
          ref={ref}
          defaultValue={area.apartmentAmount}
          onChange={(e) => setAreaApartmentAmount(e.target.value)}
        />
        <button
          onClick={(e) => {
            e.preventDefault();

            onSave({
              id: area.id,
              areaName: areaName,
              apartmentAmount: areaApartmentAmount,
              neighborhood: areaNeighborhood,
              latlngs: area.latlngs,
            });
          }}
        >
          Tallenna{" "}
        </button>
      </form>
    </div>
  );
};

export default EditArea;
