const Product = require("../../models/product.model");


//GET /admin/products
module.exports.index = async (req, res) => {
    //console.log(req.query.status);
    //filter base on status
    let filterStatus = [
        {
            name: "All",
            status: "",
            class: "active",
        },
        {
            name: "Active",
            status: "active",
            class: ""
        },
        {
            name: "Inactive",
            status: "inactive",
            class: ""
        }
    ]

    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status;
    }
    if (req.query.status) {
        filterStatus.forEach(status => {
            if (status.status === req.query.status) {
                status.class = "active";
            } else {
                status.class = "inactive";
            }
        })
    }
    //search base on keyword

    const regex = new RegExp(req.query.keyword, "i");
    if (regex) {
        find.title = regex;
    }

    const products = await Product.find(find)

    //console.log(products)
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus
    });
};
