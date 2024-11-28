import { Route, Routes } from "react-router-dom"
import { AppLibrosRouter } from "../features/book/routes/AppLibrosRouter"
import { SecurityRouter } from "../features/security/routes"
import { AdministracionRouter } from "../features/administration/routes"

export const AppRouter = () => {
 return(
    <Routes>
        <Route path="/security/*" element={<SecurityRouter/>}/>
        <Route path="*" element={<AppLibrosRouter/>}/>
        <Route path="/admin/*" element={<AdministracionRouter/>}/>
    </Routes>
   
 )
}