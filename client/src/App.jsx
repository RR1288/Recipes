import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import IngredientsPage from './pages/IngredientsPage';
import RecipesPage from './pages/RecipesPage';
import RecipeEditorPage from './components/RecipeEditorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/ingredients" element={<IngredientsPage/>}/>
        <Route path="/recipes" element={<RecipesPage/>}/>
        <Route path="/recipes/new" element={<RecipeEditorPage />} />
        <Route path="/recipes/:id/edit" element={<RecipeEditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
