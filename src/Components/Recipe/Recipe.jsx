import React from 'react'
import { Card, CardHeader } from 'react-bootstrap';
import './Recipe.css'

const Recipe = (props) => {
    const {
        strMeal,
        strMealThumb,
        strInstructions,
        strArea,
        strCategory,
        strYoutube,
    } = props;
  return (
    <>
        <Card>
            <CardHeader>{strMeal}</CardHeader>
            <Card.Img variant="top" src={strMealThumb} className='card-img' alt={strMeal} />
            <Card.Body>
                <Card.Text>
                    <strong>Category:</strong> {strCategory}<br />
                    <strong>Area:</strong> {strArea}
                </Card.Text>
                <table className="table table-bordered mt-3">
                    <thead className='table-dark'>
                        <tr>
                            <th>#</th>
                            <th>Ingredient</th>
                            <th>Measure</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 20 }, (_, i) => {
                            const ingredient = props[`strIngredient${i + 1}`];
                            const measure = props[`strMeasure${i + 1}`];
                            if (ingredient && ingredient.trim() !== '') {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ingredient}</td>
                                        <td>{measure}</td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>

                <div className="mt-3">
                    <h5>📝 Instructions</h5>
                    <p style={{ whiteSpace: 'pre-line' }}>{strInstructions}</p>
                </div>

                {strYoutube && (
                    <div className="mt-4">
                    <h5>🎥 Watch Recipe Video</h5>
                    <div className="ratio ratio-16x9">
                        <iframe
                        src={`https://www.youtube.com/embed/${strYoutube.split("v=")[1]}`}
                        title="Recipe video"
                        allowFullScreen
                        ></iframe>
                    </div>
                    </div>
                )}
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">Origin: {strArea}</small>
            </Card.Footer>
        </Card>
    </>
  )
}

export default Recipe;
