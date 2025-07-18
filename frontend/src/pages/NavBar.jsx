import { NavLink } from "react-router-dom";


export default function NavBar() {
    return (
        <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink className="navbar-brand text-danger" to="/">
                    Location Auto
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link text-primary" to="/cars">
                                Véhicules
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-primary" to="/clients">
                                Clients
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-primary" to="/reservations">
                                Réservations
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-primary" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </header>
    );
}
 