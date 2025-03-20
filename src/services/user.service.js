import { base_path } from "../config";

export const validateToken = async (token) => {
    try {
        const endpoint = base_path + "/auth/token";
        const options = { method: "POST", headers: { "Content-Type": "application/json", "x-auth-token": token } };

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
        console.error(err);
    }
}

export const fetchUserData = async (userid) => {
    try {
        const endpoint = base_path + "/user/" + userid;

        const res = await fetch(endpoint)
            .then((res) => {
                return res.json();
            }).then((res) => {
                return res;
            }).catch((err) => {
                console.error(err);
            });

        return res;

    } catch(err) {

    }
}

export const fetchUserPosts = async (userid) => {
    try {
        const endpoint = base_path + "/user/posts/" + userid;

        const res = await fetch(endpoint)
            .then((res) => {
                return res.json();
            }).then((res) => {
                return res;
            }).catch((err) => {
                console.error(err);
            });

        return res;

    } catch(err) {

    }
}

export const login = async (username, password) => {
    try {
        const endpoint = base_path + "/auth/login";
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
        console.error(err);
    }
}
