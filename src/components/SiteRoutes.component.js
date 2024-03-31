import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Customer from './Customer.component'
import Package from './Package.component'
import Invoice from './Invoice.component'
import { BrowserRouter as Router } from 'react-router-dom';
import CreateInvoice from './createInvoice/CreateInvoice.component'
import NavBar from './NavBar'
import HomePage from './HomePage'

function SiteRoutes() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/customers' element={<Customer />} />
          <Route path='/packages' element={<Package />} />
          <Route path='/invoices' element={<Invoice />} />
          <Route path="/create-invoice/:customerId" element={<CreateInvoice />} />
        </Routes>
      </Router>

    </>
  )
}

export default SiteRoutes