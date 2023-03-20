import React from "react"
import FormBuilder from "./form-builder/form-builder"
import { GetTemplateIds, GetTemplate} from "./store/template"
import Dropdown from 'react-bootstrap/Dropdown';

function UserPage() {
    const [templateIds, setTemplateIds] = React.useState([]);
    const [currentTemplateId, setCurrentTemplateId] = React.useState("source1");
    const [currentTemplate, setCurrentTemplate] = React.useState({
        templateId:"",
        templateFields:{}
    });

    const [form_data, set_form_data] = React.useState({})

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

    function change_handler(e) {
        const key = e.target.name;
        const value = e.target.value;
        set_form_data({ ...form_data, [key]: value })
    }
    function submit_handler(e) {
        // const key = e.target.name;
        // const value = e.target.value;
        // set_form_data({ ...form_data, [key]: value })
        console.log(form_data)
    }


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
            <FormBuilder
                template={currentTemplate}
                change_handler={change_handler}
                submit_handler={submit_handler}
            />

        </>

    )
}

export default UserPage