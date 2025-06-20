import React from "react"
import IngredientsList from "./components/IngredientsList"
import ClaudeRecipe from "./components/ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [isLoading, setIsLoading] = React.useState(false)

    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = React.useState("")

    async function getRecipe() {
        setIsLoading(true)
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown)
        setIsLoading(false)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function resetRecipe() {
        setIngredients([])
        setRecipe("")
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. essence of moonlight"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 && 
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    showControls={!recipe}
                />
            }

            {isLoading && <div className="spinner" />}
            {recipe && <ClaudeRecipe recipe={recipe} />}
            {recipe && (
                <div className="reset-button-container">
                    <button onClick={resetRecipe} className="reset-button">
                        🔄 Start over
                    </button>
                </div>
            )}
        </main>
    )
}