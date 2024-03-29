
import Search from "./Home";
import Detail from "./Details"
import { Routes, Route } from "react-router-dom";
function App() {
	return (
      <div className="text-white font-mono">
        <Routes>
          <Route path="/" element={<Search /> }/>
          <Route path="details/:id" element={<Detail />}/>
          <Route path="*" element={<Error />}/>
        </Routes>
      </div>
	);
}

export default App;
