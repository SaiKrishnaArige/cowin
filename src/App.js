import './App.css';
// import { Button } from '@material-ui/core';
// import DataComponent from './DataComponent';
// import { makeStyles } from '@material-ui/core/styles';
// import Cowin from './Cowin';
import SimpleTabs from './TabView';


function App() {
  return (
    <div className="App">

      <h1>Covid Vaccination slots search by pin or districts</h1>

      {/* Button components used */}

      {/* <Button variant="contained">Default</Button>

      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button> */}

      {/* <DataComponent/> */}

      {/* <Cowin/> */}
      <SimpleTabs/>
            
    </div>
  );
}

export default App;
