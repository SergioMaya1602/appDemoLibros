import React, { Fragment, useState } from "react";
import { Col, Row, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { faTrash, faPen, faBook, faReceipt, faPlus, faHistory } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import FiltroGeneral from "../filttros/FiltroGeneral";
import { useEffect } from "react";


function GeneralCRUD(props) {

    //we obtain their props
    const { data, tableHeaders, pageOrigin, handleDelete, handlePushLibroFactura, handleEdit, hasFilter = true, triggerCrud, handleHistorial,
        hasActions = true } = props;

    const [dataCrud, setDataCrud] = useState([]);
    const [filtroNombre, setFiltroNombre] = useState("");
    const [filtroCorreo, setFiltroCorreo] = useState("");
    const [filtroRol, setFiltroRol] = useState("");
    const [filtroDireccion, setFiltroDireccion] = useState("");
    const [filtroTelefono, setFiltroTelefono] = useState("");
    const [filtroIdFactura, setFiltroIdFactura] = useState("");
    const [filtroGeneralFacturaLibro, setFiltroGeneralFacturaLibro] = useState("");
    const [filtroIsbnIssnLibro, setFiltroIsbnIssnLibro] = useState("");
    const [filtroTituloLibro, setFiltroTituloLibro] = useState("");
    const [filtroAutorLibro, setFiltroAutorLibro] = useState("");
    const [filtroEditorialLibro, setFiltroEditorialLibro] = useState("");
    const [filtroAnioLibro, setFiltroAnioLibro] = useState("");
    const [filtroLugarPublicacionLibro, setFiltroLugarPublicacionLibro] = useState("");
    const [filtroGeneralLibro, setFiltroGeneralLibro] = useState("");

    useEffect(() => {
        getDataCrud();
    }, [triggerCrud, filtroNombre, filtroCorreo, filtroRol, filtroDireccion, filtroTelefono, filtroIdFactura, filtroIsbnIssnLibro,
        filtroTituloLibro, filtroAutorLibro, filtroEditorialLibro, filtroAnioLibro, filtroLugarPublicacionLibro, filtroLugarPublicacionLibro,
        filtroGeneralLibro, filtroGeneralFacturaLibro])

    const getDataCrud = async () => {

        let dataFiltered = data

        dataFiltered = filtrarNombre(dataFiltered)

        dataFiltered = filtrarCorreo(dataFiltered)

        dataFiltered = filtrarRol(dataFiltered)

        dataFiltered = filtrarDireccion(dataFiltered)

        dataFiltered = filtrarTelefono(dataFiltered)

        dataFiltered = filtrarIdFactura(dataFiltered)

        dataFiltered = filtrarIsbnIssnLibro(dataFiltered)

        dataFiltered = filtrarTituloLibro(dataFiltered)

        dataFiltered = filtrarAutorLibro(dataFiltered)

        dataFiltered = filtrarEditorialLibro(dataFiltered)

        dataFiltered = filtrarAnioLibro(dataFiltered)

        dataFiltered = filtrarLugarPublicacionLibro(dataFiltered)

        dataFiltered = filtrarGeneralLibro(dataFiltered)

        dataFiltered = filtrarGeneralFacturaLibro(dataFiltered)

        await setDataCrud(dataFiltered)

    }

    const handleChangeFiltroNombre = async (e) => {

        e.persist();
        await setFiltroNombre(e.target.value);

    }

    const handleChangeFiltroCorreo = async (e) => {

        e.persist();
        await setFiltroCorreo(e.target.value);

    }

    const handleChangeFiltroRol = async (e) => {

        e.persist();
        await setFiltroRol(e.target.value);

    }

    const handleChangeFiltroDireccion = async (e) => {

        e.persist();
        await setFiltroDireccion(e.target.value);

    }

    const handleChangeFiltroTelefono = async (e) => {

        e.persist();
        await setFiltroTelefono(e.target.value);

    }

    const handleChangeFiltroIdFactura = async (e) => {

        e.persist();
        await setFiltroIdFactura(e.target.value);

    }

    const handleChangeFiltroIsbnIssnLibro = async (e) => {

        e.persist();
        await setFiltroIsbnIssnLibro(e.target.value);

    }

    const handleChangeFiltroTituloLibro = async (e) => {

        e.persist();
        await setFiltroTituloLibro(e.target.value);

    }

    const handleChangeFiltroAutorLibro = async (e) => {

        e.persist();
        await setFiltroAutorLibro(e.target.value);

    }

    const handleChangeFiltroEditorialLibro = async (e) => {

        e.persist();
        await setFiltroEditorialLibro(e.target.value);

    }

    const handleChangeFiltroAnioLibro = async (e) => {

        e.persist();
        await setFiltroAnioLibro(e.target.value);

    }

    const handleChangeFiltroLugarPublicacionLibro = async (e) => {

        e.persist();
        await setFiltroLugarPublicacionLibro(e.target.value);

    }

    const handleChangeFiltroGeneralLibro = async (e) => {

        e.persist();
        await setFiltroGeneralLibro(e.target.value);

    }

    const handleChangeFiltroGeneralFacturaLibro = async (e) => {

        e.persist();
        await setFiltroGeneralFacturaLibro(e.target.value);

    }

    /**
     * It filters an array of objects by a string input
     */
    const filtrarNombre = (arrayData) => {

        let arrayFiltrado = arrayData;

        if (filtroNombre) {
            arrayFiltrado = arrayData.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.nombre) {
                    const auxNameData = item.nombre.toString().toLowerCase();
                    let auxNameFilter = filtroNombre.toString().toLowerCase();
                    if (auxNameData.includes(auxNameFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            })
        }

        return arrayFiltrado
    }

    /**
     * It filters the data by email.
     * @returns const filtrarCorreo = (arrayData) => {
     */
    const filtrarCorreo = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroCorreo) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayData.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.correo) {
                    const auxCorreoData = item.correo.toString().toLowerCase();
                    const auxCorreoFilter = filtroCorreo.toString().toLowerCase();
                    if (auxCorreoData.includes(auxCorreoFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                } else if (item.email) {
                    const auxCorreoData = item.email.toString().toLowerCase();
                    const auxCorreoFilter = filtroCorreo.toString().toLowerCase();
                    if (auxCorreoData.includes(auxCorreoFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }

        return arrayFiltrado
    }

    /**
     * It filters the data by role.
     * @returns const filtrarRol = (arrayData) => {
     */
    const filtrarRol = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroRol) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.tipo) {
                    const auxRolData = item.tipo.toString().toLowerCase();
                    const auxRolFilter = filtroRol.toString().toLowerCase();
                    if (auxRolData.includes(auxRolFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by the address.
     * @returns const filtrarDireccion = (arrayData) => {
     */
    const filtrarDireccion = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroDireccion) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.direccion) {
                    const auxDireccionData = item.direccion.toString().toLowerCase();
                    const auxDireccionFilter = filtroDireccion.toString().toLowerCase();
                    if (auxDireccionData.includes(auxDireccionFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by phone number.
     * @returns const filtrarTelefono = (arrayData) => {
     */
    const filtrarTelefono = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroTelefono) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.telefono) {
                    const auxTelefonoData = item.telefono.toString().toLowerCase();
                    const auxTelefonoFilter = filtroTelefono.toString().toLowerCase();
                    if (auxTelefonoData.includes(auxTelefonoFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by the id of the invoice.
     * @returns const filtrarIdFactura = (arrayData) => {
     */
    const filtrarIdFactura = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroIdFactura) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.id_cotizacion) {
                    const auxIdFacturaData = item.id_cotizacion.toString().toLowerCase();
                    const auxIdFacturaFilter = filtroIdFactura.toString().toLowerCase();
                    if (auxIdFacturaData.includes(auxIdFacturaFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by the ISBN or ISSN of the book.
     * @returns return arrayFiltrado
     */
    const filtrarIsbnIssnLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroIsbnIssnLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.isbn || item.issn) {

                    let hasISBN = item.isbn ? true : false;
                    let hasISSN = item.issn ? true : false;

                    const auxIsbnIssnLibroFilter = filtroIsbnIssnLibro.toString().toLowerCase();

                    if (hasISBN && hasISSN) { // caso que tenga isbn e issn
                        if (
                            item.issn.toString().toLowerCase().includes(auxIsbnIssnLibroFilter) ||
                            item.isbn.toString().toLowerCase().includes(auxIsbnIssnLibroFilter)
                        ) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                            return item //si lo contiene lo regresamos
                        }
                    } else if (hasISBN && !hasISSN) { //caso que tenga isbn y no issn
                        if (item.isbn.toString().toLowerCase().includes(auxIsbnIssnLibroFilter)) {
                            //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                            return item //si lo contiene lo regresamos
                        }
                    } else if (!hasISBN && hasISSN) { //caso que no contenga isbn y contenga issn
                        if (item.issn.toString().toLowerCase().includes(auxIsbnIssnLibroFilter)) {
                            //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                            return item //si lo contiene lo regresamos
                        }
                    }

                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the title of the book
     * @returns const filtrarTituloLibro = (arrayData) => {
     */
    const filtrarTituloLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroTituloLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.titulo) {
                    const auxTituloLibroData = item.titulo.toString().toLowerCase();
                    const auxTituloLibroFilter = filtroTituloLibro.toString().toLowerCase();
                    if (auxTituloLibroData.includes(auxTituloLibroFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by author.
     * @returns const filtrarAutorLibro = (arrayData) => {
     */
    const filtrarAutorLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroAutorLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.autor) {
                    const auxAutorLibroData = item.autor.toString().toLowerCase();
                    const auxAutorLibroFilter = filtroAutorLibro.toString().toLowerCase();
                    if (auxAutorLibroData.includes(auxAutorLibroFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by the editorial of the book.
     * @returns const filtrarEditorialLibro = (arrayData) => {
     */
    const filtrarEditorialLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroEditorialLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.editorial) {
                    const auxEditorialLibroData = item.editorial.toString().toLowerCase();
                    const auxEditorialLibroFilter = filtroEditorialLibro.toString().toLowerCase();
                    if (auxEditorialLibroData.includes(auxEditorialLibroFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by year.
     * @returns const filtrarAnioLibro = (arrayData) => {
     */
    const filtrarAnioLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroAnioLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.anio) {
                    const auxAnioLibroData = item.anio.toString().toLowerCase();
                    const auxAnioLibroFilter = filtroAnioLibro.toString().toLowerCase();
                    if (auxAnioLibroData.includes(auxAnioLibroFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data by the place of publication of the book.
     * @returns return arrayFiltrado
     */
    const filtrarLugarPublicacionLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroLugarPublicacionLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                if (item.placePub) {
                    const auxLugarPublicacionLibroData = item.placePub.toString().toLowerCase();
                    const auxLugarPublicacionLibroFilter = filtroLugarPublicacionLibro.toString().toLowerCase();
                    if (auxLugarPublicacionLibroData.includes(auxLugarPublicacionLibroFilter)) { //pasamos a string y a minusculas y preguntamos si contiene nuestro input
                        return item //si lo contiene lo regresamos
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters the data in the table.
     * @returns return arrayFiltrado
     */
    const filtrarGeneralLibro = (arrayData) => {

        let arrayFiltrado = arrayData;
        if (filtroGeneralLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            arrayFiltrado = arrayFiltrado.filter((item) => {
                //como la funcion filter tiene su callback, generamos una funcion dentro de filter
                const auxGeneralLibroFilter = filtroGeneralLibro.toString().toLowerCase();

                for (let propiedad in item) {
                    if (item[propiedad]) {
                        const auxGeneralLibroData = item[propiedad].toString().toLowerCase()
                        if (auxGeneralLibroData.includes(auxGeneralLibroFilter)) {
                            return item;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                }
            });
        }
        return arrayFiltrado
    }

    /**
     * It filters an array of objects based on a search term
     * @returns return arrayFiltrado
     */
    const filtrarGeneralFacturaLibro = (arrayData) => {

        let arrayFiltrado = [];
        if (filtroGeneralFacturaLibro) {
            //asignamos a una variable array lo que regrese la funcion filter
            for (let i = 0; i < arrayData.length; i++) {
                const auxGeneralLibroFilter = filtroGeneralFacturaLibro.toString().toLowerCase();
                const keys = Object.keys(arrayData[i]);
                keys.forEach((key) => {
                    if (arrayData[i][key]) {
                        if (arrayData[i][key].toString().toLowerCase().includes(auxGeneralLibroFilter)) {
                            arrayFiltrado.push(arrayData[i])
                        }
                    }
                });
            }
        } else {
            arrayFiltrado = arrayData
        }
        return arrayFiltrado
    }

    /**
     * It returns a component based on the value of the variable pageOrigin
     * @returns A component that is being rendered.
     */
    const CRUDMenu = () => {

        switch (pageOrigin) {

            case "libros":
                return <CRUDLibros libros={dataCrud} handleDelete={handleDelete} handleEdit={handleEdit} handleHistorial={handleHistorial} />

            case "facturas":
                return <CRUDFacturas facturas={dataCrud} handleDelete={handleDelete} handleEdit={handleEdit} />

            case "clientes":
                return <CRUDClientes clientes={dataCrud} handleDelete={handleDelete} handleEdit={handleEdit} />

            case "perfiles":
                return <CRUDPerfiles perfiles={dataCrud} handleDelete={handleDelete} handleEdit={handleEdit} />

            case "facturas/libros":
                return <CRUDFacturasLibros libros={dataCrud} handlePushLibroFactura={handlePushLibroFactura} />

            case "libros/historial":
                return <CRUDLibrosHistorial clientes={data} />

            default:
                return null;
        }

    }

    return (
        <Fragment>

            {
                hasFilter ?
                    <>
                        <Col xs={12} md={12} className="mt-3 mb-3">
                            <FiltroGeneral
                                pageOrigin={pageOrigin}
                                handleChangeFiltroNombre={handleChangeFiltroNombre}
                                filtroNombre={filtroNombre}
                                handleChangeFiltroCorreo={handleChangeFiltroCorreo}
                                filtroCorreo={filtroCorreo}
                                handleChangeFiltroRol={handleChangeFiltroRol}
                                filtroRol={filtroRol}
                                handleChangeFiltroDireccion={handleChangeFiltroDireccion}
                                filtroDireccion={filtroDireccion}
                                handleChangeFiltroTelefono={handleChangeFiltroTelefono}
                                filtroTelefono={filtroTelefono}
                                handleChangeFiltroIdFactura={handleChangeFiltroIdFactura}
                                filtroIdFactura={filtroIdFactura}
                                handleChangeFiltroIsbnIssnLibro={handleChangeFiltroIsbnIssnLibro}
                                filtroIsbnIssnLibro={filtroIsbnIssnLibro}
                                handleChangeFiltroTituloLibro={handleChangeFiltroTituloLibro}
                                filtroTituloLibro={filtroTituloLibro}
                                handleChangeFiltroAutorLibro={handleChangeFiltroAutorLibro}
                                filtroAutorLibro={filtroAutorLibro}
                                handleChangeFiltroEditorialLibro={handleChangeFiltroEditorialLibro}
                                filtroEditorialLibro={filtroEditorialLibro}
                                handleChangeFiltroAnioLibro={handleChangeFiltroAnioLibro}
                                filtroAnioLibro={filtroAnioLibro}
                                handleChangeFiltroLugarPublicacionLibro={handleChangeFiltroLugarPublicacionLibro}
                                filtroLugarPublicacionLibro={filtroLugarPublicacionLibro}
                                handleChangeFiltroGeneralLibro={handleChangeFiltroGeneralLibro}
                                filtroGeneralLibro={filtroGeneralLibro}
                                handleChangeFiltroGeneralFacturaLibro={handleChangeFiltroGeneralFacturaLibro}
                                filtroGeneralFacturaLibro={filtroGeneralFacturaLibro}
                            />
                        </Col>
                    </> :
                    null
            }

            <Table striped hover responsive className="align-middle text-center ">
                <thead>
                    <tr>
                        {
                            tableHeaders.map((header, index) => {
                                return (
                                    <th key={index}>{header}</th>
                                )
                            })
                        }
                        {
                            hasActions ?
                                <>
                                    <th>Acciones</th>
                                </> :
                                null
                        }
                    </tr>
                </thead>
                {
                    CRUDMenu()
                }
            </Table>

        </Fragment>
    )

}

function CRUDLibros(props) {

    //we obtaint their props
    const { libros, handleDelete, handleEdit, handleHistorial } = props

    return (
        <Fragment>
            <tbody>

                {

                    libros && libros.map((libro, index) => {
                        return (

                            <tr key={index}>

                                <td>{index + 1}</td>
                                <td>{libro.autor}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.editorial}</td>
                                <td>{`${libro.isbn} ${libro.issn.length > 1 ? '' + libro.issn : ''}`}</td>
                                <td>{libro.anio}</td>

                                <td>
                                    <Row>
                                        <Col xs={12} md={4} className="mb-1">
                                            <ButtonEdit
                                                tooltip={`Editar "${libro.titulo}"`}
                                                handleEdit={handleEdit}
                                                id={libro.idLibro}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="mb-1">
                                            <ButtonHistory
                                                tooltip={`Historial "${libro.titulo}"`}
                                                handleHistorial={handleHistorial}
                                                id={libro.idLibro}
                                            />
                                        </Col>
                                        <Col xs={12} md={4} className="ml-1">
                                            <ButtonDelete
                                                tooltip={`Eliminar "${libro.titulo}"`}
                                                handleDelete={handleDelete}
                                                id={libro.idLibro}
                                                msg={`el libro "${libro.titulo}"`}
                                            />
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>


        </Fragment>
    )


}

function CRUDFacturas(props) {

    //we obtaint their props
    const { facturas, handleEdit, handleDelete } = props

    return (
        <Fragment>
            <tbody>

                {

                    facturas && facturas.map((factura, index) => {
                        return (

                            <tr key={index}>
                                <td>{factura.id_cotizacion}</td>
                                <td>{factura.nombre}</td>
                                <td>{factura.calle} {factura.numero}  {factura.codigoPostal} <br></br> {factura.ciudad}  {factura.estado}</td>
                                <td>{factura.telefono}</td>
                                <td>{factura.email}</td>
                                <td>
                                    <Row>

                                        <Col xs={12} md={2} className="mb-1">
                                            <ButtonEdit
                                                tooltip={`Editar factura "${factura.id_cotizacion}"`}
                                                handleEdit={handleEdit}
                                                id={factura.id_cotizacion}
                                            />
                                        </Col>

                                        <Col xs={12} md={2} className="mb-1">
                                            <ButtonDownloadMArc21
                                                tooltip={`Descargar MARC21 ${factura.id_cotizacion}`}
                                                msg={`la factura ${factura.id_cotizacion}`}
                                                id={factura.id_cotizacion}
                                            />
                                        </Col>

                                        <Col xs={12} md={2} className="mb-1">
                                            <ButtonDownloadContrato
                                                tooltip={`Descargar Pedido ${factura.id_cotizacion}`}
                                                msg={`la factura ${factura.id_cotizacion}`}
                                                id={factura.id_cotizacion}
                                            />
                                        </Col>
                                        <Col xs={12} md={2} className="mb-1">
                                            <ButtonDownloadPedido
                                                tooltip={`Descargar Contrato ${factura.id_cotizacion}`}
                                                msg={`la factura ${factura.id_cotizacion}`}
                                                id={factura.id_cotizacion}
                                            />
                                        </Col>
                                        <Col xs={12} md={2} className="mb-1">
                                            <ButtonDelete
                                                tooltip={`Eliminar factura "${factura.id_cotizacion}"`}
                                                handleDelete={handleDelete}
                                                id={factura.id_cotizacion}
                                                msg={`la factura "${factura.id_cotizacion}"`}
                                            />
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>


        </Fragment>
    )


}

function CRUDClientes(props) {

    //we obtaint their props
    const { clientes, handleDelete, handleEdit } = props

    return (
        <Fragment>
            <tbody>

                {

                    clientes && clientes.map((cliente, index) => {
                        return (

                            <tr key={index}>

                                <td>{cliente.nombre}</td>
                                <td>{`${cliente.calle} #${cliente.numero},  ${cliente.calle}, ${cliente.ciudad}, ${cliente.estado}`}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.email}</td>

                                <td>
                                    <Row>
                                        <Col xs={12} md={6} className="mb-1">
                                            <ButtonEdit
                                                tooltip={`Editar a ${cliente.nombre}`}
                                                handleEdit={handleEdit}
                                                id={cliente.idcliente}
                                            />
                                        </Col>
                                        <Col xs={12} md={6} className="ml-1">
                                            <ButtonDelete
                                                tooltip={`Eliminar a ${cliente.nombre}`}
                                                handleDelete={handleDelete}
                                                id={cliente.idcliente}
                                                msg={`al cliente "${cliente.nombre}"`}
                                            />
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>


        </Fragment>
    )


}

function CRUDPerfiles(props) {

    //we obtaint their props
    const { perfiles, handleDelete, handleEdit } = props

    return (
        <Fragment>
            <tbody>

                {

                    perfiles && perfiles.map((perfil, index) => {
                        return (

                            <tr key={index}>

                                <td>{perfil.nombre}</td>
                                <td>{perfil.correo}</td>
                                <td>{perfil.tipo}</td>

                                <td>
                                    <Row className="justify-content-center">
                                        <Col xs={12} md={3} className="mb-1">
                                            <ButtonEdit
                                                tooltip={`Editar a ${perfil.nombre}`}
                                                handleEdit={handleEdit}
                                                id={perfil.id}
                                            />
                                        </Col>
                                        <Col xs={12} md={3} className="ml-1">
                                            <ButtonDelete
                                                tooltip={`Eliminar a ${perfil.nombre}`}
                                                handleDelete={handleDelete}
                                                id={perfil.id}
                                                msg={`el cliente ${perfil.nombre}`}
                                            />
                                        </Col>
                                    </Row>
                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>


        </Fragment>
    )


}

function CRUDFacturasLibros(props) {

    //we obtaint their props
    const { libros, handlePushLibroFactura } = props

    return (
        <Fragment>
            <tbody>

                {

                    libros && libros.map((libro, index) => {
                        return (

                            <tr key={index}>

                                <td>{libro.autor}</td>
                                <td>{libro.titulo}</td>
                                <td>{libro.editorial}</td>
                                <td>{`${libro.isbn} ${libro.issn ? '/ ' + libro.issn : ''}`}</td>

                                <td>

                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip-rinion">{`Agregar "${libro.titulo}" a la factura`}</Tooltip>
                                        }>
                                        <Button variant="success" onClick={() => {
                                            handlePushLibroFactura(libro)
                                        }}>
                                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                        </Button>
                                    </OverlayTrigger>

                                </td>
                            </tr>
                        )
                    })
                }

            </tbody>


        </Fragment>
    )


}

function CRUDLibrosHistorial(props) {

    //we obtaint their props
    const { clientes } = props

    let date = new Date(clientes[0].fecha_cotizacion);
    let fullDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

    return (
        <Fragment>
            <tbody>

                {

                    clientes && clientes.map((cliente, index) => {
                        return (

                            <tr key={index}>
                                <td>{cliente.cantidad}</td>
                                <td>{`${cliente.calle} #${cliente.numero},  ${cliente.calle}, ${cliente.ciudad}, ${cliente.estado}`}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefono}</td>
                                <td>{fullDate}</td>
                            </tr>
                        )
                    })
                }

            </tbody>


        </Fragment>
    )


}

function ButtonEdit(props) {

    //we obtain their props
    const { tooltip, handleEdit, id } = props

    return (
        <Fragment>

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="tooltip-rinion">{tooltip}</Tooltip>
                }>
                <Button variant="warning" onClick={() => { handleEdit(id) }} >
                    <FontAwesomeIcon icon={faPen} className="text-white"></FontAwesomeIcon>
                </Button>
            </OverlayTrigger>

        </Fragment>
    )

}

function ButtonDelete(props) {

    //we obtain their props
    const { tooltip, handleDelete, id, msg } = props
    return (
        <Fragment>

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="tooltip-rinion">{tooltip}</Tooltip>
                }>
                <Button variant="danger" onClick={() => {
                    Swal.fire({
                        title: `¿Desea eliminar ${msg} ?`,
                        icon: 'error',
                        iconHtml: '!',
                        confirmButtonText: 'Aceptar',
                        cancelButtonText: 'Cancelar',
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        showCancelButton: true,
                        showCloseButton: true
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let res = handleDelete(id)
                            res ?
                                Swal.fire(`¡${msg.charAt(0).toUpperCase() + msg.slice(1)} ha sido eliminado!`, '', 'success') :
                                Swal.fire(`¡Oooooops!`, 'Algo salio mal, reintenlo, o reporte el error al admin de la herramienta', 'error')
                        }
                    })
                }}>
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </Button>
            </OverlayTrigger>

        </Fragment>
    )

}

function ButtonHistory(props) {
    //we obtain their props
    const { tooltip, id, handleHistorial } = props
    return (
        <Fragment>

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="tooltip-rinion">{tooltip}</Tooltip>
                }>
                <Button variant="success" onClick={() => { handleHistorial(id) }}>
                    <FontAwesomeIcon icon={faHistory}></FontAwesomeIcon>
                </Button>
            </OverlayTrigger>

        </Fragment>
    )

}

function ButtonDownloadContrato(props) {

    //we obtain their props
    const { tooltip, id } = props
    return (
        <Fragment>

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="tooltip-rinion">{tooltip}</Tooltip>
                }>
                <Button variant="success" onClick={() => {

                    window.open("https://api-books-salvador-git-main-librosdemoel.vercel.app/api/excelContrato/" + id + "?token=" + localStorage.is_security, "_blank")

                }}>
                    <FontAwesomeIcon icon={faReceipt}></FontAwesomeIcon>
                </Button>
            </OverlayTrigger>

        </Fragment>
    )

}

function ButtonDownloadPedido(props) {

    //we obtain their props
    const { tooltip, id } = props
    return (
        <Fragment>

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="tooltip-rinion">{tooltip}</Tooltip>
                }>
                <Button variant="primary" onClick={() => {

                    window.open("https://api-books-salvador-git-main-librosdemoel.vercel.app/api/excelPedido/" + id + "?token=" + localStorage.is_security, "_blank")

                }}>
                    <FontAwesomeIcon icon={faReceipt} className="text-white"></FontAwesomeIcon>
                </Button>
            </OverlayTrigger>

        </Fragment>
    )

}

function ButtonDownloadMArc21(props) {

    //we obtain their props
    const { tooltip, id } = props
    return (
        <Fragment>

            <OverlayTrigger
                placement="top"
                overlay={
                    <Tooltip id="tooltip-rinion">{tooltip}</Tooltip>
                }>
                <Button variant="info" onClick={() => {

                    window.open("https://api-books-salvador-git-main-librosdemoel.vercel.app/api/marc21/" + id + "?token=" + localStorage.is_security, "_blank")

                }}>
                    <FontAwesomeIcon icon={faBook} className="text-white"></FontAwesomeIcon>
                </Button>
            </OverlayTrigger>

        </Fragment>
    )

}
export default GeneralCRUD;