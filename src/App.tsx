import { Flowbite } from 'flowbite-react'
import Banner from './components/Banner'
import Navigation from './components/Navigation'
import AppRouter from './routes/AppRouter'
import flowbiteTheme from './styles/flowbiteTheme'

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  )
}

export default App
