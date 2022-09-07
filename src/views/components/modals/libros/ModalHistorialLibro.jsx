import React, { Fragment, useEffect, useState } from "react";
import { Modal, Button, ListGroup, Container, Row, Col, Tab } from "react-bootstrap";
import GeneralCRUD from "../../crud/GeneralCRUD";

function ModalGeneralAdd(props) {

    const { data, handleModal, modalIsOpen, isDone } = props;

    const [dataHistorial, setDataHistorial] = useState([])

    const tableHeaders = ["Cantidad", "Dirección", "Correo", "Teléfono", "Fecha"];

    useEffect(() => {
        setDataHistorial(data)
    }, [modalIsOpen])

    return (
        <Modal show={modalIsOpen && isDone} backdrop="static" keyboard={false} size="xl" arial-labelledby="contained-modal-title-vcenter" onHide={handleModal} centered>
            <Modal.Header className="modal-libros-header-footer" closeButton>
                <Modal.Title className="text-white">
                    Historial del libro
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col xs={12} md={12}>
                            {
                                dataHistorial.length > 0 ?
                                    <>
                                        <Tab.Container>
                                            <Row>
                                                <Col xs={12} md={12}>
                                                    <ListGroup horizontal="sm">
                                                        {
                                                            dataHistorial && dataHistorial.map((client, index) => {

                                                                return (
                                                                    <Fragment key={index}>
                                                                        <ListGroup.Item action eventKey={`#eventKey-${index}`}>{`${index + 1}.-  ${client.nombre}`}</ListGroup.Item>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </ListGroup>
                                                </Col>
                                                <Col xs={12} md={12}>
                                                    <Tab.Content>
                                                        {
                                                            dataHistorial && dataHistorial.map((client, index) => {

                                                                return (
                                                                    <Fragment key={index}>
                                                                        <Tab.Pane eventKey={`#eventKey-${index}`}>
                                                                            <Container>
                                                                                <Row>
                                                                                    <Col xs={12} md={12}>
                                                                                        <GeneralCRUD
                                                                                            data={[client]}
                                                                                            tableHeaders={tableHeaders}
                                                                                            pageOrigin='libros/historial'
                                                                                            hasFilter={false}
                                                                                            hasActions={false}
                                                                                        />
                                                                                    </Col>
                                                                                </Row>
                                                                            </Container>
                                                                        </Tab.Pane>
                                                                    </Fragment>
                                                                )
                                                            })
                                                        }
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>
                                    </> :
                                    <>
                                        <h1 className="text-center">Este libro no tiene ningún historial que mostrar</h1>
                                    </>
                            }
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className="modal-libros-header-footer">
                <Button variant="success" onClick={handleModal}>ok</Button>
            </Modal.Footer>
        </Modal>
    )

}

export default ModalGeneralAdd;