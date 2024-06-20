import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/navBar";
import HomePage from "./components/Home/homePage";
import "./App.css";


function App() {
  const navigate = useNavigate();



  return (
   <div className="main">
{/* <NavBar /> */}
<HomePage />
   </div>
  )


}
export default App;