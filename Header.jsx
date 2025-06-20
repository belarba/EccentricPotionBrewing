import chefClaudeLogo from "./images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Eccentric Potion Brewing Assistant</h1>
        </header>
    )
}