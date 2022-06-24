import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Learning from './learning/Learning'
import Detection from './detection/Detection'
import './scss/main.scss'
import ManageModel from './ManageModel'
function App() {
  return (
    <div className="App">
      <header>
        {/* <img src="/images/logo.jpeg" alt="" /> */}
        Motizer
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/detection" element={<Detection />} />
          <Route path="/managemodel" element={<ManageModel />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
