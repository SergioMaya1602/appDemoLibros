import React, { Fragment } from "react";
import { Container, Row, Col, Form, OverlayTrigger, Tooltip, FloatingLabel } from "react-bootstrap";

function AddClienteContent(props) {

    const { form, handleChangeForm } = props;

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}>

                    <Row>

                        <Col xs={12} md={12} className="mt-3">
                            <GetInput
                                label="Nombre del cliente"
                                value={form.nombre}
                                name="nombre"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="text"
                            />
                        </Col>

                        <Col xs={12} md={4} className="mt-3">
                            <GetInput
                                label="Calle"
                                value={form.calle}
                                name="calle"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="text"
                            />
                        </Col>

                        <Col xs={12} md={4} className="mt-3">
                            <GetInput
                                label="Número del domicilio"
                                value={form.numero}
                                name="numero"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="number"
                            />
                        </Col>

                        <Col xs={12} md={4} className="mt-3">
                            <GetInput
                                label="Código postal"
                                value={form.codigoPostal}
                                name="codigoPostal"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="number"
                            />
                        </Col>

                        <Col xs={12} md={6} className="mt-3">
                            <GetInput
                                label="Ciudad"
                                value={form.ciudad}
                                name="ciudad"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="text"
                            />
                        </Col>

                        <Col xs={12} md={6} className="mt-3">
                            <GetInput
                                label="Estado"
                                value={form.estado}
                                name="estado"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="text"
                            />
                        </Col>

                        <Col xs={12} md={12} >

                            <Row className="justify-content-center">
                                <Col xs={12} md={6} className="mt-3">
                                    <GetInput
                                        label="Teléfono del cliente"
                                        value={form.telefono}
                                        name="telefono"
                                        handleChange={handleChangeForm}
                                        isRequired={true}
                                        inputType="number"
                                    />
                                </Col>

                                <Col xs={12} md={6} className="mt-3">
                                    <GetInput
                                        label="Email del Cliente"
                                        value={form.email}
                                        name="email"
                                        handleChange={handleChangeForm}
                                        isRequired={true}
                                        inputType="email"
                                    />
                                </Col>
                            </Row>

                        </Col>


                    </Row>

                </Col>
            </Row>
        </Container>
    )

}

function GetInput(props) {

    const { label, value, name, handleChange, isRequired, inputType } = props;

    return (
        <Fragment>

            <span>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id="tooltip-rinion">{label}</Tooltip>
                    }>
                    <FloatingLabel
                        controlId="floatingInput"
                        label={label}
                    >
                        <Form.Control
                            type={inputType}
                            placeholder={label}
                            required={isRequired}
                            value={value ? value : ""}
                            onChange={handleChange}
                            name={name}
                            autoComplete="off"
                        />
                    </FloatingLabel>
                </OverlayTrigger>
            </span>

        </Fragment>
    )
}

export default AddClienteContent