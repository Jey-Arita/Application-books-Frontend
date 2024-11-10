import { Route, Routes } from "react-router-dom"
import { AppLibrosRouter } from "../features/book/routes/AppLibrosRouter"
import { SecurityRouter } from "../features/security/routes"

export const AppRouter = () => {
 return(
    <Routes>
        <Route path="/security/*" element={<SecurityRouter/>}/>
        <Route path="*" element={<AppLibrosRouter/>}/>
    </Routes>
   
 )
}