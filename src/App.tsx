import './App.scss';
import { MovieForm, MovieList } from './components';

//const host : string = process.env.REACT_APP_API_HOST as string; 

function App() {
  return (
    <div className="wrapp">
      <div className="form-wrapp">
        <MovieForm submitHandle={() => {}} cinemaFormats={["VHS", "DVD", "Blu-Ray"]}/>
      </div>
      <div className="list-wrapp">
        <MovieList/>
      </div>
    </div>
  );
}

export default App;
