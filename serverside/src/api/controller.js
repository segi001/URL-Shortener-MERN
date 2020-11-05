const monk = require('monk');
const Joi = require('@hapi/joi');
const srs = require('secure-random-string');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const urlDB = db.get('shortenIt');

const urlShortnerScheme = Joi.object({
    url : Joi.string().uri().required(),
    token : Joi.string()
});

exports.getURL = async (req,res,next) => {
    try {
        const {siteID} = req.params;
        const values = await urlDB.findOne({token:siteID});
        if (!values.url) {
            res.json({status:404});
        } else {
            res.json({status:200,url:values.url});
        }
    } catch(err) {
        next(err);
    }
}
exports.shortenURL = async (req,res,next) => {
    try {
        const values = await urlShortnerScheme.validateAsync(req.body);
        values['token'] = srs({length : 3});
        await urlDB.insert(values);
        const token = values.token;
        res.json({
            token : token
        });
    } catch(err) {
        next(err);
    }
}