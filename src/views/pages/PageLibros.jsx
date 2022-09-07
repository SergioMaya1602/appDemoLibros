import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import GeneralCRUD from "../components/crud/GeneralCRUD";
import PageLoading from "./PageLoading"
import AddButton from '../components/crud/AddButton'
import ModalGeneralAdd from "../components/modals/ModalGeneralAdd";
import ModalGeneralEdit from "../components/modals/ModalGeneralEdit";
import ModalHistorialLibro from "../components/modals/libros/ModalHistorialLibro"

function PageLibros() {

    //we asignaed the constants, variables and states
    const [dataLibros, setDataLibros] = useState([]);
    const [dataEditLibro, setDataEditLibro] = useState({});
    const [dataHistorialLibro, setDataHistorialLibro] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [modalInsertarLibro, setModalInsertarLibro] = useState(false);
    const [modalEditarLibro, setModalEditarLibro] = useState(false);
    const [modalHistorialLibro, setModalHistorialLibro] = useState(false);
    const [triggerDeleteLibro, setTriggerDeleteLibro] = useState(false);
    const [triggerCrud, setTriggerCrud] = useState(false);
    const tableHeaders = ["Nº Libro", "Autor", "Títutlo", "Editorial(s)", "ISBN / ISSN", "Año"];

    //axios config
    const urlEndPointLibros = "https://appi-books.herokuapp.com/api/libros";
    const urlEndPointLibrosHistorial = "https://appi-books.herokuapp.com/api/historialLibros";
    const configEndPointDataLibros = {
        method: undefined,
        url: urlEndPointLibros,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        fetchDataLibros();
    }, [modalInsertarLibro, modalEditarLibro, triggerDeleteLibro])

    /**
     * A function that makes a request to the API to get the data of the books.
     */
    const fetchDataLibros = async () => {
        setLoading(true);
        configEndPointDataLibros.method = "GET"

        await axios(configEndPointDataLibros).then((response) => {
            const data = response.data.body || []
            setLoading(false);
            setDataLibros(data)
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

    /**
     * It's a function that gets the data of a book from the API and then opens a modal with the data
     * of the book
     */
    const getEditLibro = async (idLibro) => {

        setIsDone(false)
        setLoading(true)

        configEndPointDataLibros.method = "GET";
        configEndPointDataLibros.url = `${urlEndPointLibros}/${idLibro}`;

        await axios(configEndPointDataLibros).then((response) => {
            const data = response.data.body || []
            setDataEditLibro(data)
            setLoading(false)
            setIsDone(true);
            handleModalEditarLibro();
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoading(false)
                window.location = "/"
            }).catch(() => {
                setLoading(false)
            });
        })

    }

    const getHistorialLibro = async (idLibro) => {
        setIsDone(false)
        setLoading(true)

        configEndPointDataLibros.method = "GET";
        configEndPointDataLibros.url = `${urlEndPointLibrosHistorial}/${idLibro}`;

        await axios(configEndPointDataLibros).then((response) => {
            const data = response.data.body || []
            setDataHistorialLibro(data)
            setLoading(false)
            setIsDone(true);
            handleModalHisotrialLibro();
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
    const handleModalInsertarLibro = () => {

        setModalInsertarLibro(!modalInsertarLibro)

    }

    /**
     * A function that toggles the modalEditar state.
     */
    const handleModalEditarLibro = () => {

        setModalEditarLibro(!modalEditarLibro);

    }

    /**
     * A function that handles the modal of the history of the book.
     */
    const handleModalHisotrialLibro = () => {

        setModalHistorialLibro(!modalHistorialLibro);

    }

    /**
     * It deletes a book from the database.
     * @returns A function that will delete a book from the database.
     */
    const handleDeleteLibro = async (idLibro) => {
        setLoading(true);

        let res = undefined;

        configEndPointDataLibros.method = "DELETE"
        configEndPointDataLibros.url = configEndPointDataLibros.url ? `${configEndPointDataLibros.url}/${idLibro}` : `${urlEndPointLibros}/${idLibro}`

        await axios(configEndPointDataLibros).then(() => {
            setTriggerDeleteLibro(!triggerDeleteLibro)
            res = true;
            setLoading(false)
        }).catch(() => {
            res = false
            setLoading(false)
            setTriggerDeleteLibro(!triggerDeleteLibro)
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

                                    <h1>Libros</h1>

                                    <Row>

                                        <Col xs={12} md={12} className="mt-3">

                                            {/* CRUD LIBROS */}

                                            <GeneralCRUD
                                                data={dataLibros}
                                                tableHeaders={tableHeaders}
                                                pageOrigin='libros'
                                                handleDelete={handleDeleteLibro}
                                                handleEdit={getEditLibro}
                                                triggerCrud={triggerCrud}
                                                handleHistorial={getHistorialLibro}
                                            />

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            {/* MODAL INSERT BOOK */}
                            <AddButton handleModal={handleModalInsertarLibro} tooltipLabel='Agregar Libro' />
                            <ModalGeneralAdd
                                handleModal={handleModalInsertarLibro}
                                modalIsOpen={modalInsertarLibro}
                                modalTitle="Agregar Nuevo Libro"
                                pageOrigin="libros"
                                sizeModal="xl"
                                isDone={isDone}
                                setIsDone={setIsDone}
                                setLoading={setLoading}
                            />
                            {/* MODAL EDIT BOOK */}
                            <ModalGeneralEdit
                                handleModal={handleModalEditarLibro}
                                modalIsOpen={modalEditarLibro}
                                modalTitle={`Editar Libro`}
                                pageOrigin={"libros"}
                                sizeModal={"xl"}
                                dataEdit={dataEditLibro}
                                setLoading={setLoading}
                                isDone={isDone}
                                setIsDone={setIsDone} />
                            {/* MODAL HISTORIAL BOOK */}
                            <ModalHistorialLibro
                                data={dataHistorialLibro}
                                handleModal={handleModalHisotrialLibro}
                                modalIsOpen={modalHistorialLibro}
                                isDone={isDone}
                            />
                        </Container>
                    </>
                )
            }
        </>
    )

}

export default PageLibros;