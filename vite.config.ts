import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';



export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env.VITE_TK); // 检查环境变量是否被正确加载

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      proxy: {
        '/api/replicate': {
          target: 'https://api.replicate.com/v1/predictions',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/replicate/, ''),
          headers: {
            'Authorization': `Bearer ${env.VITE_TK}`
          }
        }
      }
    }
  };
});
// export default defineConfig({
//   plugins: [react()],
//   optimizeDeps: {
//     exclude: ['lucide-react'],
//   },
//   server: {
//     proxy: {
//       '/api/replicate': {
//         target: 'https://api.replicate.com/v1/predictions',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api\/replicate/, ''),
//         headers: {
//           'Authorization': `Bearer ${process.env.VITE_TK}`
//         }
//       }
//     }
//   }
// });
