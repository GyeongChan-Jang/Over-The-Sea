import { Flowbite } from 'flowbite-react'
import Navigation from './components/Navigation'
import AppRouter from './routes/AppRouter'
import flowbiteTheme from './styles/flowbiteTheme'

function App() {
  return (
    <div className="App">
      <Flowbite
        theme={{
          dark: true,
          theme: flowbiteTheme
        }}
      >
        <Navigation />
      </Flowbite>
      <AppRouter />
    </div>
  )
}

export default App
