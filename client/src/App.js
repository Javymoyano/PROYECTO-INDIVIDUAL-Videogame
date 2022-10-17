import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Details from "./components/Details";
import Form from "./components/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={Form} />
          <Route exact path="/videogames/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
