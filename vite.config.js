import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vitejs.dev/config/

// 插件配置
const compressionOptions = {
  algorithm: 'gzip',
  ext: '.gz',
  threshold: 10240, // 只有大于此大小的文件会被压缩（单位：字节）
  deleteOriginFile: false, // 是否删除原文件，默认为false
  verbose: false, // 是否显示详细日志
}

export default defineConfig({
  plugins: [
    react(),
    compression(compressionOptions),
  ],
  server: {
    host: '0.0.0.0',
    // https: true,
  },
})
