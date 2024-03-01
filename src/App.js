import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from './components/Body'
import Qform from './components/Qform'
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    children: [
      {
        path: "/qform",
        element: <Qform />,
      }
    ]
  }
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
