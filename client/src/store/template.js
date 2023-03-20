import { ServerAddress } from "./config"


export function GetTemplateIds() {
    return fetch(ServerAddress.concat("/api/templateId"))
        .then((res) => res.json())
}
export function GetTemplate(id) {
    if (id == "")
        return Promise.resolve({})
    return fetch(ServerAddress.concat("/api/template/", id))
        .then((res) => res.json()
            .then(
                (template) => { return { templateId: template.templateId, templateFields: JSON.parse(template.templateFields) } }
            ))
}

export function CreateTemplate(template) {
    console.log(template)
    return fetch(
        ServerAddress.concat("/api/admin/create"),
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: template
        }
    ).then((res) => res.json())
}

export default null