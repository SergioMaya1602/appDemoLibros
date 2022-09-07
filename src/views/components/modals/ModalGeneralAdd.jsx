import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import AddLibroContent from "../libros/AddLibroContent";
import AddClienteContent from "../clientes/AddClienteContent";
import AddPerfilContent from "../perfiles/AddPerfilContent";
import AddFacturaContent from "../facturas/AddFacturaContent";
import Swal from "sweetalert2";
import axios from "axios";

function ModalGeneralAdd(props) {

    const { handleModal, modalIsOpen, modalTitle, pageOrigin, sizeModal, dataLibros, dataClientes, setLoading, isDone, setIsDone } = props;

    const [form, setForm] = useState({})
    const [arrayLibros, setArrayLibros] = useState([]);

    const URLLIBROS = "https://appi-books.herokuapp.com/api/libros";
    const URLCLIENTES = "https://appi-books.herokuapp.com/api/cliente";
    const URLPERFILES = "https://appi-books.herokuapp.com/api/empleoyes";
    const URLFACTURAS = "https://appi-books.herokuapp.com/api/cotizaciones/";

    let configAxios = {
        method: "POST",
        url: undefined,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
        data: form
    };

    useEffect(() => {
        setArrayLibros([])
    }, [modalIsOpen]);

    /**
     * A function that handles the change of the form.
     */
    const handleChangeForm = async (e) => {

        e.persist();

        const { name, value } = e.target
        await setForm({
            ...form,
            [name]: value
        })

    }

    /**
     * A function that returns a component depending on the value of the variable pageOrigin.
     */
    const modalMenu = () => {

        switch (pageOrigin) {

            case "libros":
                return (<AddLibroContent form={form} handleChangeForm={handleChangeForm} />)

            case "clientes":
                return (<AddClienteContent form={form} handleChangeForm={handleChangeForm} />)

            case "perfiles":
                return (<AddPerfilContent form={form} handleChangeForm={handleChangeForm} />)

            case "facturas":
                return (<AddFacturaContent form={form} handleChangeForm={handleChangeForm} dataLibros={dataLibros} dataClientes={dataClientes}
                    arrayLibros={arrayLibros}
                    setArrayLibros={setArrayLibros}
                />)

            default:
                return null;

        }

    }

    /**
     * It's a function that sends a request to the server depending on the page where it was called
     */
    const handleSubmit = async (e) => {

        setLoading(true);
        setIsDone(false);

        e.preventDefault();
        e.stopPropagation();

        switch (pageOrigin) {

            case "libros":
                configAxios.url = URLLIBROS;

                let auxFormDataSent = form;
                if (form.tipo === "Libro") {
                    auxFormDataSent.issn = null;
                    auxFormDataSent.numRevista = null;
                } else {
                    auxFormDataSent.isbn = null;
                }

                configAxios.data = auxFormDataSent

                await axios(configAxios).then((response) => {

                    const { data } = response;

                    if (data.body.estatus === 'Enviado') {

                        Swal.fire('¡LISTO!', 'Libro agregado correctamente! 🎉', 'success').then(() => {
                            setLoading(false);
                            setIsDone(true);
                            handleModal()
                        }).catch(() => {
                            setLoading(false);
                            setIsDone(true);
                            handleModal()
                        })



                    }

                }).catch((error) => {
                    Swal.fire('Error!', ` ${error.response.data.body.error}`, 'error').then(() => {
                        //handleModal()
                        setLoading(false);
                        setIsDone(true);
                    }).catch(() => {
                        setLoading(false);
                        setIsDone(true);
                        handleModal()
                    })
                });
                break;

            case "clientes":
                configAxios.url = URLCLIENTES;
                await axios(configAxios).then((response) => {

                    const { data } = response;

                    if (data.body.status === 'Agregado correctamente') {

                        Swal.fire('¡LISTO!', 'Cliente agregado correctamente! 🎉', 'success').then(() => {
                            handleModal()
                            setLoading(false);
                            setIsDone(true);
                        }).catch(() => {
                            setLoading(false);
                            setIsDone(true);
                            handleModal()
                        })



                    }

                }).catch((error) => {
                    Swal.fire('Error!', ` ${error.response.data.body.error}`, 'error').then(() => {
                        handleModal()
                    }).catch(() => {
                        handleModal()
                    })
                });
                break;

            case "perfiles":
                configAxios.url = URLPERFILES;
                await axios(configAxios).then((response) => {

                    const { data } = response;

                    if (data.body.isCreate) {

                        Swal.fire('¡LISTO!', `Perfil agregado correctamente! 🎉 <br> la contraseña es ${data.body.paass}`, 'success').then(() => {
                            handleModal()
                            setLoading(false);
                            setIsDone(true);
                        }).catch((error) => {
                            handleModal()
                            setLoading(false);
                            setIsDone(true);
                        })



                    }

                }).catch((error) => {
                    Swal.fire('Error!', `${error.response.data.body.error}`, 'error').then(() => {
                        //handleModal()
                        setLoading(false);
                        setIsDone(true);
                    }).catch(() => {
                        //handleModal()
                        setLoading(false);
                        setIsDone(true);
                    })
                });
                break;

            case "facturas":

                if (arrayLibros.length > 0) {

                    configAxios.url = URLFACTURAS;

                    let auxArray = []

                    for (let i = 0; i < arrayLibros.length; i++) {

                        auxArray.push({
                            "idLibro": arrayLibros[i].idLibro,
                            "cantidad": arrayLibros[i].cantidad,
                            "precio": arrayLibros[i].precio
                        })

                    }

                    const data = {
                        "idCliente": form.cliente,
                        "datos": auxArray
                    }

                    configAxios.data = data;
                    await axios(configAxios).then((response) => {
                        const { data } = response
                        if (data.succes) {

                            Swal.fire('¡LISTO!', 'Factura agregada correctamente! 🎉', 'success').then(() => {
                                setLoading(false);
                                setIsDone(true);
                                handleModal()
                            }).catch(() => {
                                setLoading(false);
                                setIsDone(true);
                                handleModal()
                            })

                        }
                    }).catch((error) => {
                        Swal.fire('Error!', `${error.message} : ${error.response.statusText}`, 'error').then(() => {
                            setLoading(false);
                            setIsDone(true);
                            handleModal()
                        }).catch(() => {
                            setLoading(false);
                            setIsDone(true);
                            handleModal()
                        })
                    });
                } else {
                    setLoading(false);
                    setIsDone(true);
                    Swal.fire('Oooops!', 'No tiene ningun libro para facturar, favor de agregar por lo menos un libro.', 'error')
                }
                break;

            default:
                break;

        }

    }

    return (
        <Modal show={modalIsOpen && isDone} backdrop="static" keyboard={false} size={sizeModal} arial-labelledby="contained-modal-title-vcenter" onHide={handleModal} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header className="modal-libros-header-footer" closeButton>
                    <Modal.Title className="text-white">
                        {modalTitle}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        modalMenu()
                    }
                </Modal.Body>
                <Modal.Footer className="modal-libros-header-footer">
                    <Button variant="danger" onClick={handleModal}>Cancelar</Button>
                    <Button variant="primary" type="submit">Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )

}

export default ModalGeneralAdd;