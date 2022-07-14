
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './components/Login';
import Create from './components/Create';

//import ErrorPage from './components/ErrorPage';
import POEM from './components/category/Poem';
import STORY from './components/category/Story';
import QUOTES from './components/category/Quote';

function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/create" element={<Create />}/>
    <Route path="/create/poem" element={<POEM />}/>
    <Route path="/create/story" element={<STORY />}/>
    <Route path="/create/quote" element={<QUOTES />}/>

  {/*   
    <Route path="/error" element={<ErrorPage />}/> */}
    
    </Routes>
  );
}

export default App;
