import React from "react";

import { GetTemplateIds, GetTemplate, CreateTemplate } from "./store/template"
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




function TemplateEditor({ text ,templateIds}) {
    // Verify if the new json template is valid or not
    
    const [editorText,setEditorText] = React.useState("")
    const [res, setRes] = React.useState(null)
    function handleEditorChange(e) {
        setEditorText(e.target.value)
    }
    function handleSubmit() {
        CreateTemplate(editorText)
            .then((data) => {
                setRes(data)
            });
    }

    return (
        <Form>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Template</Form.Label>
                <Form.Control as="textarea" rows={20} defaultValue={text && JSON.stringify(text, null, 3)} className="font-monospace" name="editor" onChange={handleEditorChange} />
            </Form.Group>
            <center>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </center>
            <pre>{res?JSON.stringify(res, null, 2):null}</pre>
        </Form>
    )
}

function AdministrationPage() {
    const [templateIds, setTemplateIds] = React.useState([]);
    const [currentTemplateId, setCurrentTemplateId] = React.useState(null);
    const [currentTemplate, setCurrentTemplate] = React.useState("");

    React.useEffect(() => {
        GetTemplateIds()
            .then((data) => {
                setTemplateIds(data)
            });

    }, []);

    React.useEffect(() => {

        GetTemplate(currentTemplateId)
            .then((data) => {
                setCurrentTemplate(data)
            });

    }, [currentTemplateId]);

    // const id_list = templateIds.map(
    //     (entry) => <Dropdown.Item onClick={() => setCurrentTemplateId(entry.templateId)}>{entry.templateId}</Dropdown.Item>
    // )
    const id_option_list = templateIds.map(
        (entry) => <option onClick={() => setCurrentTemplateId(entry.templateId)}>{entry.templateId}</option>
    )



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
                                {id_option_list}
                            </Form.Select>
                        </Form.Group>
                        <TemplateEditor
                            text={currentTemplate}
                            templateIds={templateIds} />
                    </Col>
                </Row>
            </Container>

        </>

    )
}

export default AdministrationPage;