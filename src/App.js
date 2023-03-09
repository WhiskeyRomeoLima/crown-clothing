import {Routes, Route} from 'react-router-dom'
//The folowing are components to render with our routes
import Navigation from './routes/navigation/navigation.component' //renders top level links
import Home from './routes/home/home.component' //renders shopping catagories
import Shop from './routes/shop/shop.component'
import Authentication from './routes/authentication/authentication.component' //renders SignIn form / SignUp form


// instead of path='/home' used index for the Home component
// the index key attribute ensures the Home component is rendered by default whenever the url './' is used
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );

}

export default App

