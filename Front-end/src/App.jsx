import { useNavigate } from "react-router-dom";
import HomePage from "./components/Home/homePage";
import "./App.css";


function App() {
  const navigate = useNavigate();



  return (
   <div className="main">
{/* <NavBar /> */}
<HomePage />
{/* <Footer /> */}
   </div>
  )


}
export default App;