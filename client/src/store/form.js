import { ServerAddress } from "./config"

export function StoreFormData(data) {
    console.log(data)
    return fetch(
        ServerAddress.concat("/api/user/form"),
        {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({type:data.type,data:data})
        }
    ).then((res) => res.json())
}

export default null