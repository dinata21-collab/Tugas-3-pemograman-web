const emptyStock = () => ({ kode: '', judul: '', upbjj: '', lokasi: '', harga: 0, qty: 0, safety: 0, kategori: '', catatanHTML: '' });
Vue.component('ba-stock-table', {
    template: '#tpl-stock',
    props: ['items', 'upbjjList', 'kategoriList'],
    data() { return { selectedUpbjj: '', selectedKategori: '', filterReorder: false, sortBy: 'judul', isEditMode: false, form: emptyStock(), formMessage: '', formMessageType: '' }; },
    filters: {
        currencyRp(value) { return `Rp ${Number(value || 0).toLocaleString('id-ID')}`; },
        satuanBuah(value) { return `${Number(value || 0)} buah`; }
    },
    computed: {
        filteredKategoriList() {
            if (!this.selectedUpbjj) return this.kategoriList;
            return [...new Set(this.items.filter(item => item.upbjj === this.selectedUpbjj).map(item => item.kategori))];
        },
        processedStok() {
            let result = this.items.filter(item => (!this.selectedUpbjj || item.upbjj === this.selectedUpbjj) && (!this.selectedKategori || item.kategori === this.selectedKategori) && (!this.filterReorder || item.qty < item.safety || item.qty === 0));
            return result.sort((a, b) => this.sortBy === 'judul' ? a.judul.localeCompare(b.judul) : this.sortBy === 'qty' ? a.qty - b.qty : a.harga - b.harga);
        }
    },
    watch: {
        selectedUpbjj() { this.selectedKategori = ''; },
        filterReorder(value) { console.log('Filter reorder diubah menjadi:', value); }
    },
    methods: {
        onUpbjjChange() { this.selectedKategori = ''; },
        resetFilter() { this.selectedUpbjj = ''; this.selectedKategori = ''; this.filterReorder = false; this.sortBy = 'judul'; },
        saveStok() {
            this.formMessage = '';
            if (!this.form.kode || !this.form.judul) {
                this.formMessage = 'Kode MK dan judul mata kuliah wajib diisi.';
                this.formMessageType = 'error';
                return;
            }
            const item = { ...this.form, harga: Number(this.form.harga) || 0, qty: Number(this.form.qty) || 0, safety: Number(this.form.safety) || 0 };
            const index = this.items.findIndex(existing => existing.kode === item.kode);
            if (this.isEditMode && index !== -1) this.$set(this.items, index, item);
            else if (!this.isEditMode && index === -1) this.items.push(item);
            else {
                this.formMessage = `Kode ${item.kode} sudah digunakan. Gunakan kode lain.`;
                this.formMessageType = 'error';
                return;
            }
            localStorage.setItem('sitta.stok', JSON.stringify(this.items));
            this.formMessage = this.isEditMode ? 'Data stok berhasil diperbarui.' : 'Data stok berhasil ditambahkan.';
            this.formMessageType = 'success';
            this.resetForm();
        },
        editItem(item) { this.isEditMode = true; this.form = { ...item }; },
        confirmDelete(item) { this.$root.$refs.modal.show(`Yakin ingin menghapus ${item.judul}?`, () => { const index = this.items.findIndex(existing => existing.kode === item.kode); if (index !== -1) this.items.splice(index, 1); localStorage.setItem('sitta.stok', JSON.stringify(this.items)); }); },
        resetForm() { this.isEditMode = false; this.form = emptyStock(); }
    }
});
