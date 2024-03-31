import React, { useEffect, useState, createContext } from 'react'
import SiteRoutes from './components/SiteRoutes.component'

export const appContext = createContext(null)


function App() {
  const [appData, setAppData] = useState();
  // todo split appData to two states-packages and customers
  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setAppData(data);
      });
  }, []);
  return (
    <>
      <appContext.Provider value={{

        appData, setAppData
      }}>
        {appData &&
          <SiteRoutes appData={appData} setAppData={setAppData} />
        }
        {!appData &&
          <div>Loading...</div>}

      </appContext.Provider>

    </>
  )
}

export default App
