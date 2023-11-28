import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Preliminary from './Pages/1. Preliminary/preliminary';
import FollowUp from './Pages/2. Follow up/FollowUp';
import HighProbability from './Pages/3. High Probability/HighProbability';
import LowProbability from './Pages/4. Low Probability/LowProbability';
import PDF from './Pages/PDF Generator/PDF';

function App() {
  return (

    <Router>
      <Switch>
        <Route exact path ="/">
          <Preliminary />
        </Route>

        <Route path ="/follow_up">
          <FollowUp />
        </Route>

        <Route path ="/high_probability">
          <HighProbability />
        </Route>

        <Route path ="/low_probability">
          <LowProbability />
        </Route>

        <Route path ="/pdf">
          <PDF />
        </Route>

      </Switch>
    </Router>

    /*
    // 
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       "Whoaaaa, we're half way there" <br/>
    //       "Whoa oh, livin' on a prayerrrr" <br/>
    //       - bon jovi
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    */
    
  );
}

export default App;
