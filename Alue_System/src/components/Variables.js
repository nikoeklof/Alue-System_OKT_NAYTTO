var coords = [];
var area = {};
export const GetCoordinates = () => {
  return coords;
};
export const setCoordinates = (props) => {
  coords = props;
  console.log(coords);
};
export const setArea = (props) => {
  area = { coords: props.coords, oldLayer: props.layer };
  console.log(area);
};
export const getArea = () => {
  return area;
};
