import {
  BrowserRouter as Router,
  Switch,
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
            <NavLink exact to="/" className="nav-link">Photo list</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact to="/new-photo" className="nav-link">Add new photo</NavLink>
          </li>
        </ul>
        <Switch>
          <Route exact path="/" component={PhotoList} />
          <Route path="/new-photo" component={PhotoForm} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
