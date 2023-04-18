import { worker } from "./mocks/browser";
import Home from "./pages/Home";

if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: "bypass",
  });
}

function App() {
  return (
    <div className="p-4">
      <Home />
    </div>
  );
}

export default App;
