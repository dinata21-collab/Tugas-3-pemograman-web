const ApiService = {
    async fetchAllData() {
        try {
            const response = await fetch('data/dataBahanAjar.json');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error('Gagal memuat data JSON:', error);
            return { stok: [], tracking: [], upbjjList: [], kategoriList: [], paket: [], pengirimanList: [] };
        }
    }
};
