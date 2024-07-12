const shortid = require("shortid");
const urlModel = require('../models/url.db')

exports.generateShortUrl =  async(req,res) =>{
    if(!req.body)return res.status(404).json(({message : "url is required"}));
    const urlShort = shortid();
    await urlModel.create({
        shortId : urlShort,
        redirectUrl : req.body.url,
        visitHistory : []
    });
    return res.json({ id : urlShort})
}

exports.redirectUrl = async(req, res) =>{
    if(!req.params)return res.status(404).json({message : "url not found"});
    const shortId = req.params.shortId;
    const urlData = await urlModel.findOneAndUpdate({shortId},{
        $push:{
            visitHistory : {
                timestamp : Date.now()
            }
        }
    });
    res.redirect(urlData.redirectUrl);
}

exports.urlAnalytics = async (req,res)=>{
    if(!req.params)return res.status(404).json({message : "url not found"});
    const urlObject = await urlModel.findOne({shortId :  req.params.shortId});
    res.json({
        totalVisits : urlObject.visitHistory.length,
        visitHistory : urlObject.visitHistory
    })
}