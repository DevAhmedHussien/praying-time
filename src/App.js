import { Routes, Route } from "react-router-dom"
import "./App.css";
// import Button from "@mui/material/Button";
import MainContent from "./components/time-Praing/MainContent";
import Header from "./components/Header";
import Quran from "./components/quran/Quran";
function App() {
  return (
    <div className="App">
		<div>
				<div style={{margin:'0 auto'}}>
				<Header/>
				</div>
			</div>
			<Routes>
				<Route path='/' element={
				<>
					<MainContent />
				</>
				}/>
				<Route path='/quran' element={
				<>
					<Quran />
				</>
				}/>
				<Route path='*' element={<h1>notFounf</h1>}/>
			</Routes>
      
    </div>
  );
}

export default App;
