import React from 'react';
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./AppRouter";
import Navbar from "./Components/Navbar/Navbar";

function App() {
    return (
       <div>
           <BrowserRouter>
               <Navbar/>
               <AppRouter/>
           </BrowserRouter>
       </div>
  );
}

export default App;
