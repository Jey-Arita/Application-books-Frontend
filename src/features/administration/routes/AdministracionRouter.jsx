import { Navigate, Route, Routes } from "react-router-dom"
import { Footer, Nav } from "../../book/components"

import { Menu } from "../components"
import { AdministracionAutor } from "../pages/AdministracionAutor"
import { AdministracionLibro } from "../pages"


export const AdministracionRouter = () => {
    return (
      <div className="overflow-x-hidden bg-gray-100 w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover">
        <Nav />
        <div className="px-4 py-20">
          <div className="flex justify-between mx-auto">
          <Menu/>
            <Routes>
              <Route path='/autoraadmin' element={<AdministracionAutor />} />
              <Route path='/libroadmin' element={<AdministracionLibro/>}/>
            </Routes>
          </div>
        </div>
        <Footer />
      </div> 
    )
  }