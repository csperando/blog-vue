
import { defineStore } from "pinia";

import * as AnalyticsServices from "../services/analytics.service";

export const initAnalyticsStore = defineStore("analyticsStore", {
    // state
    state: () => {
        return {
            AnalyticsServices: AnalyticsServices,
        }
    },

    // getters
    getters: {
        // getViewerMetaData: (state) => (state.viewerMetaData),
    },

    // actions
    actions: {
        async logViewer() {
            try {
                // check if analytics token exists
                const token = localStorage.getItem("analytics_token");
                let usage = JSON.parse(localStorage.getItem("analytics_usage"));

                // create data if token is null or update existing
                if(!token || (usage.token != token)) {
                    const uuid = self.crypto.randomUUID();
                    localStorage.setItem("analytics_token", uuid);

                    const data = {
                        token: uuid,
                        visits: 0,
                        userAgent: navigator.userAgent,
                        window: { width: window.outerWidth, height: window.outerHeight },
                    };

                    localStorage.setItem("analytics_usage", JSON.stringify(data));

                } else {
                    usage.visits += 1

                    const data = {
                        token: usage.token,
                        visits: usage.visits,
                        userAgent: navigator.userAgent,
                        window: { width: window.outerWidth, height: window.outerHeight },
                    };

                    localStorage.setItem("analytics_usage", JSON.stringify(data));

                }

                // get updated usage
                usage = JSON.parse(localStorage.getItem("analytics_usage"));

                // TODO - send update to rest api logging visit
                await this.AnalyticsServices.logViewer(usage);

            } catch(err) {
                console.error(err);
                throw(err);
            }
        },
    }
});
