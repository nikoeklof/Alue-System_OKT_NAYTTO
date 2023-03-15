import CreateAreaForm from "./components/CreateAreaForm";
import { LeafletMap } from "./components/map";

function App() {
  return (
    <div>
      <LeafletMap />
      <CreateAreaForm />
    </div>
  );
}

export default App;
