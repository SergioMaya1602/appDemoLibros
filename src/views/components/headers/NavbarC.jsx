import React, { Fragment } from "react"; //importamos la libreria react y sus componentes useState
import { Link } from "react-router-dom"; //importamos el componente Link de react-router-dom
import Logo from "../../assets/images/LogoLibrosDeTodoMexico.png"
import { Navbar, Container, Nav, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap'; //importamos los componentes de react-bootstrap
import { faUser, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles/headersStyles.css';

const NavbarC = () => {

    const logOut = () => {
        localStorage.clear()
        window.location = "/"
    }

    const tooltipUser = `Usuario: ${localStorage.is_Name} \n
    \n Rol: ${localStorage.is_Profile}`

    let navBarView = null;

    if (window.location.pathname === '/libros' || window.location.pathname === '/facturas' || window.location.pathname === '/clientes' || window.location.pathname === '/perfiles')
        navBarView = true;
    else
        navBarView = false;

    navBarView = localStorage.length !== 0 ? true : false

    if (navBarView) { //we validate that just see the navbar content if the pathname doest'n root position

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            <header className="navbar-header navbar-haslayaout">
                                <div className="navbar-navigationarea mt-4">
                                    <Container>
                                        <Row>
                                            <Col sm={12} md={12} lg={12}>
                                                <div className="hidpi-logowrap">
                                                    <strong className="navbar-logo">
                                                        <img className="navbar-img" src={Logo} alt="" />
                                                    </strong>
                                                    <div className="navbar-rightarea">

                                                        <Navbar collapseOnSelect expand="lg">
                                                            <Container>
                                                                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                                                                <Navbar.Collapse id="responsive-navbar-nav">
                                                                    <Nav className="me-auto margin-right-nav">

                                                                        <NavItem
                                                                            label="Libros"
                                                                            path="libros" />

                                                                        <NavItem
                                                                            label="Facturas"
                                                                            path="facturas" />

                                                                        <NavItem
                                                                            label="Clientes"
                                                                            path="clientes" />

                                                                        <NavItem
                                                                            label="Perfiles"
                                                                            path="perfiles" />

                                                                    </Nav>

                                                                    <Nav className="me-auto margin-left-nav">
                                                                        <Row >
                                                                            <Col xs={2} md={2} className="mt-3">
                                                                                <Row className="justify-content-center">

                                                                                    <OverlayTrigger
                                                                                        placement="bottom"
                                                                                        overlay={
                                                                                            <Tooltip>{'Cerrar sesión'}</Tooltip>
                                                                                        }>
                                                                                        <span onClick={logOut}>
                                                                                            <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                                                                        </span>
                                                                                    </OverlayTrigger>

                                                                                </Row>
                                                                            </Col>
                                                                            <Col xs={2} md={2} className="mt-3">
                                                                                <Row className="justify-content-center">

                                                                                    <OverlayTrigger
                                                                                        placement="bottom"
                                                                                        overlay={
                                                                                            <Tooltip>{tooltipUser}</Tooltip>
                                                                                        }>
                                                                                        <span>
                                                                                            <FontAwesomeIcon icon={faUser} />
                                                                                        </span>
                                                                                    </OverlayTrigger>

                                                                                </Row>
                                                                            </Col>
                                                                            <Col xs={8} md={8}>
                                                                                <Row className="justify-content-center">
                                                                                    <Col xs={12} md={12}>
                                                                                        <OverlayTrigger
                                                                                            placement="bottom"
                                                                                            overlay={
                                                                                                <Tooltip>{tooltipUser}</Tooltip>
                                                                                            }>
                                                                                            <span>
                                                                                                {localStorage.is_Name}
                                                                                            </span>
                                                                                        </OverlayTrigger>
                                                                                    </Col>
                                                                                    <Col xs={12} md={12}>
                                                                                        <OverlayTrigger
                                                                                            placement="bottom"
                                                                                            overlay={
                                                                                                <Tooltip>{tooltipUser}</Tooltip>
                                                                                            }>
                                                                                            <span>
                                                                                                {localStorage.is_Profile}
                                                                                            </span>
                                                                                        </OverlayTrigger>
                                                                                    </Col>
                                                                                </Row>
                                                                            </Col>
                                                                        </Row>
                                                                    </Nav>

                                                                </Navbar.Collapse>
                                                            </Container>
                                                        </Navbar>

                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </div>
                            </header>

                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )

    } else {
        return <Fragment></Fragment>
    }

}

function NavItem(props) {

    const { label, path } = props

    return (
        <Fragment>
            <Nav.Item>
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="tooltip-rinion">Ir a {label}</Tooltip>
                    }>
                    <Link className="nav-link color-text" to={`/${path}`}>
                        <strong>{label}</strong>
                    </Link>
                </OverlayTrigger>
            </Nav.Item>
        </Fragment>
    )

}

export default NavbarC;