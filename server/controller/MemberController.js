const findAll = async(req,res) =>{
    try {
        const cek = await req.context.models.member_roles.findAll({
          where:{
            role_id:2
          }
        })
        cek.map((data)=>{
          let now = new Date()
          let penalty_date= new Date(data.penalty_date)
          let dif=(now-penalty_date)/(1000 * 3600 * 24)
          if(dif>3){
            req.context.models.member_roles.update({
              role_id:1
            },{
              returning: true, where:{ member_id: data.member_id }
          })
          }
          
        })

        const result = await req.context.models.members.findAll({});
        return res.status(200).send(result)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async(req,res)=>{
    try {
        const now = new Date()
        const result = await req.context.models.members.create({
            member_id : req.body.member_id,
            member_name : req.body.member_name,
            member_modified_date: now 
        })
        return res.status(200).send(result)
        
    } catch (error) {
        return res.status(404).send(error)
    }
}

const update = async(req,res)=>{
    try {
        const now = new Date()
        const result = await req.context.models.members.update({
            member_id : req.params.id,
            member_name : req.body.member_name,
            member_modified_date: now 
        },{
            returning: true, where:{ member_id: req.params.id }
        })
        return res.status(200).send(result)

        
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req, res) => {
    try {
      const result = await req.context.models.members.findOne({
        where: { member_id: req.params.id },
      });
      return res.status(200).send(result);
    } catch (error) {
      return res.status(404).send(error);
    }
  }
const deleted = async (req, res) => {
    try {
      const result = await req.context.models.members.destroy({
        where: { member_id: req.params.id },
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