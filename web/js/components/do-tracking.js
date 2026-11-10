Vue.component('do-tracking', {
    template: '#tpl-tracking',
    props: ['data', 'paket', 'pengirimanList'],
    data() { return { searchQuery: '', activeSearch: '', selectedPaket: null, newDO: { noDo: '', nim: '', nama: '', ekspedisi: '', tanggalKirim: '', totalHarga: 0, progress: [] } }; },
    created() { this.newDO.ekspedisi = this.pengirimanList[0] || ''; this.generateDoNumber(); },
    filters: {
        currencyRp(value) { return `Rp ${Number(value || 0).toLocaleString('id-ID')}`; },
        formatDate(value) { if (!value) return ''; return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value)); }
    },
    computed: { filteredTracking() { if (!this.activeSearch) return this.data; const query = this.activeSearch.toLowerCase(); return this.data.filter(item => (item.noDo || '').toLowerCase().includes(query) || (item.nim || item.NIM || '').toLowerCase().includes(query)); } },
    methods: {
        generateDoNumber() { const year = new Date().getFullYear(); const max = this.data.reduce((highest, item) => Math.max(highest, Number((item.noDo || '').split('-')[1]) || 0), 0); this.newDO.noDo = `DO${year}-${String(max + 1).padStart(3, '0')}`; },
        searchDO() { this.activeSearch = this.searchQuery; },
        clearSearch() { this.searchQuery = ''; this.activeSearch = ''; },
        onPaketChange() { this.newDO.totalHarga = this.selectedPaket ? this.selectedPaket.harga : 0; },
        submitDO() {
            if (!this.newDO.nim || !this.newDO.nama || !this.selectedPaket) return;
            const now = new Date(); const payload = { ...this.newDO, tanggalKirim: now.toISOString(), progress: [{ waktu: now.toLocaleString('id-ID'), keterangan: 'Delivery Order dibuat & diproses' }] };
            this.data.push(payload); this.$emit('add-do', payload); this.selectedPaket = null; this.newDO.nim = ''; this.newDO.nama = ''; this.newDO.totalHarga = 0; this.generateDoNumber();
        },
        addProgress(item) { if (!item.newProgressText) return; item.progress = item.progress || []; item.progress.push({ waktu: new Date().toLocaleString('id-ID'), keterangan: item.newProgressText }); this.$set(item, 'newProgressText', ''); }
    }
});
