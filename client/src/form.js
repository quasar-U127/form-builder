import FormBuilder from 'reactjs-form-builder'

// function CheckboxBuilder({ field_name, template }) {
//     return (
//         <div>
//             <label for={field_name}>{template.label}</label>
//             <input type="text" id={field_name} name={field_name} /><br />
//         </div>
//     )
// }

// function RadioBuilder({ field_name, template }) {
//     // return (
//     //     <pre>{JSON.stringify(template, null, 2)}</pre>
//     // )

//     const radios = template.options.map(
//         option =>
//             <li>
//                 <input type="radio" id={option.value} name={field_name} value={option.value} />
//                 {/* <pre>{JSON.stringify(option, null, 2)}</pre> */}
//                 <label for={option.value}>{option.label}</label><br />
//             </li>
//     )

//     return (
//         <div>
//             <ul>
//                 {radios}
//             </ul>
//         </div>
//     )
// }

// function InputBuilder({ field_name, template }) {
//     return (
//         <div>
//             <label for={field_name}>{template.label}</label>
//             <input type="text" id={field_name} name={field_name} /><br />
//         </div>
//     )
// }

// function ElementBuilder({ field_name, template }) {

//     switch (template.type) {
//         case "input":
//             return (
//                 <InputBuilder
//                     field_name={field_name}
//                     template={template} />
//             )
//         case "checkbox":
//             return (
//                 <CheckboxBuilder
//                     field_name={field_name}
//                     template={template} />
//             )
//         case "singleSelect":
//             return (
//                 <RadioBuilder
//                     field_name={field_name}
//                     template={template} />
//             )

//         default:
//             break;
//     }

// }

// function FormBuilder({ template }) {
//     // return (
//     //     <pre>{JSON.stringify(template, null, 2)}</pre>
//     // )
//     const dict_items = Object.entries(template.fields).map(
//         ([field_name, input_template]) => <li><ElementBuilder field_name={field_name} template={input_template} /></li>
//     )
//     return <ul>{dict_items}</ul>;
// }

function Form({ template }) {
    // return (
    //     <FormBuilder
    //         template={template} />
    // );
}

export default Form;
