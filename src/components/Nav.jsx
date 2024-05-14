import React from 'react'
const homeNav = () => {
    window.location.href = '/';
}
const convNav = () => {
    window.location.href = '/Converter';
}
function Nav() {
    return (
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <h1>Curruncy Converter</h1>
                    <div className="btn-group">
                        <button type="button" className="btn btn-outline-primary" onClick={homeNav}>Home</button>
                        <button type="button" className="btn btn-outline-primary" onClick={convNav}>Converter</button>
                    </div>
                </div>
        </nav>
    )
}

export default Nav