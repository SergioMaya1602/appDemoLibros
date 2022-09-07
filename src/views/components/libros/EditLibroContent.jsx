import React, { Fragment } from "react";
import { Container, Row, Col, Form, OverlayTrigger, Tooltip, FloatingLabel } from "react-bootstrap";
import estadosOptions from "../../json/estados.json"

function EditLibroContent({ form, handleChangeForm }) {

    const revistaLibroOptions = [
        {
            value: "libro",
            name: "Libro",
        },
        {
            value: "revista",
            name: "Revista",
        }
    ]

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}>

                    <Row>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Autor"
                                value={form.autor}
                                name="autor"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Nombre del autor"
                                type="text"
                                min={0}
                                isRequired={true}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Título"
                                value={form.titulo}
                                name="titulo"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Nombre del título del libro"
                                type="text"
                                min={0}
                                isRequired={true}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Editorial"
                                value={form.editorial}
                                name="editorial"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Nombre de la editorial del libro"
                                type="text"
                                min={0}
                                isRequired={true}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetSelector
                                label="Libro / Revista"
                                value={form.tipo}
                                tooltipDescrip="¿Es un libro o una revista?"
                                name="tipo"
                                handleChange={handleChangeForm}
                                options={revistaLibroOptions}
                                show={true}
                                isRequired={true}
                            />
                        </Col>

                        {
                            form.tipo === "revista" ?
                                <>
                                    <Col xs={12} md={3} className="mt-3">
                                        <GetInput
                                            label="ISSN"
                                            tooltipDescrip="ISSN de la revista"
                                            value={form.issn}
                                            name="issn"
                                            handleChange={handleChangeForm}
                                            isRequired={false}
                                            inputType="text"
                                            show={true}
                                        />
                                    </Col>

                                    <Col xs={12} md={3} className="mt-3">
                                        <GetInput
                                            label="Número publicación / revista"
                                            tooltipDescrip="Número de publicación o número de la revista"
                                            value={form.numRevista}
                                            name="numRevista"
                                            handleChange={handleChangeForm}
                                            isRequired={false}
                                            inputType="text"
                                            show={true}
                                        />
                                    </Col>
                                </>
                                :
                                <>
                                    <Col xs={12} md={3} className="mt-3">
                                        <GetInput
                                            label="ISBN"
                                            tooltipDescrip="ISBN del libro"
                                            value={form.isbn}
                                            name="isbn"
                                            handleChange={handleChangeForm}
                                            isRequired={false}
                                            inputType="text"
                                            show={true}
                                        />
                                    </Col>
                                </>
                        }

                        <Col xs={12} md={3} className="mt-3">
                            <GetSelector
                                label="Lugar de publicación"
                                value={form.placePub}
                                tooltipDescrip="Lugar de publicación"
                                name="placePub"
                                handleChange={handleChangeForm}
                                options={estadosOptions}
                                show={true}
                                isRequired={false}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Ciudad"
                                tooltipDescrip="Ciudad del libro"
                                value={form.ciudad}
                                name="ciudad"
                                handleChange={handleChangeForm}
                                isRequired={false}
                                show={true}
                                inputType="text"
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Tema"
                                value={form.tema}
                                name="tema"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Tema del libro"
                                type="text"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Año de publicación"
                                value={form.anio}
                                name="anio"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Año de publicación del libro"
                                type="number"
                                min={0}
                                isRequired={true}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Precio"
                                value={form.precio}
                                name="precio"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Precio del libro"
                                type="number"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Número de páginas"
                                value={form.paginas}
                                name="paginas"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Número de páginas del libro"
                                type="number"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Dimensiones"
                                value={form.dimensiones}
                                name="dimensiones"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Dimensiones del libro en centímetros"
                                type="text"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Colección / Serie"
                                value={form.coleccionSerie}
                                name="coleccionSerie"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Colección / Serie del libro"
                                type="text"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Coordinadores / Antalogadores / Compiladores"
                                value={form.coordinadores}
                                name="coordinadores"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Nombre de Coordinadores / Antalogadores / Compiladores del libro"
                                type="text"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                                isTextArea={true}
                                style={{ height: '100px' }}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Nota Bibliográfica"
                                value={form.nota}
                                name="nota"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Nota Bibliográfica del libro"
                                type="text"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                                isTextArea={true}
                                style={{ height: '100px' }}
                            />
                        </Col>

                        <Col xs={12} md={3} className="mt-3">
                            <GetInput
                                label="Descripción"
                                value={form.descripcion}
                                name="descripcion"
                                handleChange={handleChangeForm}
                                tooltipDescrip="Descripción del libro"
                                type="text"
                                min={0}
                                isRequired={false}
                                placement="top"
                                show={true}
                                isTextArea={true}
                                style={{ height: '100px' }}
                            />
                        </Col>

                    </Row>

                </Col>
            </Row>
        </Container>
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
                            step={0.00001}
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
                            <option value="" disabled>Seleccione una opción</option>
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

export default EditLibroContent