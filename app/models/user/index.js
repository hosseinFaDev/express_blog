const db = require('../../../database/mysql');
const hashServices = require('../../services/hashServices');

exports.findAll = async (columns = []) => {
const sqlColumns = columns.length > 0 ? columns: '*' ;
const [rows , fields ] = await db.query(`
SELECT ${sqlColumns} 
FROM users`);
return rows ;
}

exports.findAllByEmail = async (email) => {
    const [rows ] = await db.query(`
    SELECT * 
    FROM users
    WHERE email=?
    LIMIT 1
    `,[email]);
    return rows.length === 1 ? rows[0] : null ;
    }

exports.create = async (userData) => {
    const hashedPassword = hashServices.hashPassword(userData.password);
    const updatedUsersData ={ ...userData , password : hashedPassword };
    const [result] = await db.query(`INSERT INTO users SET ?`, [updatedUsersData]);
    return result.insertId;
}
exports.delete = async (userID) => {
    const [result] = await db.query(`
    DELETE FROM users WHERE id=? LIMIT 1
    ` , [userID]);
}
exports.find = async (userID) => {
    const [rows, fields] = await db.query(`
    SELECT * 
    FROM users
    WHERE id=? LIMIT 1`
        , [userID]);
    return rows.length > 0 ? rows[0] : false;
}
exports.update = async (userID, updateFields) => {
    const [result] = await db.query(`
UPDATE users SET ? WHERE id=? LIMIT 1`
        ,[ updateFields ,userID]);
}

