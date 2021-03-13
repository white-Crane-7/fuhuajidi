module.exports = {
    devServer: {
        port: 5000,
        open: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://youcode.natapp1.cc',   // target表示代理的服务器url
                //target: 'https://ddmm.youcode123.com',   // target表示代理的服务器url
                //target: 'http://jypyrt.natappfree.cc',   // target表示代理的服务器url
                changeOrigin:true,
                pathRewrite: {     // pathRewrite表示路径重写，key表示一个正则，value表示别名 
                    '^/api': '/'   // 即用 '/api'表示'http://localhost:3000/'
                },
                logLevel:"debug"
            }
        }
    }
}