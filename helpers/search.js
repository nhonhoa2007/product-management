module.exports = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    }
    if (query.keyword) {
        objectSearch.keyword = query.keyword;

        const regex_1 = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex_1;


    }
    return objectSearch;
}