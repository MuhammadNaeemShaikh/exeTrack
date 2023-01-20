import ExcerciseTracker from './component/ExcerciseTracker'
import DisplayRecords from './component/DisplayRecords';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayRecords/>}/>
          <Route path="/add-records" element={<ExcerciseTracker/>}/>
          <Route path="/add-records/:id" element={<ExcerciseTracker/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
