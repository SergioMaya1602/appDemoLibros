import React, { useState, useEffect, Fragment } from "react";
import { Col, FloatingLabel, OverlayTrigger, Tooltip, Form, Row } from "react-bootstrap"
import roles from "./json/roles.json"

function FiltroPerfil(props) {

    const { handleChangeFiltroNombre, filtroNombre, handleChangeFiltroCorreo, filtroCorreo, handleChangeFiltroRol, filtroRol } = props

    return (
        <>
            <Row>
                <Col xs={12} md={4} className="mb-3">
                    <GetInput
                        label="Nombre"
                        tooltipDescrip="Filtrar por nombre"
                        value={filtroNombre}
                        name="filtroNombre"
                        handleChange={handleChangeFiltroNombre}
                        type="text"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={4} className="mb-3">
                    <GetInput
                        label="Correo"
                        tooltipDescrip="Filtrar por Correo"
                        value={filtroCorreo}
                        name="filtroCorreo"
                        handleChange={handleChangeFiltroCorreo}
                        type="email"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={4} className="mb-3">
                    <GetSelector
                        label="Rol"
                        tooltipDescrip={`Filtrar por rol de usuario`}
                        value={filtroRol}
                        name="filtroRol"
                        handleChange={handleChangeFiltroRol}
                        options={roles}
                        show={true}
                    />
                </Col>
            </Row>
        </>
    )

}

function GetInput(props) {

    //we obtain their props
    const { label, value, name, handleChange, tooltipDescrip, min, type, isRequired, placement, show, isReadOnly = false, isTextArea = false, style = null } = props

    if (show === true) {
        return (
            <Fragment>
                <FloatingLabel
                    controlId="floatingInput"
                    label={label}>
                    <OverlayTrigger
                        placement={placement}
                        overlay={
                            <Tooltip id={`tooltip-${name}`}>{tooltipDescrip}</Tooltip>
                        }>
                        <Form.Control
                            as={isTextArea ? "textarea" : "input"}
                            type={type}
                            placeholder={label}
                            value={value ? value : ''}
                            min={min}
                            name={name}
                            onChange={handleChange}
                            required={isRequired}
                            autoComplete="off"
                            readOnly={isReadOnly}
                            style={style}
                        />
                    </OverlayTrigger>
                </FloatingLabel>
            </Fragment>
        )
    }
}

function GetSelector(props) {

    //we obtain their props
    const { label, style = null, value, tooltipDescrip, name, handleChange, options, isRequired, show } = props

    return (
        show ?
            <>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-${name}`}>{tooltipDescrip}</Tooltip>
                    }>
                    <FloatingLabel controlId="floatingSelect" label={label}>
                        <Form.Select
                            aria-label="Floating label"
                            value={value ? value : ''}
                            onChange={handleChange}
                            name={name}
                            required={isRequired}
                            style={style}
                        >
                            <option value="">Seleccione una opción</option>
                            {
                                options.map((option, index) => {
                                    return (
                                        <Fragment key={index}>
                                            <option value={option.rol}>{option.rol}</option>
                                        </Fragment>
                                    )
                                })
                            }
                        </Form.Select>
                    </FloatingLabel>
                </OverlayTrigger>
            </> : null
    )

}

export default FiltroPerfil;