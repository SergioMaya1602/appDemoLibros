import React, { Fragment } from "react";
import { Container, Row, Col, Form, OverlayTrigger, Tooltip, FloatingLabel } from "react-bootstrap";
import ROLES from './json/roles.json'

function AddPerfilContent(props) {

    const { form, handleChangeForm } = props;

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}>

                    <Row>

                        <Col xs={12} md={12} className="mt-3">
                            <GetInput
                                label="Nombre del nuevo perfil"
                                value={form.name}
                                name="name"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="text"
                            />
                        </Col>

                        <Col xs={12} md={12} className="mt-3">
                            <GetInput
                                label="Email del nuevo perfil"
                                value={form.email}
                                name="email"
                                handleChange={handleChangeForm}
                                isRequired={true}
                                inputType="email"
                            />
                        </Col>

                        <Col xs={12} md={12} className="mt-3">
                            <span>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="tooltip-rinion">Seleccione el tipo de rol del nuevo perfil</Tooltip>
                                    }>
                                    <FloatingLabel controlId="floatingSelect" label="Rol del nuevo perfil">
                                        <Form.Select aria-label="Floating label"
                                            value={form.type ? form.type : ''}
                                            onChange={handleChangeForm} name="type">
                                            <option value="" disabled>Seleccione una opción</option>
                                            {
                                                ROLES.map((rol, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            <option value={rol.rol}>{rol.rol}</option>
                                                        </Fragment>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                    </FloatingLabel>
                                </OverlayTrigger>
                            </span>
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

export default AddPerfilContent