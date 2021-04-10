import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Welcome from "./components/Welcome";
import AllZones from "./components/AllZones";
import AddZone from "./components/AddZone";
import EditZone from "./components/EditZone";

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <Route path="/" exact component={Welcome} />
        <Route path="/allzones" component={AllZones} />
        <Route path="/addzone" component={AddZone} />
        <Route path="/zone/:id" component={EditZone} />
      </Container>
    </Router>
  );
}

export default App;
