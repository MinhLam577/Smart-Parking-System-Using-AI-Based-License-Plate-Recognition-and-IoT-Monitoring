import Footer from './Component/Footer/Footer'
import Header from './Component/RegisterHeader'
import Login from './Page/Login'
import Register from './Page/Register/Register'
import HeaderMain from './Component/Header'
import FunctionList from './Page/User/FunctionList'
import useRouterElement from './Router/useRouterElement'

function App() {
  const element = useRouterElement()
  return (
    <div className=''>
      {element}
    </div>
  )
}

export default App
// <HeaderMain />
// <Register />
