import create from "zustand"

const useStorageStore = create(set => ({
    storage: "",
    selectStorage: (id) => {
        set(state => ({storage:id}))
    }
}))

export default useStorageStore