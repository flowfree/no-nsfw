import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  NavLink
} from 'react-router-dom'
import PhotoList from './components/PhotoList'
import PhotoForm from './components/PhotoForm'

function App() {
  return (
    <div className="container">
      <Router>
        <ul className="nav nav-tabs my-4">
          <li className="nav-item">
            <NavLink exact to="/photos" className="nav-link">Photo list</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/photos/new" className="nav-link">Add new photo</NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Redirect to="/photos" />
          </Route>
          <Route path="/photos/new" component={PhotoForm} />
          <Route path="/photos" component={PhotoList} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
