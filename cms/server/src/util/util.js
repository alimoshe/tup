
const PAGE_COUNT_DEFAULT = 1;
const LIMIT_COUNT_DEFAULT = 5;

function getPagination(query){
    const page = Math.abs(query.pageCount) || PAGE_COUNT_DEFAULT;
    const limit = Math.abs(query.limitCount) || LIMIT_COUNT_DEFAULT;

    const skip = (page - 1) * limit;

    return{
        limit,
        skip
    }
}

module.exports = {
    getPagination,
}