import {Route, Routes } from "react-router-dom"
import { Footer, Nav } from "../../book/components"
import { Menu } from "../components"
import { AdministracionAutor } from "../pages/AdministracionAutor"
import { AdministracionGenero, AdministracionLibro, DashboardAdmin } from "../pages"


export const AdministracionRouter = () => {
    return (
      <div className="overflow-x-hidden overflow-y-auto bg-gray-100 w-screen  min-h-screen  bg-hero-pattern bg-no-repeat bg-cover">
        <Nav />
        <div className="px-4 py-20">
          <div className="flex justify-between mx-auto">
          <Menu/>
            <Routes>
              <Route path='/autor' element={<AdministracionAutor />} />
              <Route path='/libro' element={<AdministracionLibro/>}/>
              <Route path='/dashboard' element={<DashboardAdmin />}/>
              <Route path='/genero' element={<AdministracionGenero />}/>
            </Routes>
          </div>
        </div>
        <Footer />
      </div> 
    )
  }