import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Col, Row, Card, Button, OverlayTrigger, Tooltip, Form, InputGroup } from "react-bootstrap"
import PageLoading from "./PageLoading"
import Logo from "../assets/images/libros_logo1.png"

function PageLogin() {

    if (localStorage.length > 0)
        window.location = "/libros"

    /* A hook that is used to set the state of the component. */
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false);

    const urlPost = 'https://api-books-salvador-git-main-librosdemoel.vercel.app/api/login'


    /**
     * A function that handles the change of the form.
     */
    const handleChange = async (e) => {

        e.persist()
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });

    }

    const handleSubmit = async (e) => {

        setLoading(true)

        e.preventDefault();
        e.stopPropagation();

        const configPost = {
            method: 'post',
            url: urlPost,
            headers: {
                'Content-Type': 'application/json'
            },
            data: form
        };

        axios(configPost).then((response) => {
            const { data } = response
            if (data.error) {
                Swal.fire('Error!', data.body.mess, 'error').then(() => {
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                })
            } else {
                Swal.fire('¡Bienvenido!', data.body.mess, 'success').then(() => {
                    localStorage.is_Emial = data.body.is_Emial;
                    localStorage.is_Name = data.body.is_Name;
                    localStorage.is_Profile = data.body.is_Profile;
                    localStorage.is_security = data.body.is_security;
                    window.location = "/libros"
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                });
            }
        }).catch((error) => {
            Swal.fire('Error!', `Usuario/Contraseña invalida`, 'error').then(() => {
                setLoading(false)
            }).catch(() => {
                setLoading(false)
            });
        })

    }

    return (
        <>
            {
                loading ? (
                    <>
                        <PageLoading />
                    </>
                ) : (
                    <>
                        <Container>
                            <Row className="justify-content-center mt-5">
                                <Col xs={12} md={5} className="mt-5">
                                    <Card className="text-center shadow-lg p-3 mt-5 mb-5 bg-white rounded border-0">
                                        <Card.Body>
                                            <Form onSubmit={handleSubmit}>
                                                <Row className="justify-content-center mb-3">
                                                    <Col xs={12} md={12}>
                                                        <img className="login-img" src={Logo} alt="" />
                                                    </Col>
                                                    <Col xs={12} md={12} className="mt-3">
                                                        <Card.Title><h3 className="fw-bold text-primary">Iniciar Sesión</h3></Card.Title>
                                                    </Col>
                                                </Row>

                                                <Row className="justify-content-center mt-4 mb-3">

                                                    <Col xs={12} md={10} className="mb-3">
                                                        <GetInput
                                                            label='Correo'
                                                            value={form.email}
                                                            name="email"
                                                            handleChange={handleChange}
                                                            tooltipDescrip="Ingrese su correo"
                                                            inputType="email"
                                                        />
                                                    </Col>

                                                    <Col xs={12} md={10} className="mb-4">
                                                        <GetInput
                                                            label='Password'
                                                            value={form.pass}
                                                            name="pass"
                                                            handleChange={handleChange}
                                                            tooltipDescrip="Ingrese su contraseña"
                                                            inputType="password"
                                                        />
                                                    </Col>

                                                    <Col xs={12} md={10} className="mb-5">

                                                        <span className="d-grid gap-2">
                                                            <OverlayTrigger
                                                                placement="top"
                                                                overlay={
                                                                    <Tooltip>Iniciar sesión</Tooltip>
                                                                }>
                                                                <Button type="submit" variant="primary fw-bold">Iniciar</Button>
                                                            </OverlayTrigger>
                                                        </span>

                                                    </Col>

                                                    <Col xs={12} md={10}>
                                                        <Link to="/resetPassword">
                                                            <Card.Text className="fw-bold text-primary">¿Olvidaste tu contraseña?</Card.Text>
                                                        </Link>
                                                    </Col>

                                                </Row>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            }
        </>
    )


}

function GetInput(props) {

    //we obtain their props
    const { label, value, name, handleChange, tooltipDescrip, inputType } = props

    return (
        <Fragment>
            <InputGroup>
                <InputGroup.Text className="bg-primary text-white"><FontAwesomeIcon icon={name === "email" ? faUser : faKey} /></InputGroup.Text>


                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip>{tooltipDescrip}</Tooltip>
                    }>
                    <Form.Control
                        type={inputType}
                        placeholder={label}
                        value={value ? value : ''}
                        name={name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </OverlayTrigger>
            </InputGroup>
        </Fragment>
    )

}

export default PageLogin;