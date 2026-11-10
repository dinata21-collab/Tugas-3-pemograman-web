Vue.component('order-form', {
    template: '#tpl-order',
    props: ['paket', 'ekspedisi'],
    data() { return { form: { nama: '', nim: '', paket: null, ekspedisi: '', alamat: '' } }; },
    filters: { currencyRp(value) { return `Rp ${Number(value || 0).toLocaleString('id-ID')}`; } },
    created() { this.form.ekspedisi = this.ekspedisi[0] || ''; },
    methods: {
        submitOrder() {
            if (!this.form.nama || !this.form.nim || !this.form.paket || !this.form.alamat) return;
            this.$emit('created', { ...this.form, paket: this.form.paket.kodePaket });
            this.form = { nama: '', nim: '', paket: null, ekspedisi: this.ekspedisi[0] || '', alamat: '' };
        }
    }
});
