Vue.component('app-modal', {
    template: '#tpl-modal',
    data() { return { isVisible: false, message: '', callback: null }; },
    methods: {
        show(message, callback) { this.message = message; this.callback = callback; this.isVisible = true; },
        onConfirm() { if (this.callback) this.callback(); this.close(); },
        close() { this.isVisible = false; this.callback = null; }
    }
});
