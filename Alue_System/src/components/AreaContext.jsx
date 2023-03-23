const AreaContext = ({ area }) => {
  if (!area) {
    return <></>;
  } else {
    return (
      <>
        <div>
          {area.areaName}, Asuntoja: {area.apartmentAmount}
        </div>
      </>
    );
  }
};
export default AreaContext;
