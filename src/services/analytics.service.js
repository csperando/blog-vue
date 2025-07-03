
import { base_path } from "../config";

export const logViewer = async (data) => {
    try {
        const endpoint = base_path + "/analytics/logVisitor";
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };

        return await fetch(endpoint, options)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(res.status != 200) {
                    throw new Error("Failed to log analytics data");
                }

                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}
