import React, { Fragment } from "react";
import { Col, FloatingLabel, OverlayTrigger, Tooltip, Form, Row } from "react-bootstrap"

function FiltroFacturaLibros(props) {

    const { handleChangeFiltroGeneralFacturaLibro, filtroGeneralFacturaLibro } = props

    return (
        <>
            <Row>

                <Col xs={12} md={12} className="mb-3">
                    <GetInput
                        label="Buscar Libro"
                        tooltipDescrip="Filtro general, buscara la palabra escrita en todos los registros de libros sin importar lugar de publicación, ISBN / ISSN, etc"
                        value={filtroGeneralFacturaLibro}
                        name="filtroGeneralLibro"
                        handleChange={handleChangeFiltroGeneralFacturaLibro}
                        type="text"
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

export default FiltroFacturaLibros;