import React from "react";
import NavbarItem from "./navbarItem";

function Navbar() {
    return (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
            <div className="container">
                <a href="#/home" className="navbar-brand">Minhas Finanças</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                        <NavbarItem href="#/home" label="Home" />
                        <NavbarItem href="#/cadastro-usuarios" label="Usuários" />
                        <NavbarItem href="#/consulta-lancamentos" label="Lançamentos" />
                        <NavbarItem href="#/login" label="Login" />
                    </ul>

                </div>
            </div>
        </div>
    )
}
export default Navbar