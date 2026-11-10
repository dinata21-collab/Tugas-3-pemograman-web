Vue.component('status-badge', {
    template: '#tpl-badge',
    props: { item: { type: Object, required: true } },
    computed: {
        badgeText() { return this.item.qty === 0 ? 'Kosong' : this.item.qty < this.item.safety ? 'Menipis' : 'Aman'; },
        badgeClass() { return this.item.qty === 0 ? 'badge-danger' : this.item.qty < this.item.safety ? 'badge-warning' : 'badge-success'; }
    }
});
