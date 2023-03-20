import React from "react";

import { GetTemplateIds, GetTemplate, CreateTemplate } from "./store/template"
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function TemplateEditor({ text }) {
    // Verify if the new json template is valid or not
    const [formData, setFormData] = React.useState({
        editor: '',
    })
    const [res, setRes] = React.useState("")
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setFormData({ ...formData, [key]: value })
    }
    function handleSubmit(e) {
        CreateTemplate(formData.editor)
            .then((data) => {
                setRes(data)
            });
    }
    
    return (
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Template</Form.Label>
                <Form.Control as="textarea" rows={20} defaultValue={text && JSON.stringify(text, null, 3)} className="font-monospace" name="editor" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
                Submit
            </Button>
            <pre>{JSON.stringify(res, null, 2)}</pre>
        </Form>
    )
}

function AdministrationPage() {
    const [templateIds, setTemplateIds] = React.useState([]);
    const [currentTemplateId, setCurrentTemplateId] = React.useState("");
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

    const id_list = templateIds.map(
        (entry) => <Dropdown.Item onClick={() => setCurrentTemplateId(entry.templateId)}>{entry.templateId}</Dropdown.Item>
    )

    

    return (
        <>

            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {currentTemplateId}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {id_list}
                </Dropdown.Menu>
            </Dropdown>
            <TemplateEditor
                text={currentTemplate} />

        </>

    )
}

export default AdministrationPage;