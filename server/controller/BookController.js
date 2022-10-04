import { Op } from "sequelize";

const findAll = async(req,res) =>{
    try {
        const result = await req.context.models.books.findAll({
          attributes :['book_id','book_title','book_author','stock'],
          
        });
        return res.status(200).send(result)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async(req,res)=>{
    try {
        const now = new Date()
        
        const result = await req.context.models.books.create({
            book_id : req.body.book_id,
            book_title: req.body.book_title,
            book_author: req.body.book_author,
            stock: req.body.stock,
            book_modified_date: now 
        })
        return res.status(200).send(result)
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async(req,res)=>{
    try {
        const now = new Date()
          const result = await req.context.models.books.update({
            book_id : req.params.id,
            book_title : req.body.book_title,
            book_author: req.body.book_author,
            stock: req.body.stock,
            book_modified_date: now 
        },{
            returning: true, where:{ book_id: req.params.id }
        })
        return res.status(200).send("succes")

        
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req, res) => {
    try {
      const result = await req.context.models.books.findOne({
        where: { book_id: req.params.id },
      });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
const deleted = async (req, res) => {
    try {
      const result = await req.context.models.books.destroy({
        where: { book_id: req.params.id },
      });
      return res.status(200).send(`delete success `);
    } catch (error) {
      return res.status(404).send(error);
    }
  };
export default {
    findAll,
    create,
    findOne,
    update,
    deleted
}