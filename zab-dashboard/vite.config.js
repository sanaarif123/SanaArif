// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Ensure Vite resolves datatables.net-responsive properly
      'datatables.net-responsive-dt': 'datatables.net-responsive',
      'datatables.net-dt': 'datatables.net', // Core DataTables package
      'datatables.net-dt/css/dataTables.dataTables.css':'datatables.net-dt/css/dataTables.dataTables.css'
    },
  },
  optimizeDeps: {
    include: [
      'datatables.net-dt',       // Core DataTables
      'datatables.net-responsive', // DataTables responsive plugin
      'datatables.net-dt/css/dataTables.dataTables.css'
    ],
  },
  
});
