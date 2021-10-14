import React from 'react';
import {BrowserRouter} from "react-router-dom";

import AppRouter from "./AppRouter";
import Navbar from "./Components/Navbar/Navbar";

const navbarExtraStyle = {
    width: 60 + "%",
    marginTop: 1 + "em"
}

function App() {
    return (
       <div>
           <BrowserRouter>
               <Navbar style={navbarExtraStyle}/>
               <AppRouter/>
           </BrowserRouter>
       </div>
  );
}

export default App;
