import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Room from './pages/Room';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Flash from './components/Flash/Flash';

library.add(fas)
function App() {
  const [response, setResponse] = useState({
    message: '',
    type: ''
  });
  useEffect(() => {
      let timer
      if(response) {
          timer = setTimeout(function() {
              setResponse('')
          }, 3000)
      }
      return () => {
          clearTimeout(timer)
      }
  }, [response])


  return (
    <Router>
        <div className="app-container">
          <div className="bg-gray-700 w-full min-h-screen overflow-hidden">
              <Flash message={response.message} type={response.type} />
              <Switch>

                <Route path="/" exact>
                  <Login response={response} setResponse={setResponse} />
                </Route>
                <Route path="/register" exact>
                  <Register response={response} setResponse={setResponse} />
                </Route>
                <Route path="/room" component={Room}></Route>
                <Route path="*" component={NotFoundPage} />

              </Switch>
          </div>

        </div>
      </Router>
  );
}

export default App;
