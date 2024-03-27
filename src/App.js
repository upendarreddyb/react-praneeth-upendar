import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from './components/Body'
import Qform from './components/Qform'
import WordGenerator from "./components/WordGenerator"
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
     children: [
      {
        path: "/qform",
        element: <Qform />,
      },
      {
        path:"/word",
        element:<WordGenerator/>
      }
     
    ] 
  },
  

]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
