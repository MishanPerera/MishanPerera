const router = require("express").Router();

let NormalService = require("../models/NormalService");
const { db } = require("../models/ServiceFacility");
let ServiceFacility = require("../models/ServiceFacility");

//CREATE
router.route("/add").post((req,res)=> {
    const vNo= req.body.vNo;
    const cusName= req.body.cusName;
    const entryDate= req.body.entryDate;
    const handoverDate= req.body.handoverDate;
    const totalFPrice = Number(req.body.totalFPrice);
    const laborCost = Number(req.body.laborCost);
    const totalCost = Number(req.body.totalCost);

    const newNormal = new NormalService({
        vNo,
        cusName,
        entryDate,
        handoverDate,
        totalFPrice,
        laborCost,
        totalCost
    })

    newNormal.save().then(()=>{
        res.json("The Normal Service is added to the system successfully!")
    }).catch((err)=>{
        console.log(err)
    })

})
//RETRIEVE
/*router.route("/retrieve/:serviceType").get(async(req,res)=>{
    let type= req.params.serviceType;

    const sFacility = await ServiceFacility.find({serviceType:type}).then((serviceFacilities)=>{
        res.status(200).send({status: "Normal Service Facilities are fetched", serviceFacilities})

    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "Error with get facilities...", error: err.message})
    })
})*/

//RETRIEVE
router.route("/").get((req,res)=>{

    ServiceFacility.find({serviceType: "Normal"}).then((facilities)=>{
        res.json(facilities)
    }).catch((err)=>{
        console.log(err)
    })
})

//CANCEL
router.route("/cancel/:sid").delete(async(req,res)=>{
    let sId= req.params.sid;

    await NormalService.findByIdAndDelete(sId).then(()=>{
        res.status(200).send({status: "Cancel The Service!"})

    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "Error with cancelling the service...", error: err.message})
    })
})

//SEARCH
router.route("/search/:entryDate").get(async(req,res)=>{
    let eDate= req.params.entryDate;

    const service = await NormalService.find({entryDate:eDate}).then((normalServices)=>{
        res.status(200).send({status: "Normal Services are fetched for relevant date", normalServices})

    }).catch((err)=>{
        console.log(err.message)
        res.status(500).send({status: "Error with get services...", error: err.message})
    })
})

module.exports = router;