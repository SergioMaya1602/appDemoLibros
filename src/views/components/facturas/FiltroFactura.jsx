import React, { useState, useEffect, Fragment } from "react";
import { Col, FloatingLabel, OverlayTrigger, Tooltip, Form, Row } from "react-bootstrap"

function FiltroFactura(props) {

    const { handleChangeFiltroNombre, filtroNombre, handleChangeFiltroCorreo, filtroCorreo, handleChangeFiltroDireccion, filtroDireccion,
        handleChangeFiltroTelefono, filtroTelefono, handleChangeFiltroIdFactura, filtroIdFactura } = props

    return (
        <>
            <Row>

                <Col xs={12} md={2} className="mb-3">
                    <GetInput
                        label="Factura"
                        tooltipDescrip="Filtrar por número de factura (id)"
                        value={filtroIdFactura}
                        name="filtroIdFactura"
                        handleChange={handleChangeFiltroIdFactura}
                        type="number"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
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

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="Dirección"
                        tooltipDescrip="Filtrar por dirección"
                        value={filtroDireccion}
                        name="filtroDireccion"
                        handleChange={handleChangeFiltroDireccion}
                        type="text"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={2} className="mb-3">
                    <GetInput
                        label="Teléfono"
                        tooltipDescrip="Filtrar por teléfono"
                        value={filtroTelefono}
                        name="filtroTelefono"
                        handleChange={handleChangeFiltroTelefono}
                        type="number"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={2} className="mb-3">
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


export default FiltroFactura;