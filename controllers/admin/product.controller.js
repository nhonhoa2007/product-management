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
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination
    let objectPagination = {
        limitItems: 4,
        currentPage: 1,
    };
    if (req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    const countProducts = await Product.countDocuments(find);
    const totalPages = Math.ceil(countProducts / objectPagination.limitItems);
    objectPagination.totalPages = totalPages;

    const products = await Product.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}
