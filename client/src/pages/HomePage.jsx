import {useNavigate} from 'react-router-dom';
const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className='container text-center mt-5'>
            <h1 className='mb-4'>The Little Oven</h1>
            <div className='d-grid gap-3 col-6 mx-auto'>
                <button className='btn btn-primary btn-lg' onClick={()=>navigate('/ingredients')}>Manage Ingredients</button>
                <button className='btn btn-primary btn-lg' onClick={()=>navigate('/recipes')}>Manage Recipes</button>
            </div>
        </div>
    );
}

export default HomePage;