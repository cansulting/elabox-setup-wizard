import create from 'zustand'

const useStepsStore = create(set => ({
    steps:1,
    increaseSteps: (incrementBy = 1) => {
        if(typeof incrementBy !== 'number'){
            incrementBy = 1
        }
        set(state => ({ steps: state.steps < 6 ? state.steps + incrementBy : state.steps }))
    }
    ,
    decreaseSteps: (decrementBy = 1) => {
        if(typeof decrementBy !== 'number'){
            decrementBy = 1
        }
        set(state => ({ steps: state.steps > 0 ? state.steps - decrementBy : state.steps  }))        
    }
}))

export default useStepsStore