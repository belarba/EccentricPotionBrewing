import ReactMarkdown from "react-markdown"

export default function ClaudeRecipe(props) {
    return (
        <section className="suggested-recipe-container" aria-live="polite">
            <h2>Whimsical potion-brewing generated:</h2>
            <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}