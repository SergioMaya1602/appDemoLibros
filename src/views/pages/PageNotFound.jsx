import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import gif from "../assets/images/404-not-found.gif"

function PageNotFound() {

    return (
        <Container>
            <Row>
                <Col xs={12} md={12} className="mt-5">

                    <Row className="justify-content-center">

                        <Col xs={12} md={6}>

                            <Col xs={12} md={12} className="mt-5">
                                <img className="login-img" src={gif} alt="" />
                            </Col>

                        </Col>
                    </Row>

                </Col>
            </Row>
        </Container>
    );
}

export default PageNotFound;