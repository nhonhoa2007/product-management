module.exports = (query) => {
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
    if (query.status) {
        find.status = query.status;
    }
    if (query.status) {
        filterStatus.forEach(status => {
            if (status.status === query.status) {
                status.class = "active";
            } else {
                status.class = "inactive";
            }
        })
    }
    return filterStatus;
}
