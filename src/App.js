import React, { useEffect, useState, createContext } from 'react'
import SiteRoutes from './components/SiteRoutes.component'

export const appContext = createContext(null)

function App() {
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCustomers(data.customers)
        setPackages(data.packages)
      });
  }, []);
  return (
    <>
      <appContext.Provider value={{ customers, setCustomers, packages, setPackages }}>
        {(customers.length > 0 && packages.length > 0) ? (
          <SiteRoutes customers={customers} setCustomers={setCustomers}
            packages={packages} setPackages={setPackages}
          />
        ) : (
          <div>Loading...</div>
        )}
      </appContext.Provider>
    </>
  )
}

export default App
