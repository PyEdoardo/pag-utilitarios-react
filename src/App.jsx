import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './routes/Layout'
import './App.css'
import Calculadora from './routes/Calculadora'
import CalculadoraHexa from './routes/CalculadoraHexa'
import Previsao from './routes/Previsao'
import Conversor from './routes/Conversor'
import Todo from './routes/Todo'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='/' element={<Layout/>}/>
      <Route path='/Calculadora' element={<Calculadora/>}/>
      <Route path='/Base' element={<CalculadoraHexa/>}/>
      <Route path='/Conversor' element={<Conversor/>}/>
      <Route path='/Prev' element={<Previsao/>}/>
      <Route path='/Todo' element={<Todo/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
