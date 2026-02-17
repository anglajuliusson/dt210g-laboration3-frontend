// Inline-styling för header (komponentspecifik CSS)
const headerStyling = {
    color: "rgb(255, 111, 132)",
    padding: "2rem",
}

function Header() {
    return (
        <header style={headerStyling}>
            <h1>Min personliga blogg</h1>
        </header>
    )
}

export default Header;