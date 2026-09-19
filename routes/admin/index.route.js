const dashboardRoutes = require("./dashboard.route");
const productRoutes = require("./product.route");
const systemConfig = require("../../config/system")
module.exports = (app) => {
    app.use(systemConfig.prefixAdmin + '/dashboard', dashboardRoutes)
    app.use(systemConfig.prefixAdmin + '/products', productRoutes)
}