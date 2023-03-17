import CreateAreaForm from "./components/CreateAreaForm";
import { LeafletMap } from "./components/LeafletMap";
import React from "react";

function App() {
  return (
    <div>
      <LeafletMap />
      <CreateAreaForm />
    </div>
  );
}

export default App;
