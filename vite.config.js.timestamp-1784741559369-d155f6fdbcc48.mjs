// vite.config.js
import { defineConfig } from "file:///C:/Users/Razac/Documents/Spring_Boot_Projects/YoutubeCommentPicker/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Razac/Documents/Spring_Boot_Projects/YoutubeCommentPicker/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/Razac/Documents/Spring_Boot_Projects/YoutubeCommentPicker/node_modules/vite-plugin-pwa/dist/index.js";
import viteCompression from "file:///C:/Users/Razac/Documents/Spring_Boot_Projects/YoutubeCommentPicker/node_modules/vite-plugin-compression/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br"
    }),
    viteCompression({
      algorithm: "gzip",
      ext: ".gz"
    }),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "inline",
      includeAssets: ["favicon.png", "robots.txt", "sitemap.xml", "images/app_logo_192.png"],
      manifest: {
        name: "Youtube Comment Picker",
        short_name: "Comment Picker",
        description: "Pick random winners for your YouTube and Instagram giveaways",
        theme_color: "#0f0f0f",
        background_color: "#0f0f0f",
        display: "standalone",
        icons: [
          {
            src: "images/app_logo_192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "images/app_logo_512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router-dom") || id.includes("framer-motion") || id.includes("scheduler")) {
              return "vendor-react";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
            return "vendor";
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSYXphY1xcXFxEb2N1bWVudHNcXFxcU3ByaW5nX0Jvb3RfUHJvamVjdHNcXFxcWW91dHViZUNvbW1lbnRQaWNrZXJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFJhemFjXFxcXERvY3VtZW50c1xcXFxTcHJpbmdfQm9vdF9Qcm9qZWN0c1xcXFxZb3V0dWJlQ29tbWVudFBpY2tlclxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvUmF6YWMvRG9jdW1lbnRzL1NwcmluZ19Cb290X1Byb2plY3RzL1lvdXR1YmVDb21tZW50UGlja2VyL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgIGV4dDogJy5icicsXG4gICAgfSksXG4gICAgdml0ZUNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2d6aXAnLFxuICAgICAgZXh0OiAnLmd6JyxcbiAgICB9KSxcbiAgICBWaXRlUFdBKHtcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxuICAgICAgaW5qZWN0UmVnaXN0ZXI6ICdpbmxpbmUnLFxuICAgICAgaW5jbHVkZUFzc2V0czogWydmYXZpY29uLnBuZycsICdyb2JvdHMudHh0JywgJ3NpdGVtYXAueG1sJywgJ2ltYWdlcy9hcHBfbG9nb18xOTIucG5nJ10sXG4gICAgICBtYW5pZmVzdDoge1xuICAgICAgICBuYW1lOiAnWW91dHViZSBDb21tZW50IFBpY2tlcicsXG4gICAgICAgIHNob3J0X25hbWU6ICdDb21tZW50IFBpY2tlcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnUGljayByYW5kb20gd2lubmVycyBmb3IgeW91ciBZb3VUdWJlIGFuZCBJbnN0YWdyYW0gZ2l2ZWF3YXlzJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMGYwZjBmJyxcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyMwZjBmMGYnLFxuICAgICAgICBkaXNwbGF5OiAnc3RhbmRhbG9uZScsXG4gICAgICAgIGljb25zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgc3JjOiAnaW1hZ2VzL2FwcF9sb2dvXzE5Mi5wbmcnLFxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzcmM6ICdpbWFnZXMvYXBwX2xvZ29fNTEyLnBuZycsXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3MoaWQpIHtcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XG4gICAgICAgICAgICAvLyBHcm91cCBSZWFjdCBhbmQgYWxsIFJlYWN0LWRlcGVuZGVudCBsaWJyYXJpZXMgdG9nZXRoZXJcbiAgICAgICAgICAgIC8vIHRvIHByZXZlbnQgY3JlYXRlQ29udGV4dCBsb2FkIG9yZGVyIHJhY2UgY29uZGl0aW9uc1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QnKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygncmVhY3QtZG9tJykgfHxcbiAgICAgICAgICAgICAgaWQuaW5jbHVkZXMoJ3JlYWN0LXJvdXRlci1kb20nKSB8fFxuICAgICAgICAgICAgICBpZC5pbmNsdWRlcygnZnJhbWVyLW1vdGlvbicpIHx8XG4gICAgICAgICAgICAgIGlkLmluY2x1ZGVzKCdzY2hlZHVsZXInKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXJlYWN0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbHVjaWRlLXJlYWN0JykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItaWNvbnMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogNTE3MyxcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgc2VjdXJlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFvWSxTQUFTLG9CQUFvQjtBQUNqYSxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8scUJBQXFCO0FBRTVCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLGdCQUFnQjtBQUFBLE1BQ2QsV0FBVztBQUFBLE1BQ1gsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsTUFDZCxXQUFXO0FBQUEsTUFDWCxLQUFLO0FBQUEsSUFDUCxDQUFDO0FBQUEsSUFDRCxRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixlQUFlLENBQUMsZUFBZSxjQUFjLGVBQWUseUJBQXlCO0FBQUEsTUFDckYsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsU0FBUztBQUFBLFFBQ1QsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUcvQixnQkFDRSxHQUFHLFNBQVMsT0FBTyxLQUNuQixHQUFHLFNBQVMsV0FBVyxLQUN2QixHQUFHLFNBQVMsa0JBQWtCLEtBQzlCLEdBQUcsU0FBUyxlQUFlLEtBQzNCLEdBQUcsU0FBUyxXQUFXLEdBQ3ZCO0FBQ0EscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxRQUFRO0FBQUEsTUFDVjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
