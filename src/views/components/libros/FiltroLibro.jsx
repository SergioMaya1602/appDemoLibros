import React, { Fragment } from "react";
import { Col, FloatingLabel, OverlayTrigger, Tooltip, Form, Row } from "react-bootstrap"
import estadosOptions from "../../json/estados.json"

function FiltroLibro(props) {

    const { handleChangeFiltroIsbnIssnLibro, filtroIsbnIssnLibro, handleChangeFiltroTituloLibro, filtroTituloLibro, handleChangeFiltroAutorLibro, filtroAutorLibro,
        handleChangeFiltroEditorialLibro, filtroEditorialLibro, handleChangeFiltroAnioLibro, filtroAnioLibro,
        handleChangeFiltroLugarPublicacionLibro, filtroLugarPublicacionLibro, handleChangeFiltroGeneralLibro, filtroGeneralLibro } = props

    return (
        <>
            <Row>

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="ISBN / ISSN"
                        tooltipDescrip="Filtrar por ISBN / ISSN"
                        value={filtroIsbnIssnLibro}
                        name="filtroIsbnIssnLibro"
                        handleChange={handleChangeFiltroIsbnIssnLibro}
                        type="text"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="Título"
                        tooltipDescrip="Filtrar por título"
                        value={filtroTituloLibro}
                        name="filtroTituloLibro"
                        handleChange={handleChangeFiltroTituloLibro}
                        type="text"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="Autor"
                        tooltipDescrip="Filtrar por autor"
                        value={filtroAutorLibro}
                        name="filtroAutorLibro"
                        handleChange={handleChangeFiltroAutorLibro}
                        type="text"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="Editorial"
                        tooltipDescrip="Filtrar por editorial"
                        value={filtroEditorialLibro}
                        name="filtroEditorialLibro"
                        handleChange={handleChangeFiltroEditorialLibro}
                        type="text"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="Año"
                        tooltipDescrip="Filtrar por año"
                        value={filtroAnioLibro}
                        name="filtroAnioLibro"
                        handleChange={handleChangeFiltroAnioLibro}
                        type="number"
                        min={0}
                        placement="top"
                        show={true}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
                    <GetSelector
                        label="Lugar de Publicación"
                        value={filtroLugarPublicacionLibro}
                        tooltipDescrip="Filtrar por lugar de publicación"
                        name="filtroLugarPublicacionLibro"
                        handleChange={handleChangeFiltroLugarPublicacionLibro}
                        options={estadosOptions}
                        show={true}
                        isRequired={false}
                    />
                </Col>

                <Col xs={12} md={3} className="mb-3">
                    <GetInput
                        label="Buscar Libro"
                        tooltipDescrip="Filtro general, buscara la palabra escrita en todos los registros de libros sin importar lugar de publicación, ISBN / ISSN, etc"
                        value={filtroGeneralLibro}
                        name="filtroGeneralLibro"
                        handleChange={handleChangeFiltroGeneralLibro}
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

function GetSelector(props) {

    //we obtain their props
    const { label, style = null, value, tooltipDescrip, name, handleChange, options, isRequired, show } = props

    if (show === true) {
        return (
            <Fragment>

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
                                            <option value={option.value}>{option.name}</option>
                                        </Fragment>
                                    )
                                })
                            }
                        </Form.Select>
                    </FloatingLabel>
                </OverlayTrigger>

            </Fragment>
        )
    }
}

export default FiltroLibro;