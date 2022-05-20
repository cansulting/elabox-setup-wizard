import create from "zustand";


const useErrorStore = create(set => ({
    hasError:false,
    toggleError : ()=> set((state) => ({ hasError: true })),
}))

export default useErrorStore