import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css';
import { HomePage } from "./pages/Home";
import { QueryClientProvider, QueryClient } from "react-query";
import {InstallingManual} from "./pages/InstallingManual";
import {Snapshots} from "./pages/Snapshots";
import { Helmet } from "react-helmet";

const router = createBrowserRouter([
  {path: "/install-node", element: <InstallingManual />},
  {path: "/snapshots", element: <Snapshots />},
  {path: "/:id?", element: <HomePage />},
]);

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
        <Helmet>
            <title>Story Explorer</title>
            <link rel="icon" href="/favicon.ico" />
        </Helmet>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
