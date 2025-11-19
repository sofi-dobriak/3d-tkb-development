const { BehaviorSubject } = require("rxjs");

function modalManagerInit() {
    const currentModal = new BehaviorSubject(false);
    const modals = [];

    console.log('init modalManager');

    return {
        push: (modal) => {
            modals.push(modal)
        },
        getModals: () => modals,
        closeAll: () => {
            modals.forEach(el => {
                if (el.close) {
                    el.close()
                }
            })
        },
        open: (id) => {
            modals.forEach(modal => {
                if (modal.id === id || !modal.close) return;
                modal.close();
            })
        }

    }
}

const modalManager = modalManagerInit();

export default modalManager;