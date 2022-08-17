import create from "zustand"

const useWalletStore = create(set =>({
    wallet:"",
    setWallet: (wallet) => {
        set(_ => ({ wallet }))
    },
}))

export default useWalletStore