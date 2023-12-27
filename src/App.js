import { RouterProvider, createBrowserRouter} from "react-router-dom";
import { AuthContextProvider, ProtectedRoute } from "./context/AuthContext";
import { ApiContextProvider } from "./context/ApiContext";
import { HomeContextProvider } from "./context/HomeContext";
import {Home, Movies, TvShow, Person, DataDetails, UserProfile, Register, Login, NotFound} from "./pages";

import MainLayout from "./Layouts/MainLayout";

function App() {
 
  // First step to add Routers
  const routers = createBrowserRouter([
  {path:"/",element: <MainLayout />,
    children:[
    {index:true,element: <ProtectedRoute > <Home/> </ProtectedRoute>},
    {path:"/home",element: <ProtectedRoute > <Home/> </ProtectedRoute>},
    {path:"movies",element: <ProtectedRoute > <Movies/> </ProtectedRoute>},
    {path:"tv-shows",element: <ProtectedRoute > <TvShow/>  </ProtectedRoute>},
    {path:"actors&directors",element: <ProtectedRoute > <Person/> </ProtectedRoute>},
    {
      path: "movieDetails",
      element: <ProtectedRoute > <DataDetails /> </ProtectedRoute>,
      children: [
        { path: ":media", children: [{ path: ":id" }] }, 
      ],
    },
    {
      path: "tvDetails",
      element: <ProtectedRoute > <DataDetails /> </ProtectedRoute>,  
      children: [
        { path: ":media", children: [{ path: ":id" }] }, 
      ],
    },
    {
      path: "personDetails",
      element: <ProtectedRoute > <DataDetails/> </ProtectedRoute>,
      children: [
        { path: ":media", children: [{ path: ":id" }] }, 
      ],
    },
    {path:'profile',element:<ProtectedRoute > <UserProfile /> </ProtectedRoute>},
    {path:'register',element: <Register/>},
    {path:'login',element: 
      <Login />
      
  },
      
    {path:"*",element: <NotFound/>}
  ]}
  ]);

return <div className="App"> 
       {/* Second step to add Routers */} 
       <AuthContextProvider>
        <ApiContextProvider>
          <HomeContextProvider>
           <RouterProvider router={routers} ></RouterProvider>  
          </HomeContextProvider>
        </ApiContextProvider> 
        </AuthContextProvider>         
  </div>
}

export default App;