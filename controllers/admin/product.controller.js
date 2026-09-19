const Product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
//GET /admin/products
module.exports.index = async (req, res) => {
    //console.log(req.query.status);
    const filterStatus = filterStatusHelper(req.query);
    console.log(filterStatus);
    //filter base on status
    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    if (req.query.status) {
        filterStatus.forEach(status => {
            if (find.status === status.status) {
                status.class = 'active'
            } else {
                status.class = 'inactive'
            }
        })
    }

    //search base on keyword
    const objectSearch = searchHelper(req.query)
    find.title = objectSearch.regex;

    const products = await Product.find(find)

//console.log(products)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        regex: objectSearch.regex,
        keyword: objectSearch.keyword,
    })
}
