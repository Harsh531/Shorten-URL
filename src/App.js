import { Grid } from "@material-ui/core";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";

function App() {
  return (
    <Grid
      className="app"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Header />
      <Search />
    </Grid>
  );
}

export default App;
