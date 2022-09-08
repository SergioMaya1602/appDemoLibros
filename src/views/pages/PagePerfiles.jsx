import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import GeneralCRUD from "../components/crud/GeneralCRUD";
import PageLoading from "./PageLoading"
import AddButton from "../components/crud/AddButton";
import ModalGeneralAdd from "../components/modals/ModalGeneralAdd";
import ModalGeneralEdit from "../components/modals/ModalGeneralEdit";

function PagePerfiles() {

    //we asignaed the constants, variables and states
    const [dataPerfiles, setDataPerfiles] = useState([]);
    const [dataEditPerfiles, setDataEditPerfiles] = useState({});
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [modalInsertarPerfil, setModalInsertarPerfil] = useState(false);
    const [modalEditarPerfil, setModalEditarPerfil] = useState(false);
    const [triggerDeletePerfil, setTriggerDeletePerfil] = useState(false);
    const [triggerCrud, setTriggerCrud] = useState(false);
    const tableHeaders = ["Nombre", "Correo", "Rol"];

    //axios config
    const urlEndPointPerfiles = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/empleoyes";
    const configGetDataPerfiles = {
        method: undefined,
        url: urlEndPointPerfiles,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
    };

    useEffect(() => {
        fetchDataPerfiles();
    }, [modalInsertarPerfil, modalEditarPerfil, triggerDeletePerfil])

    /**
     * A function that makes a request to the API to get the data of the books.
     */
    const fetchDataPerfiles = async () => {
        setLoading(true);
        configGetDataPerfiles.method = "GET"

        await axios(configGetDataPerfiles).then((response) => {
            const data = response.data.body || []
            setLoading(false);
            setDataPerfiles(data)
            setIsDone(true)
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoading(false)
                window.location = "/"
            }).catch(() => {
                setLoading(false)
            });

        })
        setTriggerCrud(!triggerCrud)
    };

    /**
     * A function that is used to edit the profile.
     */
    const getEditPerfil = async (idPerfil) => {

        setIsDone(false)
        setLoading(true)

        configGetDataPerfiles.method = "GET";
        configGetDataPerfiles.url = `${urlEndPointPerfiles}/${idPerfil}`;

        await axios(configGetDataPerfiles).then((response) => {
            const data = response.data.body || []
            setDataEditPerfiles(data)
            setLoading(false)
            setIsDone(true);
            handleModalEditarPerfil();
        }).catch((msg) => {
            Swal.fire('Error!', `${msg}`, 'error').then(() => {
                setLoading(false)
                localStorage.clear()
                window.location = "/"
            }).catch(() => {
                setLoading(false)
            });
        })

    }

    /**
     * A function that toggles the modalInsertar state.
     */
    const handleModalInsertarPerfil = () => {

        setModalInsertarPerfil(!modalInsertarPerfil)

    }

    /**
     * A function that toggles the modalEditarPerfil state.
     */
    const handleModalEditarPerfil = () => {

        setModalEditarPerfil(!modalEditarPerfil)

    }

    /**
     * It deletes a profile from the database.
     * @returns A boolean value.
     */
    const handleDeletePerfil = async (idPerfil) => {
        setLoading(true);

        let res = undefined;

        configGetDataPerfiles.method = "DELETE"
        configGetDataPerfiles.url = urlEndPointPerfiles.url ? `${urlEndPointPerfiles.url}/${idPerfil}` : `${urlEndPointPerfiles}/${idPerfil}`

        await axios(configGetDataPerfiles).then(() => {
            setTriggerDeletePerfil(!triggerDeletePerfil)
            res = true;
            setLoading(false)
        }).catch(() => {
            res = false
            setLoading(false)
            setTriggerDeletePerfil(!triggerDeletePerfil)
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

                                    <h1>Perfiles</h1>

                                    <Row>

                                        <Col xs={12} md={12} className="mt-3">

                                            {/* CRUD Perfiles */}
                                            <GeneralCRUD
                                                data={dataPerfiles}
                                                tableHeaders={tableHeaders}
                                                pageOrigin='perfiles'
                                                handleDelete={handleDeletePerfil}
                                                handleEdit={getEditPerfil}
                                                triggerCrud={triggerCrud}
                                            />

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <AddButton handleModal={handleModalInsertarPerfil} tooltipLabel='Agregar Perfil' />
                            {/* MODAL INSERT PERFIL */}
                            <ModalGeneralAdd
                                handleModal={handleModalInsertarPerfil}
                                modalIsOpen={modalInsertarPerfil}
                                modalTitle="Agregar Nuevo Perfil"
                                pageOrigin="perfiles"
                                sizeModal="lg"
                                setLoading={setLoading}
                                isDone={isDone}
                                setIsDone={setIsDone}
                            />
                            {/* MODAL EDIT PERFIL */}
                            <ModalGeneralEdit
                                handleModal={getEditPerfil}
                                modalIsOpen={modalEditarPerfil}
                                modalTitle={`Editar Perfil`}
                                pageOrigin={"perfiles"}
                                sizeModal={"lg"}
                                dataEdit={dataEditPerfiles}
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

export default PagePerfiles;