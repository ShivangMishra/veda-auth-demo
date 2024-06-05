export default class Configuration {
    static get CONFIG () {
        return {
            clientId: 'veda-wrsyeldkyybejkrwsgth-10000000',
            custosApiUrl: 'http://localhost:8081/api/v1',
            superClientId: 'veda-wrsyeldkyybejkrwsgth-10000000',
            underMaintenance: false,
        }
    }

    static value (name) {

        if (!(name in this.CONFIG)) {
            console.log(`Configuration: There is no key named "${name}"`)
            return null
        }

        const value = this.CONFIG[name]


        if (!value) {
            console.log(`Configuration: Value for "${name}" is not defined`)
            return null
        }

        return value;

        // if (value.startsWith('$VUE_APP_')) {
        //     // value was not replaced, it seems we are in development.
        //     // Remove $ and get current value from process.env
        //     const envName = value.substring(1)
        //
        //
        //
        //     const envValue = process.env[envName]
        //     if (envValue) {
        //         return envValue
        //     } else if (window.serverConfig && window.serverConfig[envName]) {
        //         // Check if the variables is set by the portal server
        //         return window.serverConfig[envName];
        //     } else {
        //         console.log(`Configuration: Environment variable "${envName}" is not defined`)
        //     }
        // } else {
        //     // value was already replaced, it seems we are in production.
        //     return value
        // }
    }
}