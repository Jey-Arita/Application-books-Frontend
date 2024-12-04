import { Route, Routes } from "react-router-dom"
import { AppLibrosRouter } from "../features/book/routes/AppLibrosRouter"
import { SecurityRouter } from "../features/security/routes"
import { AdministracionRouter } from "../features/administration/routes"
import { ProtectedLayout } from "../shared/components/ProtectedLayout"

export const AppRouter = () => {
 return(
    <Routes>
        <Route path="/security/*" element={<SecurityRouter/>}/>
        <Route element={<ProtectedLayout/>}>
        <Route path="/admin/*" element={<AdministracionRouter/>}/>
        </Route>
        <Route path="/*" element={<AppLibrosRouter/>}/>
    </Routes>
   
 )
}