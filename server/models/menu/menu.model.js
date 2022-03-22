const menuModel = require('./menu.mongo');

async function getAllMenu(){
    // Get All Menu Exist in Database
    return menuModel.find({});
}