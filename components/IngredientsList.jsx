export default function IngredientsList(props) {
    const ingredients = props.ingredients
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    const required = 4
    const remaining = required - ingredients.length
    const ready = ingredients.length >= required

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            <p className="ingredient-counter">
                {ready
                    ? "✅ Enough ingredients for a potion!"
                    : `🧪 Need at least ${remaining} more ingredients${remaining === 1 ? "" : "s"} to the potion.`}
            </p>
            {props.showControls && props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Ready for a whimsical potion?</h3>
                    <p>Generate a whimsical potion from your list of ingredients.</p>
                </div>
                <button onClick={props.getRecipe}>Get a potion</button>
            </div>}
        </section>
    )
}