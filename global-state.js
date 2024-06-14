'use strict';

let globalState = {};

const broadcastChannel = new BroadcastChannel('global-state');
const originName = Math.random();   // TODO: random string name

broadcastChannel.onmessage = (event) => {
    if (event.type === 'get-state') {
        broadcastChannel.postMessage({
            type: 'set-state',
            data: globalState,
            origin: originName,
        });
    } else if (event.type === 'set-state' && event.origin !== originName) {
        globalState = event.data;
    } else {
        console.warn('Unrecognized broadcast channel event', JSON.stringify(event));
    }
};

window.addEventListener('load', () => {
    broadcastChannel.postMessage({type: 'get-state',});
});
