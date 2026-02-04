import GlobalStyle from './styles.js'
import Nav from './components/Nav.jsx'
import GridOverlay from './components/GridOverlay.jsx'
import Home from './pages/Home/index.jsx'
import Test from './components/Test.jsx'

function App() {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <GridOverlay />
      <Home />
      {/* <Test /> */}
    </>
  )
}

export default App
