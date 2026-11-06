const jwt = require('jsonwebtoken')
require('dotenv').config()
const model = require('../model/auth')


const secret = process.env.JWT_SECRET
function sign(id,username, role) {
    return jwt.sign({id, username, role}, secret,{
        algorithm:'HS256',
        expiresIn:'2d'
    })
}


function check(...roles) {
    return async (req, res, next) => {
        const [wawa, token] = (req.headers.authorization || '').split(' ')
        if (wawa !== 'Bearer' || !token) {
            return res.status(401).json({ status: 'error', message: 'ไม่พบ token' })
        }
        let decoded
        try {
            decoded = jwt.verify(token, secret)
        } catch (e) {
            const msg = e.name === 'TokenExpiredError' ? 'Token หมดอายุ กรุณาเข้าสู่ระบบใหม่' : 'token ไม่ถูกต้อง'
            return res.status(401).json({ status: 'error', message: msg })
        }
        try {
            const row = await model.finduser(decoded.id)
            if (!row || !row.is_active) {
                return res.status(401).json({ status: 'error', message: 'บัญชีไม่พร้อมใช้งาน' })
            }
            if (roles.length && !roles.includes(row.role)) {
                return res.status(403).json({ status: 'error', message: 'ไม่มีสิทธิ์เข้าถึงข้อมูล' })
            }
            req.user = row
            next()
        } catch (e) {
            console.log(e)
            res.status(500).json({ status: 'error', message: 'เกิดข้อผิดพลาดในระบบ' })
        }
    }
}

const login = check()
const admin = check('hr')
const user = check('assessee')
const board = check('assessor')

module.exports = {login,admin,user,board,sign}


// const { use } = require('react')