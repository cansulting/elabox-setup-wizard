import { connectivity, DID } from '@elastosfoundation/elastos-connectivity-sdk-js';
import { EssentialsConnector } from '@elabox/essentials-connector-client-browser';
import ElaboxEvent from "../utils/ElaboxEvent"
import * as constant from "../utils/constant"
// import { ACCOUNT_PKID, AC_AUTHENTICATE_DID, AC_DID_SETUP_CHECK } from "../utils/constant";

let instance = null;
export default class Did {

    _initConnector() {
        console.log("initConnector")
        const connector = new EssentialsConnector()
        connectivity.registerConnector(connector)
        this.connector = connector
    }

    static getInstance() {
        if (!instance) {
            instance = new Did()
            instance._initConnector()
        }
        return instance 
    }
    // use to check if able to signin using DID? return true or false
    async isDidAvailable() {
        const res = await ElaboxEvent.sendRPC(constant.ACCOUNT_PKID, constant.AC_DID_SETUP_CHECK)
        if (res.code === 200) {
            if (res.message === "setup")
                return true
        }
        console.log(res)
        return false
    }

    async request() {
        if (this.connector.hasWalletConnectSession())
            await this.connector.disconnectWalletConnect()
        const didAccess = new DID.DIDAccess()
        try {
            const presentation = await didAccess.requestCredentials(
                {claims: [DID.standardNameClaim("Activate elabox", false)]}
            );
            const walletConnector = await this.connector.getWalletConnectProvider().getWalletConnector({disableSessionCreation:true})
            return {presentation,walletConnector}
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async signin() {
        try {
            const presentation = await this.request()
            const res = await this._authenticate(presentation)
            if (res.code === 200) {
                // console.log("signin error", res)
                // throw res
                res.message = JSON.parse(res.message)
            }
            return res
        } catch (error) {
            console.log(error);
            return error
        }
        
    }

    async _authenticate(presentation) {
        const res = await ElaboxEvent.sendRPC(constant.ACCOUNT_PKID, constant.AC_AUTHENTICATE_DID, "", presentation)
        console.log(res)
        return res
    }

    disconnectConnector() {
        if (this.connector) {
            
            this.connector.disconnect()
            this.connector = null
        }
    }
}