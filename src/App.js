import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Learning from './learning/Learning'
import Detection from './detection/Detection'
import './scss/main.scss'
function App() {
  return (
    <div className="App">
      <header>MOTIZER</header>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/detection" element={<Detection />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
