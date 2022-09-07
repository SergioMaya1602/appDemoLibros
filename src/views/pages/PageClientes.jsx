import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import GeneralCRUD from "../components/crud/GeneralCRUD";
import PageLoading from "./PageLoading"
import AddButton from "../components/crud/AddButton";
import ModalGeneralAdd from "../components/modals/ModalGeneralAdd";
import ModalGeneralEdit from "../components/modals/ModalGeneralEdit";

function PageClientes() {

    //we asignaed the constants, variables and states
    const [dataClientes, setDataClientes] = useState([]);
    const [dataEditCliente, setDataEditCliente] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [modalInsertarCliente, setModalInsertarCliente] = useState(false);
    const [modalEditarCliente, setModalEditarCliente] = useState(false);
    const [triggerDeleteCliente, setTriggerDeleteCliente] = useState(false);
    const [triggerCrud, setTriggerCrud] = useState(false);
    const tableHeaders = ["Nombre", "Dirección", "Teléfono", "Correo"];

    //axios config
    const urlEndPointClientes = "https://appi-books.herokuapp.com/api/clientes";
    const urlEndPointCliente = "https://appi-books.herokuapp.com/api/cliente";
    const configGetDataClientes = {
        method: "GET",
        url: urlEndPointClientes,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
    };

    const configGetDataCliente = {
        method: undefined,
        url: urlEndPointCliente,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        fetchDataClientes();
    }, [modalInsertarCliente, modalEditarCliente, triggerDeleteCliente])

    /**
     * A function that makes a request to the API to get the data of the books.
     */
    const fetchDataClientes = async () => {
        setLoading(true);

        await axios(configGetDataClientes).then((response) => {
            const data = response.data.body || []
            setLoading(false);
            setDataClientes(data)
            setIsDone(true)
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoading(false)
                localStorage.clear()
                window.location = "/"
            }).catch(() => {
                setLoading(false)
            });

        })
        setTriggerCrud(!triggerCrud)
    };

    const getEditCliente = async (idCliente) => {

        setIsDone(false)
        setLoading(true)

        configGetDataCliente.method = "GET"
        configGetDataCliente.url = `${urlEndPointCliente}/${idCliente}`

        await axios(configGetDataCliente).then((response) => {
            const data = response.data.body || []
            setDataEditCliente(data)
            setLoading(false)
            setIsDone(true);
            handleModalEditarCliente();
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoading(false)
                window.location = "/"
            }).catch(() => {
                setLoading(false)
            });
        })

    }

    /**
     * A function that toggles the modalInsertar state.
     */
    const handleModalInsertarCliente = async () => {


        await setModalInsertarCliente(!modalInsertarCliente)

    }

    const handleModalEditarCliente = async () => {

        await setModalEditarCliente(!modalEditarCliente);

    }

    /**
     * It's a function that deletes a cliente from the database
     * @returns A function that will delete a cliente.
     */
    const handleDeleteCliente = async (idCliente) => {
        setLoading(true);

        let res = undefined;

        configGetDataCliente.method = "DELETE"
        configGetDataCliente.url = configGetDataCliente.url ? `${configGetDataCliente.url}/${idCliente}` : `${urlEndPointCliente}/${idCliente}`

        await axios(configGetDataCliente).then(() => {
            setTriggerDeleteCliente(!triggerDeleteCliente)
            res = true;
            setLoading(false)
        }).catch(() => {
            res = false
            setLoading(false)
            setTriggerDeleteCliente(!triggerDeleteCliente)
        });

        return res;

    }


    return (
        <>
            {
                loading && !isDone ? (
                    <>
                        <PageLoading />
                    </>
                ) : (
                    <>
                        <Container className="mt-5">
                            <Row>
                                <Col xs={12} md={12}>

                                    <h1>Clientes</h1>

                                    <Row>

                                        <Col xs={12} md={12} className="mt-3">

                                            {/* CRUD Clientes */}

                                            <GeneralCRUD
                                                data={dataClientes}
                                                tableHeaders={tableHeaders}
                                                pageOrigin='clientes'
                                                handleDelete={handleDeleteCliente}
                                                handleEdit={getEditCliente}
                                                triggerCrud={triggerCrud}
                                            />

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <AddButton handleModal={handleModalInsertarCliente} tooltipLabel='Agregar Cliente' />
                            {/* MODAL INSERT CLIENT */}
                            <ModalGeneralAdd
                                handleModal={handleModalInsertarCliente}
                                modalIsOpen={modalInsertarCliente}
                                modalTitle="Agregar Nuevo Cliente"
                                pageOrigin="clientes"
                                sizeModal="lg"
                                isDone={isDone}
                                setIsDone={setIsDone}
                                setLoading={setLoading}
                            />
                            {/* MODAL EDIT CLIENT*/}
                            <ModalGeneralEdit
                                handleModal={getEditCliente}
                                modalIsOpen={modalEditarCliente}
                                modalTitle={`Editar Cliente`}
                                pageOrigin={"clientes"}
                                sizeModal={"lg"}
                                dataEdit={dataEditCliente}
                                setLoading={setLoading}
                                isDone={isDone}
                                setIsDone={setIsDone} />
                        </Container>
                    </>
                )
            }
        </>
    )

}

export default PageClientes;