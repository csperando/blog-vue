
import { base_path } from "../config";

const p = base_path + "/series/";

export const fetchAllSeries = async () => {
    try {
        const endpoint = p;
        
        return await fetch(endpoint)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(res.status != 200) {
                    throw new Error("Failed to get series data");
                }

                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}

export const fetchSeriesBySlug = async (slug) => {
    try {
        const endpoint = p + slug;
        
        return await fetch(endpoint)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if(res.status != 200) {
                    throw new Error("Failed to get series data");
                }

                return res.data;
            });

    } catch(err) {
        throw(err);
    }
}

