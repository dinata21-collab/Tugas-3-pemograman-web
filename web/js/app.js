new Vue({
    el: '#app',
    data: { tab: 'stok', state: { stok: [], tracking: [], upbjjList: [], kategoriList: [], paket: [], pengirimanList: [] } },
    created() { this.loadData(); },
    methods: {
        async loadData() {
            const data = await ApiService.fetchAllData();
            Object.keys(this.state).forEach(key => { this.state[key] = data[key] || []; });
            try {
                const savedStock = localStorage.getItem('sitta.stok');
                if (savedStock) this.state.stok = JSON.parse(savedStock);
            } catch (error) {
                console.error('Gagal memuat stok tersimpan:', error);
            }
        },
        handleNewDO(payload) { console.log('DO baru ditambahkan:', payload.noDo); },
        handleNewOrder(payload) { console.log('Order baru:', payload); }
    }
});
