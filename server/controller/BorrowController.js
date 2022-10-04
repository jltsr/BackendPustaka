const findAll = async(req,res) =>{
    try {
        const result = await req.context.models.borrows.findAll({});
        return res.send(result)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const peminjaman = async(req,res,next)=>{
    try {
        const cek = await req.context.models.members.findOne({
            where: { member_id: req.body.member_id }
        })
        const cek1 =await req.context.models.member_roles.findOne({
            where: { member_id: req.body.member_id }
        })
        const now = new Date(req.body.borrow_date)
        let penalty_date= new Date(cek1.penalty_date)
        let dif=(now-penalty_date)/(1000 * 3600 * 24)

        if(cek.total_pinjam >= 2){
            return res.send('Maaf Sudah melewati batas pinjam')
        }else if(dif<=3){
            return res.send('Maaf Sedang masa penalty')
        }else{
            const result = await req.context.models.borrows.create({
            borrow_date : req.body.borrow_date,
            status:'dipinjam',
            book_id : req.body.book_id,
            member_id: req.body.member_id
            })
            const findOne = await req.context.models.books.findOne({
                where: { book_id: req.body.book_id }
            })
            await req.context.models.books.update({
                stock:findOne.stock-1
            },{
                returning: true, where:{ book_id: req.body.book_id }
            })
            const findOneMember = await req.context.models.members.findOne({
                where: { member_id: req.body.member_id }
            })
            await req.context.models.members.update({
                total_pinjam:findOneMember.total_pinjam+1
            },{
                returning: true, where:{ member_id: req.body.member_id }
            })
            return res.send(result)
        }
    } catch (error) {
        return res.status(404).send(error)
    }
}


const deleted = async (req, res) => {
    try {
        
      const findOne= await req.context.models.borrows.findOne({
        where:{borrow_id:req.params.id}
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
        const result = await req.context.models.borrows.destroy({
            where: { borrow_id: req.params.id },
          });
      
        
      return res.send(`delete success `);
    } catch (error) {
      return res.status(404).send(error);
    }
  };
export default {
    findAll,
    deleted,
    peminjaman
}