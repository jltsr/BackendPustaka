const findAll = async(req,res) =>{
    try {
        const result = await req.context.models.return_book.findAll({});
        return res.send(result)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const pengembalian = async(req,res)=>{
    const return_book_date = req.body.return_book_date
    try {
        const findOne= await req.context.models.borrows.findOne({
            where:{borrow_id:req.body.borrow_id}
        })
        const date1=new Date(findOne.borrow_date)
        const date2=new Date(req.body.return_book_date)
        let dif=(date2-date1)/(1000 * 3600 * 24)

        if(dif>7){
            const result = await req.context.models.return_book.create({
                borrow_id:req.body.borrow_id,
                return_book_date:req.body.return_book_date
            })
            await req.context.models.borrows.update({
                status:'sudah dikembalikan'
            },{
                returning: true, where:{ borrow_id: req.body.borrow_id }
            })

            const findOneBook = await req.context.models.books.findOne({
                where: { book_id: findOne.book_id }
            })
            await req.context.models.books.update({
                stock:findOneBook.stock+1
            },{
                returning: true, where:{ book_id: findOne.book_id }
            })
            const findOneMember = await req.context.models.members.findOne({
                where: { member_id: findOne.member_id }
            })
            await req.context.models.members.update({
                total_pinjam:findOneMember.total_pinjam-1
            },{
                returning: true, where:{ member_id: findOne.member_id }
            })
            const unpenalty_date=new Date(req.body.return_book_date)
            unpenalty_date.setDate(unpenalty_date.getDate()+3)
            await req.context.models.member_roles.update({
                role_id:2,
                penalty_date: req.body.return_book_date,
                unpenalty_date : unpenalty_date
            },{
                returning: true, where:{ member_id: findOne.member_id }
            })
            return res.send(result)

        }else{
            const result = await req.context.models.return_book.create({
                borrow_id:req.body.borrow_id,
                return_book_date:req.body.return_book_date
            })
            await req.context.models.borrows.update({
                status:'sudah dikembalikan'
            },{
                returning: true, where:{ borrow_id: req.body.borrow_id }
            })

            const findOneBook = await req.context.models.books.findOne({
                where: { book_id: findOne.book_id }
            })
            await req.context.models.books.update({
                stock:findOneBook.stock+1
            },{
                returning: true, where:{ book_id: findOne.book_id }
            })
            const findOneMember = await req.context.models.members.findOne({
                where: { member_id: findOne.member_id }
            })
            await req.context.models.members.update({
                total_pinjam:findOneMember.total_pinjam-1
            },{
                returning: true, where:{ member_id: findOne.member_id }
            })

            return res.send(result)
        }
        
    } catch (error) {
        return res.status(404).send(error)
    }
}
export default {
    findAll,
    pengembalian
}
