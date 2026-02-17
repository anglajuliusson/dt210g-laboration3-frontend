// Inline-styling för footer
const footerStyling = {
    backgroundColor: "lightpink",
    color: "rgb(56, 56, 56)",
    padding: "2em",
}

const taskStyling = {
    backgroundColor: "rgb(255, 111, 132)",
    color: "rgb(56, 56, 56)",
    padding: "1em",
    fontSize: "15px"
}

function Footer() {
    return (
        <footer>
            <div style={footerStyling}>
                <h4 style={{color: "rgb(255, 111, 132)", marginBottom: "20px", fontSize: "18px"}}>Ängla Juliusson</h4>
                <p style={{marginBottom: "10px", fontSize: "15px"}}>070-318 13 98</p>
                <p style={{fontSize: "15px"}}>anju2402@student.miun.se</p>
            </div>
            <div style={taskStyling}>
                <p style={{textAlign: "center"}}>DT210G - Laboration 3 | VT26</p>
            </div>
        </footer>
    )
}

export default Footer;