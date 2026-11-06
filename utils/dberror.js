module.exports = (res,e) => {
    if (e.status) return res.status(e.status).json({status:'error',message: e.message})
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({status:'error',message:'ข้อมูลซ้ำมีอยู่แล้ว'})
    if (e.code === 'ER_NO_REFERENCED_ROW_2') return res.status.json({status:'error',message:'อ้างอิงข้อมูลที่ไม่มีอยู่ในระบบ'})
    if (e.code === 'ER_ROW_IS_REFERENCED_2') return res.status(409).json({status:'error', message:'ไม่สามารถลบได้ เนื่องจากมีข้อมูลอื่นอ้างอิงอยู่'})
    console.log(e)
    res.status(500).json({status:'error',message:'เกิดข้อผิดพลาดภายในระบบ'})
}