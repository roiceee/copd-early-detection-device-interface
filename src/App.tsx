import { RouterProvider, createBrowserRouter } from "react-router-dom";
import History from "./pages/History";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main>
          <Navbar />
          <Home />
        </main>
      ),
    },
    {
      path: "/records",
      element: (
        <main>
          <Navbar />
          <History />
        </main>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
