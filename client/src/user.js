import React from "react"
import FormBuilder from "./form-builder/form-builder"
import { GetTemplateIds, GetTemplate } from "./store/template"
import { StoreFormData } from "./store/form";
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';

import { verifyData } from "./utils";





function Response({ response, show, responseCloser }) {

    var variant = "success"
    if (!response.clientVerified) {
        variant = "warning"
    }
    if (response.errors > 0) {
        variant = "danger"
    }

    return (
        <Row>
            <Col md={6} className="mb-2">
                <Toast show={show} onClose={responseCloser} bg={variant}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Response</strong>
                    </Toast.Header>
                    <Toast.Body>{response.message}</Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}

function UserPage() {
    const emptyTemplate = {
        templateId: "",
        templateFields: {}
    }
    const [response, setResponse] = React.useState([]);
    const [templateIds, setTemplateIds] = React.useState([]);
    const [currentTemplateId, setCurrentTemplateId] = React.useState(null);
    const [currentTemplate, setCurrentTemplate] = React.useState(emptyTemplate);
    const [showResponse, setShowResponse] = React.useState(false);


    const [form_data, set_form_data] = React.useState({})
    const toggleShowResponse = () => setShowResponse(!showResponse);

    React.useEffect(() => {
        GetTemplateIds()
            .then((data) => {
                setTemplateIds(data)
            });
        setShowResponse(false)
    }, []);


    React.useEffect(() => {
        setShowResponse(true)
    }, [response])

    React.useEffect(() => {
        if (currentTemplateId === null) {
            setCurrentTemplate(emptyTemplate)
            set_form_data({})
        }
        else
            GetTemplate(currentTemplateId)
                .then((data) => {
                    setCurrentTemplate(data)
                    set_form_data({ ...form_data, ["type"]: currentTemplateId })
                });


    }, [currentTemplateId]);

    const id_list = templateIds.map(
        (entry) => <option onClick={() => setCurrentTemplateId(entry.templateId)}>{entry.templateId}</option>
    )

    function change_handler(e) {
        const key = e.target.name;
        const value = e.target.value;
        set_form_data({ ...form_data, [key]: value })
    }
    function submit_handler(e) {
        var verifierResponse = verifyData(currentTemplate.templateFields, form_data)
        console.log(verifierResponse)
        if (verifierResponse.clientVerified) {
            StoreFormData(form_data)
                .then((data) => {
                    setResponse({ ...data, clientVerified: true })
                });
        } else {
            setResponse(verifierResponse)
        }
        console.log(response)
    }


    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Source Creator</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/user">User</Nav.Link>
                            <Nav.Link href="/admin">Admin</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Saved form templates</Form.Label>
                            <Form.Select>
                                <option onClick={() => setCurrentTemplateId(null)}>Select</option>
                                {id_list}
                            </Form.Select>
                        </Form.Group>
                        <FormBuilder
                            template={currentTemplate}
                            change_handler={change_handler}
                            submit_handler={submit_handler}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Response
                            response={response}
                            show={showResponse}
                            responseCloser={toggleShowResponse} />
                    </Col>
                </Row>
            </Container>

        </>

    )
}

export default UserPage