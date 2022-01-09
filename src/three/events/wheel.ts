import { states } from '../script'

export const wheelEvent = (event, stateMachine, dispatch) => {
    if(stateMachine.state === states.neutral) {
        if(stateMachine.page > 0 && event.deltaY < 0) {
            stateMachine.state = states.up;
            stateMachine.page --;
            dispatch('scrolling-up')
        } else if(stateMachine.page < 2 && event.deltaY > 0){
            stateMachine.state = states.down;
            stateMachine.page ++;
            dispatch('scrolling-down')
        }
    }
}