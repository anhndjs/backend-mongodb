const { trusted } = require('mongoose');
const shortid = require('shortid');
const { Url } = require('../models');

const { redis } = require('../redis/connect');

async function createUrl(req, res) {
  try {
    const foundUrl = req.body.full;
    if (!foundUrl) {
      res.status(400).json({
        isSuccess: false,
        message: 'Url not found',
      });
    }

    const shortUrl = shortid.generate();

    await redis.set('aaa', 100);

    // const valueInRedis = await redis.get('aaa');

    const deletes = await redis.del('aaa');

    console.log(deletes);

    // const url = await Url.create({ short: shortUrl, clicks: foundUrl });
    // res.status(200).json({ isSuccess: true, url });
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUrl(req, res) {
  try {
    const shortUrl = req.params.short;

    const url = await Url.findOneAndUpdate({ short: shortUrl }, { $inc: { clicks: 1 } }, { new: true }).select('full').lean();
    if (!url) {
      res.status(400).json({ isSuccess: false, message: 'Url not found' });
    }

    res.redirect(url.full);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUrl(req, res) {
  try {
    const urlId = req.params.id;
    await Url.deleteOne({ _id: urlId });
    res.status(204).json({ isSuccess: true });
  } catch (error) {
    throw new Error(error.message);
  }
}
module.exports = {
  getUrl,
  createUrl,
  deleteUrl,
};
