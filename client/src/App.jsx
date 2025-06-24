import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import IngredientsPage from './pages/IngredientsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/ingredients" element={<IngredientsPage/>}/>
        {/* <Route path="/recipes" element={<RecipesPage/>}/> */}
      </Routes>
    </Router>
  );
}

export default App;
