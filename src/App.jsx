import { useCallback, useEffect, useState } from 'react'
import { Alert, Button, Col, Container, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap'
import './App.css'
import Recipe from './Components/Recipe/Recipe';

function App() {
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('chicken');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const searchRecipes = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try
    {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setRecipes(data.meals || []);
    }
    catch(error)
    {
      setError('Failed to fetch recipes. Please try again later.');
      setRecipes([]);
      console.error("Failed to fetch recipes", error.message);
    }
    finally
    {
      setLoading(false);  
    }
  }, [query]);

  useEffect(() => {    
    searchRecipes();
  }, [searchRecipes]);

  return (
    <>
      <div className="App">
        <h1>React Food Recipe App</h1>
        <Container>
          <Row>
            <Col md={12} className="text-center">
              <InputGroup className="my-3">
                <FormControl
                  placeholder="Search Recipe"
                  aria-label="Search Recipe"
                  aria-describedby="basic-addon2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && search.trim()) {
                      setQuery(search.trim());
                    }
                  }}
                />
                <Button 
                  variant="primary" 
                  disabled={!search.trim() || loading}
                  onClick={() => setQuery(search.trim())}
                  id="button-addon2">
                  {
                    loading ? ( <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Loading...</>
                    ) : (
                      'Search'
                    )
                  }
                </Button>
              </InputGroup>
            </Col>
          </Row>
          { error && (
            <Row>
              <Col>
                <Alert variant="danger">{error}</Alert>
              </Col>
            </Row>
          )}
          <Row>
            {
            !loading && recipes.length === 0 && !error ? (
            <Col className="text-center mt-4">
              <p>No recipes found. Try a different search.</p>
            </Col>
          ) : (
            recipes.map((recipe) => (
              <Col sm={12} md={6} lg={6} xl={6} key={recipe.idMeal} className="my-3" >
                <Recipe {...recipe} />
              </Col>
            ))
          )}
          </Row>          
        </Container>
      </div>        
    </>
  )
}

export default App
