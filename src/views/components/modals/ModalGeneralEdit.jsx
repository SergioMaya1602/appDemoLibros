import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";
import EditLibroContent from "../libros/EditLibroContent";
import EditPerfilContent from "../perfiles/EditPerfilContent";
import EditClienteContent from "../clientes/EditClienteContent";
import EditFacturaContent from "../facturas/EditFacturaContent";

function ModalGeneralEdit({ handleModal, modalIsOpen, modalTitle, pageOrigin, sizeModal, dataEdit, setLoading, isDone, setIsDone, dataEditClientesFactudas, dataEditLibrosFactudas }) {

    const [form, setForm] = useState({})
    const [formCliente, setFormCliente] = useState({})
    const [arrayLibros, setArrayLibros] = useState([]);

    const URLLIBROS = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/libros";
    const URLCLIENTES = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/cliente";
    const URLPERFILES = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/empleoyes";
    const URLFACTURAS = "https://api-books-salvador-git-main-librosdemoel.vercel.app/api/cotizaciones/";

    useEffect(() => {

        if (pageOrigin === 'facturas') {

            if (dataEdit.dataCliente)
                setForm(dataEdit.dataCliente[0])

            setArrayLibros(dataEdit.dataLibros)

        } else {

            setForm(dataEdit);

        }

    }, [modalIsOpen])

    let configAxios = {
        method: "PUT",
        url: undefined,
        headers: {
            'Authorization': 'Bearer ' + localStorage.is_security,
            "Content-Type": "application/json",
        },
        data: form
    };

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
                return (<EditLibroContent form={form} handleChangeForm={handleChangeForm} />)

            case "clientes":
                return (<EditClienteContent form={form} handleChangeForm={handleChangeForm} />)

            case "perfiles":
                return (<EditPerfilContent form={form} handleChangeForm={handleChangeForm} formCliente={formCliente} setFormCliente={setFormCliente} />)

            case "facturas":
                return (<EditFacturaContent form={form} handleChangeForm={handleChangeForm} dataLibros={dataEditLibrosFactudas}
                    dataClientes={dataEditClientesFactudas} arrayLibros={arrayLibros} setArrayLibros={setArrayLibros} />)

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
                configAxios.url = `${URLLIBROS}/${form.idLibro}`;
                await axios(configAxios).then((response) => {

                    const { data } = response;

                    if (data.body.status === "Actualizado") {

                        Swal.fire('¡LISTO!', 'Libro actualizado correctamente! 🎉', 'success').then(() => {
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
                break;

            case "clientes":
                configAxios.url = `${URLCLIENTES}/${form.idcliente}`;
                await axios(configAxios).then((response) => {

                    const { data } = response;

                    if (data.body.status === "Actualizado") {

                        Swal.fire('¡LISTO!', 'Cliente actualizado correctamente! 🎉', 'success').then(() => {
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
                break;

            case "perfiles":
                configAxios.url = `${URLPERFILES}/${form.id}`;
                await axios(configAxios).then((response) => {

                    const { data } = response;

                    if (data.body.status === "Actualizado") {

                        Swal.fire('¡LISTO!', 'Perfil actualizado correctamente! 🎉', 'success').then(() => {
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
                break;

            case "facturas":

                if (arrayLibros.length > 0) {

                    configAxios.url = `${URLFACTURAS}${form.id_cotizacion}`;

                    let auxArray = [];

                    for (let i = 0; i < arrayLibros.length; i++) {
                        auxArray.push({
                            "idLibro": arrayLibros[i].idLibro,
                            "cantidad": arrayLibros[i].cantidad,
                            "precio": arrayLibros[i].precio,
                            "titulo": arrayLibros[i].titulo,
                        })
                    }

                    let dataCliente = [{
                        "id_cotizacion": form.id_cotizacion,
                        "id_cliente": form.id_cliente,
                        "fecha_cotizacion": form.fecha_cotizacion,
                        "estatus": form.estatus,
                        "idFactura": form.idFactura,
                        "fecha_facturada": form.fecha_facturada,
                    }]

                    const data = {
                        "dataCliente": dataCliente,
                        "dataLibros": auxArray
                    }

                    configAxios.data = data;

                    await axios(configAxios).then((response) => {
                        const { data } = response
                        if (data.succes) {

                            Swal.fire('¡LISTO!', 'Factura editada correctamente! 🎉', 'success').then(() => {
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

export default ModalGeneralEdit;