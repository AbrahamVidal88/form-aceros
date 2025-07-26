import './Header.css';

function Header(){
    return (
        <div>
        <header className="header">
        <div className="header-content">
            <div className="logo-section">
                <div className="logo-placeholder">
                    <img src="images/logo-bandera.png" alt="Logo" className="logo-image" />
                </div>
            </div>
            <h1 className="main-title">Vacantes Aceros Medina</h1>
        </div>
    </header>
    </div>
    )
}

export default Header;