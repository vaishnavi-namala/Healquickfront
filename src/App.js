
import 'bootstrap/dist/css/bootstrap.min.css'
import'bootstrap/dist/js/bootstrap.bundle.min.js'
import Routing from './Routing';
import { createContext, useState } from 'react';
export const RoutProtect=createContext()

function App() {
  const [token,settoken]=useState('')  
  return (


    <div className="App">
      <RoutProtect.Provider value={[token,settoken]}>     
      <Routing />
      </RoutProtect.Provider>
    </div>
  );
}

export default App;
