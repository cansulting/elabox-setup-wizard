import {
  connectivity,
  DID,
} from '@elastosfoundation/elastos-connectivity-sdk-js'
import { EssentialsConnector } from '@elabox/essentials-connector-client-browser'
//import * as W from '@elastosfoundation/elastos-connectivity-sdk-js/typings/did/mpde;';

// class Auth that implements the AuthService using DID.
export class DIDAuth {
  constructor() {
    this._initConnector()
  }

  _initConnector() {
    this.essentialsConnector = new EssentialsConnector()
    connectivity.registerConnector(this.essentialsConnector)
  }

  // sign in with a DID.
  async signIn() {
    if (this.essentialsConnector.hasWalletConnectSession())
      await this.essentialsConnector.disconnectWalletConnect()
    const didAccess = new DID.DIDAccess()
    const presentation = await didAccess.requestCredentials({
      claims: [
        DID.standardNameClaim('Your name', false),
        DID.standardEmailClaim('Your email address', false),
      ],
    })

    console.log(presentation)
    console.log(presentation.holder.toJSON())
    //const did = presentation.toJSON();
    return presentation
  }

  async signout() {
    if (this.essentialsConnector) {
      this.essentialsConnector.disconnectWalletConnect()
    }
  }
  async isConnected(){
    if(this.essentialsConnector){
      return true;
    }
    return false;
  }
  async importCredential(credential) {
    let didAccess = new DID.DIDAccess()
    let importedCredentials = await didAccess.importCredentials([credential])

    if (importedCredentials.length === 1) {
      //   this._snackBar.open("Credential successfully imported to your wallet!", "Cool", {
      //     duration: 3000
      //   });
    }
  }
}