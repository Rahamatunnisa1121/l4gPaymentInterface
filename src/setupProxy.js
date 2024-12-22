const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    // Proxy for general /api requests

    // app.use(
    //     "/api/studentEmailCheck",
    //     createProxyMiddleware({
    //         target: "https://i25si1o7qi.execute-api.ap-south-1.amazonaws.com", // API endpoint
    //         changeOrigin: true,
    //         pathRewrite: {
    //             "^/api/studentEmailCheck": "/v1/studentEmailCheck", // Rewrite path as needed
    //         },
    //         onProxyReq: (proxyReq, req, res) => {
    //             // Append email query parameter dynamically
    //             const email = req.query.email;
    //             if (email) {
    //                 proxyReq.path += `?email=${email}`; // Add email parameter
    //             }
    //         },
    //     })
    // );

    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://qhf89t91pj.execute-api.ap-south-1.amazonaws.com",
            changeOrigin: true,
            pathRewrite: {
                "^/api": "",
            },
        })
    );

    // Proxy specifically for the /api/studentEmailCheck endpoint
    
};
