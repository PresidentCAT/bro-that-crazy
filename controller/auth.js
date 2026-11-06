const model = require('../model/auth')
const log = require('../model/history')
const auth = require('../middleware/auth')
const { hashpassword, verifyPassword} = require('../utils/password')
const dberror = require('../utils/dberror')


exports.login = async (req, res) => {
    const { username, password } = req.body
    try{
        const row = await model.login(username)
        if(!row || !verifyPassword(password,row.password.hash)) {
            return res.status(401).json({status:'error', message:'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'})
        }
        if (!row.is_active) return res.status(403).json({status:'error', message:'บัญชีนี้ถูกระงับการใช้งาน'})
    }
}