import { Navigate, Route, Routes } from "react-router-dom"
import { CreateUserPage, LoginPage } from "../pages"


export const SecurityRouter = () => {
    return (
      <div className="overflow-x-hidden bg-white w-screen h-screen bg-hero-pattern bg-no-repeat bg-cover">
          <div className="container flex justify-between mx-auto">
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path="/registro" element={<CreateUserPage/>}/>
              <Route path='/*' element={<Navigate to={"/security/login"} />} />
            </Routes>
          </div>
        </div>
    )
  }