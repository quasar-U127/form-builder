import React from "react"
import FormBuilder from "./form-builder/form-builder"
import { GetTemplateIds, GetTemplate } from "./store/template"
import { StoreFormData } from "./store/form";
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function UserPage() {
    const emptyTemplate = {
        templateId: "",
        templateFields: {}
    }
    const [response, setResponse] = React.useState([]);
    const [templateIds, setTemplateIds] = React.useState([]);
    const [currentTemplateId, setCurrentTemplateId] = React.useState(null);
    const [currentTemplate, setCurrentTemplate] = React.useState(emptyTemplate);



    const [form_data, set_form_data] = React.useState({})

    React.useEffect(() => {
        GetTemplateIds()
            .then((data) => {
                setTemplateIds(data)
            });

    }, []);

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
        StoreFormData(form_data)
            .then((data) => {
                setResponse(data)
            });
        console.log(form_data)
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
            </Container>

        </>

    )
}

export default UserPage