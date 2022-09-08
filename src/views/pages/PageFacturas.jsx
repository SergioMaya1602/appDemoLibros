import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import GeneralCRUD from "../components/crud/GeneralCRUD";
import PageLoading from "./PageLoading"
import AddButton from "../components/crud/AddButton";
import ModalGeneralAdd from "../components/modals/ModalGeneralAdd";
import ModalGeneralEdit from "../components/modals/ModalGeneralEdit";

function PageFacturas() {

    //we asignaed the constants, variables and states
    const [dataFacturas, setDataFacturas] = useState([]);
    const [dataEditFactura, setDataEditFactura] = useState([])
    const [dataClientes, setDataClientes] = useState([]);
    const [dataLibros, setDataLibros] = useState([]);
    const [loadingFacturas, setLoadingFacturas] = useState(false);
    const [isDoneFacturas, setIsDoneFacturas] = useState(false);
    const [modalEditarFactura, setModalEditarFactura] = useState(false);
    const [modalInsertarFactura, setModalInsertarFactura] = useState(false);
    const [triggerDeleteFactura, setTriggerDeleteFactura] = useState(false);
    const [triggerCrud, setTriggerCrud] = useState(false);
    const tableHeaders = ["Id Factura", "Nombre del Cliente", "Dirección", "Teléfono", "Correo"];

    //axios config
    const URLAPI = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/";
    //const urlEndPointClientes = URLAPI ? URLAPI + "clientes" : "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/clientes";
    //const urlEndPointLibros = URLAPI ? URLAPI + "libros" : "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/libros";
    //const urlEndPointFacturas = URLAPI ? URLAPI + "facturas" : "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/facturas";
    const urlEndPointFacturasDelete = URLAPI ? URLAPI + "cotizaciones" : "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/cotizaciones";
    const urlEndPointFacturasAll = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/allDataFacturas/";
    const configEndPoint = {
        method: undefined,
        url: undefined,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        fetchDataFacturas();
    }, [modalInsertarFactura, triggerDeleteFactura])

    /**
     * A function that makes a request to the API to get the data of the books.
     */
    const fetchDataFacturas = async () => {
        setLoadingFacturas(true);

        configEndPoint.method = "GET";
        configEndPoint.url = urlEndPointFacturasAll;

        await axios(configEndPoint).then((response) => {
            const data = response.data.body || []
            const { clientes, facturacion, libros } = data;
            setLoadingFacturas(false);
            setDataFacturas(facturacion)
            setDataClientes(clientes)
            setDataLibros(libros)
            setIsDoneFacturas(true)
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoadingFacturas(false)
                localStorage.clear()
                window.location = "/"
            }).catch(() => {
                setLoadingFacturas(false)
            });

        })

        setTriggerCrud(!triggerCrud)
    };

    /**
     * A function that toggles the modalInsertar state.
     */
    const handleModalInsertarFacturas = () => {

        setModalInsertarFactura(!modalInsertarFactura)

    }

    const handleModalEditarFacturas = () => {

        setModalEditarFactura(!modalEditarFactura)

    }

    const handleDeleteFactura = async (idFactura) => {
        setLoadingFacturas(true);

        let res = undefined;

        configEndPoint.method = "DELETE"
        configEndPoint.url = configEndPoint.url ? `${configEndPoint.url}/${idFactura}` : `${urlEndPointFacturasDelete}/${idFactura}`

        await axios(configEndPoint).then((msg) => {
            setTriggerDeleteFactura(!triggerDeleteFactura)
            res = true;
            setLoadingFacturas(false)
        }).catch(() => {
            res = false
            setLoadingFacturas(false)
            setTriggerDeleteFactura(!triggerDeleteFactura)
        });

        return res;

    }

    const getEditFactura = async (idFactura) => {

        setIsDoneFacturas(false);
        setLoadingFacturas(true);

        configEndPoint.method = "GET";
        configEndPoint.url = `${URLAPI}cotizaciones/${idFactura}`;

        await axios(configEndPoint).then((response) => {
            const data = response.data.body || []
            setDataEditFactura(data)
            setLoadingFacturas(false)
            setIsDoneFacturas(true);
            handleModalEditarFacturas();
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoadingFacturas(false)
                window.location = "/"
            }).catch(() => {
                setLoadingFacturas(false)
            });
        })

    }

    return (
        <>
            {
                loadingFacturas && !isDoneFacturas ? (
                    <>
                        <PageLoading />
                    </>
                ) : (
                    <>
                        <Container className="mt-5">
                            <Row>
                                <Col xs={12} md={12}>

                                    <h1>Facturas</h1>

                                    <Row>

                                        <Col xs={12} md={12} className="mt-3">

                                            {/* CRUD Facturas */}

                                            <GeneralCRUD
                                                data={dataFacturas}
                                                tableHeaders={tableHeaders}
                                                pageOrigin='facturas'
                                                handleDelete={handleDeleteFactura}
                                                triggerCrud={triggerCrud}
                                                handleEdit={getEditFactura}
                                            />

                                        </Col>

                                    </Row>

                                </Col>
                            </Row>
                            <AddButton handleModal={handleModalInsertarFacturas} tooltipLabel='Agregar Factura' />
                            {/* MODAL EDIT INVOICE */}
                            <ModalGeneralEdit
                                handleModal={handleModalEditarFacturas}
                                modalIsOpen={modalEditarFactura}
                                modalTitle="Editar Factura"
                                pageOrigin="facturas"
                                sizeModal="xl"
                                dataEdit={dataEditFactura}
                                dataEditLibrosFactudas={dataLibros}
                                dataEditClientesFactudas={dataClientes}
                                isDone={isDoneFacturas}
                                setIsDone={setIsDoneFacturas}
                                setLoading={setLoadingFacturas}
                            />
                            {/* MODAL INSERT INVOICE */}
                            <ModalGeneralAdd
                                handleModal={handleModalInsertarFacturas}
                                modalIsOpen={modalInsertarFactura}
                                modalTitle="Agregar Nueva Factura"
                                pageOrigin="facturas"
                                sizeModal="xl"
                                dataLibros={dataLibros}
                                dataClientes={dataClientes}
                                isDone={isDoneFacturas}
                                setIsDone={setIsDoneFacturas}
                                setLoading={setLoadingFacturas}
                            />
                        </Container>
                    </>
                )
            }
        </>
    )

}

export default PageFacturas;