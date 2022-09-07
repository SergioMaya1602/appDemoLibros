import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Form, OverlayTrigger, Tooltip, FloatingLabel, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faMinus, faBook } from "@fortawesome/free-solid-svg-icons";
import GeneralCRUD from "../crud/GeneralCRUD";

function AddFacturaContent(props) {

    const { form, handleChangeForm, dataLibros, dataClientes, arrayLibros, setArrayLibros } = props;
    const tableHeaders = ["Autor", "Títutlo", "Editorial(s)", "ISBN / ISSN"];

    //const [arrayLibros, setArrayLibros] = useState([]);
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        setArrayLibros(arrayLibros)
    }, [trigger]);

    /**
     * A function that is responsible for adding a book to the invoice.
     */
    const handlePushLibroFactura = async (libro) => {

        if (arrayLibros.length > 0) { //preguntamos si esta vacio el arreglo de libros - Factura

            let dontExist = true;

            for (let i = 0; i < arrayLibros.length; i++) {

                if (arrayLibros[i].idLibro === libro.idLibro) {

                    dontExist = false;

                    let auxArrayLibros = arrayLibros;
                    auxArrayLibros[i].cantidad = auxArrayLibros[i].cantidad + 1

                    await setArrayLibros(auxArrayLibros)
                    setTrigger(!trigger)
                    break;
                }

            }
            if (dontExist) {

                libro.cantidad = 1;
                await setArrayLibros([...arrayLibros, libro])
                setTrigger(!trigger)
            }

        } else {//si no hay datos entonces colocaremos el libro

            libro.cantidad = 1;
            await setArrayLibros([
                ...arrayLibros,
                libro
            ])
            setTrigger(!trigger)

        }

    }

    /**
     * It substracts the quantity of a book from the array of books.
     */
    const substractCantidad = async (index) => {

        let auxArray = arrayLibros;

        auxArray[index].cantidad = auxArray[index].cantidad - 1;

        await setArrayLibros(auxArray);

        setTrigger(!trigger);

    }

    /**
     * It deletes the book from the array of books, and then it sets the array of books to the new
     * array of books
     */
    const popLibro = async (index) => {
        let auxArray = arrayLibros;
        auxArray.splice(index, 1);

        auxArray.length === 0 ? await setArrayLibros([]) : await setArrayLibros(auxArray)

        setTrigger(!trigger)
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={12}>

                    <Row>

                        <Col xs={12} md={3} className="mt-3">
                            <Row>

                                <Col xs={12} md={12}>
                                    <span>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip-rinion">Seleccione el cliente al cual quiere hacer su factura</Tooltip>
                                            }>
                                            <FloatingLabel controlId="floatingSelect" label="Cliente">
                                                <Form.Select aria-label="Floating label"
                                                    value={form.cliente ? form.cliente : ''}
                                                    onChange={handleChangeForm} name="cliente" required={true}>
                                                    <option value="" disabled>Seleccione una opción</option>
                                                    {
                                                        dataClientes && dataClientes.map((cliente, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <option value={cliente.idcliente}>{cliente.nombre}</option>
                                                                </Fragment>
                                                            )
                                                        })
                                                    }
                                                </Form.Select>
                                            </FloatingLabel>
                                        </OverlayTrigger>
                                    </span>
                                </Col>

                                {/* <Col xs={12} md={12}>
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
                                </Col> */}

                                <Col xs={12} md={12} className="mt-3">
                                    <h4 className="text-center">Libros a facturar</h4>
                                </Col>

                                <Col xs={12} md={12} className="mt-3">
                                    {
                                        arrayLibros.length > 0 ?
                                            arrayLibros && arrayLibros.map((libro, index) => {
                                                return (
                                                    <Alert variant="info" key={index}>
                                                        <Alert.Heading>{libro.titulo}</Alert.Heading>
                                                        <hr />
                                                        <Row>
                                                            <div className="d-flex">

                                                                {
                                                                    libro.cantidad > 1 ? <Col xs={2} md={2} className="d-flex justify-content-end mt-auto">
                                                                        <OverlayTrigger
                                                                            placement="top"
                                                                            overlay={
                                                                                <Tooltip id="tooltip-rinion">{`Quitar una unidad`}</Tooltip>
                                                                            }>
                                                                            <Button className="justify-content-end" size="sm" variant="outline-danger" onClick={() => {
                                                                                substractCantidad(index)
                                                                            }}>
                                                                                <FontAwesomeIcon icon={faMinus} />
                                                                            </Button>
                                                                        </OverlayTrigger>
                                                                    </Col> : null
                                                                }
                                                                <Col xs={2} md={2} className="d-flex justify-content-end mt-auto">
                                                                    <OverlayTrigger
                                                                        placement="top"
                                                                        overlay={
                                                                            <Tooltip id="tooltip-rinion">{`Tienes ${libro.cantidad} ${libro.cantidad > 1 ? "libros" : "libro"} "${libro.titulo}" en esta factura`}</Tooltip>
                                                                        }>
                                                                        <Button className="justify-content-end" size="sm" variant="dark">
                                                                            <FontAwesomeIcon icon={faBook} />
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                </Col>
                                                                <Col xs={2} md={2} className="d-flex justify-content-end mt-auto">
                                                                    <OverlayTrigger
                                                                        placement="top"
                                                                        overlay={
                                                                            <Tooltip id="tooltip-rinion">{`Tienes ${libro.cantidad} ${libro.cantidad > 1 ? "libros" : "libro"} "${libro.titulo}" en esta factura`}</Tooltip>
                                                                        }>
                                                                        <Button className="justify-content-end" size="sm" variant="dark">
                                                                            {libro.cantidad}
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                </Col>
                                                                <Col xs={2} md={2} className="d-flex justify-content-end mt-auto">
                                                                    <OverlayTrigger
                                                                        placement="top"
                                                                        overlay={
                                                                            <Tooltip id="tooltip-rinion">{`Sumar una unidad`}</Tooltip>
                                                                        }>
                                                                        <Button className="justify-content-end" size="sm" variant="outline-success" onClick={() => { handlePushLibroFactura(libro) }}>
                                                                            <FontAwesomeIcon icon={faPlus} />
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                </Col>
                                                                <Col xs={4} md={4} className="d-flex justify-content-end mt-auto">
                                                                    <OverlayTrigger
                                                                        placement="top"
                                                                        overlay={
                                                                            <Tooltip id="tooltip-rinion">{`Eliminar de la factura el libro "${libro.titulo}"`}</Tooltip>
                                                                        }>
                                                                        <Button className="justify-content-end" size="sm" variant="outline-danger" onClick={() => {
                                                                            popLibro(index)
                                                                        }}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                </Col>

                                                            </div>

                                                        </Row>
                                                    </Alert>
                                                )
                                            }) :
                                            <Alert variant="warning">
                                                <p>No hay libros en esta factura, seleccione los libros que desea agregar a la factura de la tabla siguiente.</p>
                                            </Alert>
                                    }
                                </Col>

                            </Row>
                        </Col>

                        <Col xs={12} md={9} className="mt-3">

                            <Row>

                                <Col xs={12} md={12}>
                                    <h4 className="text-center">Libros a facturar</h4>
                                </Col>

                                <Col xs={12} md={12}>

                                    {/* CRUD LIBROS */}

                                    <GeneralCRUD
                                        data={dataLibros}
                                        handlePushLibroFactura={handlePushLibroFactura}
                                        tableHeaders={tableHeaders}
                                        pageOrigin='facturas/libros'
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

export default AddFacturaContent;