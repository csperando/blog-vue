
// let base_path = "https://csperando-blog-rest-frdyhdcjh9ddfhb2.eastus-01.azurewebsites.net/";
let base_path = "http://localhost:3000/";

export const validateToken = async (token) => {
    try {
        const endpoint = base_path + "auth/token";
        const options = { method: "POST", headers: { "Content-Type": "application/json", "x-auth-token": token } };

        const res = await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            }).then((res) => {
                console.log(res);
                return res;
            }).catch((err) => {
                console.error(err);
            });

        return res;
    } catch(err) {
        console.log(err);
    }
}

export const login = async (username, password) => {
    try {
        const endpoint = base_path + "auth/login";
        const req = { username: username, password: password };
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(req) };

        const res = await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            }).then((res) => {
                return res;
            }).catch((err) => {
                console.error(err);
            });

        return res;
    } catch(err) {
        console.log(err);
    }
}
