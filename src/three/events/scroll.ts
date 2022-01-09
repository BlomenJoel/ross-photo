import type { Dispatch, StateMachine } from "$lib/types";
import { states } from "../script";

let lastScrollTop = 0;

export const onDocumentScroll = (stateMachine: StateMachine, dispatch: Dispatch): void => {
    const st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    if(stateMachine.state === states.neutral) {
        if(stateMachine.page < 2 && st >= lastScrollTop) {
            stateMachine.state = states.down
            stateMachine.page ++;
            dispatch('scrolling-down')
        } 
        else if(stateMachine.page > 0 && st < lastScrollTop) {
            stateMachine.state = states.up
            stateMachine.page --;
            dispatch('scrolling-up')
        }
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling   
    }
}
