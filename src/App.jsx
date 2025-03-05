// import { Router } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import MainNav from "./components/MainNav";

// rfce
function App() {
  return (
    // <>
    //   <AppRoutes />
    // </>
    
    <div className="app">
      <MainNav />
      <main>
        <AppRoutes />
      </main>
    </div>
 
  );
}
export default App;
