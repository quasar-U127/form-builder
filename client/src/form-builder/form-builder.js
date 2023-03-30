import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CheckboxBuilder({ field_name, template, change_handler }) {

    return (
        <Form.Check
            type="checkbox"
            name={field_name}
            label={template.label}
            onChange={change_handler}
        />
    )
}

function RadioBuilder({ field_name, template, change_handler }) {
    const radios = template.options.map(
        option =>

            <Form.Check
                type="radio"
                name={field_name}
                value={option.value}
                label={option.label}
                onChange={change_handler}
            />
    )
    return (
        <div>
            {radios}
        </div>
    )
}

function InputBuilder({ field_name, template, change_handler }) {
    return (
        <Form.Group className="mb-3" controlId={field_name}>
            <Form.Label>{template.label}</Form.Label>
            <Form.Control type="text" name={field_name} onChange={change_handler} placeholder={template.placeholder} />
        </Form.Group>
        // <div>
        //     <label for={field_name}>{template.label}</label>
        //     <input type="text" id={field_name} name={field_name} /><br />
        // </div>
    )
}

function ElementBuilder({ field_name, template, change_handler }) {

    switch (template.type) {
        case "input":
            return (
                <InputBuilder
                    field_name={field_name}
                    template={template} change_handler={change_handler} />
            )
        case "checkbox":
            return (
                <CheckboxBuilder
                    field_name={field_name}
                    template={template} change_handler={change_handler} />
            )
        case "singleSelect":
            return (
                <RadioBuilder
                    field_name={field_name}
                    template={template}
                    change_handler={change_handler} />
            )

        default:
            break;
    }

}

function FormBuilder({ template, change_handler, submit_handler }) {
    if (template === null || template === {})
        return <></>
    if (template.templateId === null || template.templateId === "")
        return <></>
    // console.log(template)
    const dict_items = Object.entries(template.templateFields).map(
        ([field_name, input_template]) =>
            <ElementBuilder
                field_name={field_name}
                template={input_template}
                change_handler={change_handler}
            />
    )
    return (
        <Card>
            <Card.Body>

                <Form border="primary">
                    {dict_items}
                    <Button variant="primary" onClick={submit_handler}>
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )

}

export default FormBuilder