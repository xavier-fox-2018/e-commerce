require('dotenv').config()
const multer = require('multer')
const { Storage } = require('@google-cloud/storage')
const crypto = require('crypto')
const path = require('path')
const googleCloudStorage = new Storage({
  projectId: process.env.GCLOUD_STORAGE_BUCKET,
  keyFilename: process.env.GCLOUD_KEY_FILE
})

class TestController {
  static upload (req, res) {

  }
}

module.exports = TestController
