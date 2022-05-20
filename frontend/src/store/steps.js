import create from 'zustand'

const useStepsStore = create(set => ({
    steps:1,
    increaseSteps: () => set(state => ({ steps: state.steps < 6 ? state.steps + 1 : state.steps }))
    ,
    decreaseSteps: () => set(state => ({ steps: state.steps > 0 ? state.steps - 1 : state.steps  }))
}))

export default useStepsStore