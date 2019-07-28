'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.uploadStream = uploadStream;
exports.BlockBlobURLFrom = BlockBlobURLFrom;
exports.containerUrlFrom = containerUrlFrom;

var _uuidV = require('uuid-v4');

var _uuidV2 = _interopRequireDefault(_uuidV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('@azure/storage-blob'),
    Aborter = _require.Aborter,
    BlockBlobURL = _require.BlockBlobURL,
    ContainerURL = _require.ContainerURL,
    ServiceURL = _require.ServiceURL,
    SharedKeyCredential = _require.SharedKeyCredential,
    StorageURL = _require.StorageURL,
    uploadStreamToBlockBlob = _require.uploadStreamToBlockBlob,
    uploadFileToBlockBlob = _require.uploadFileToBlockBlob;

var streamifier = require('streamifier');
var fs = require("fs");
var path = require("path");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

var STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
var ACCOUNT_ACCESS_KEY = process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY;

var ONE_MEGABYTE = 1024 * 1024;
var FOUR_MEGABYTES = 4 * ONE_MEGABYTE;
var ONE_MINUTE = 60 * 1000;

async function showContainerNames(aborter, serviceURL) {

    var response = void 0;
    var marker = void 0;

    do {
        response = await serviceURL.listContainersSegment(aborter, marker);
        marker = response.marker;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = response.containerItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var container = _step.value;

                console.log(' - ' + container.name);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    } while (marker);
}

async function uploadLocalFile(aborter, containerURL, filePath) {

    filePath = path.resolve(filePath);

    var fileName = path.basename(filePath);
    var blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, fileName);

    return await uploadFileToBlockBlob(aborter, filePath, blockBlobURL);
}

async function uploadStream(blockBlobURL, file) {
    var aborter = Aborter.timeout(30 * ONE_MINUTE);
    // filePath = path.resolve(filePath);

    // const fileName = path.basename(filePath).replace('.md', '-.md');
    var readStream = streamifier.createReadStream(file.buffer);
    console.log(readStream);
    //const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL,`${Date.now()}-${uuid()}${file.originalname}`);

    // const stream = fs.createReadStream(file, {
    //   highWaterMark: FOUR_MEGABYTES,
    // });

    var uploadOptions = {
        bufferSize: FOUR_MEGABYTES,
        maxBuffers: 6
    };

    return await uploadStreamToBlockBlob(aborter, readStream, blockBlobURL, uploadOptions.bufferSize, uploadOptions.maxBuffers);
}

async function showBlobNames(aborter, containerURL) {

    var response = void 0;
    var marker = void 0;

    do {
        response = await containerURL.listBlobFlatSegment(aborter);
        marker = response.marker;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = response.segment.blobItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var blob = _step2.value;

                console.log(' - ' + blob.name);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    } while (marker);
}

exports.default = async function execute(image) {

    var containerName = "bittrade2015";
    // const blobName = "quickstart.txt";
    // const content = "hello!";
    //const localFilePath = "./awaismanzoor.png";

    var credentials = new SharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
    var pipeline = StorageURL.newPipeline(credentials);
    var serviceURL = new ServiceURL('https://' + STORAGE_ACCOUNT_NAME + '.blob.core.windows.net', pipeline);

    var containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    //const blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, blobName);


    // console.log("Containers:");
    // await showContainerNames(aborter, serviceURL);

    // await containerURL.create(aborter)
    // .then(()=>console.log(`Container: "${containerName}" is created`))
    // .catch(()=>console.log(`${containerName} alread Exist`));


    // await blockBlobURL.upload(aborter, content, content.length);
    // console.log(`Blob "${blobName}" is uploaded`);

    // await uploadLocalFile(aborter, containerURL, image) 
    // .then(()=> console.log(`Local file "${image}" is uploaded`))
    // .catch(()=>console.log(`Local file "${image}" doesn't ex`))


    return await uploadStream(aborter, containerURL, image);
    // .then((data)=> {console.log(`Local file "${image.originalname}" is uploaded`)})
    // .catch(()=>console.log(`Local file "${image.originalname}" doesn't ex`))
    // console.log(`Local file "${localFilePath}" is uploaded as a stream`);

    // console.log(`Blobs in "${containerName}" container:`)
    // await showBlobNames(aborter, containerURL);

    // const downloadResponse = await blockBlobURL.download(aborter, 0);
    // const downloadedContent = downloadResponse.readableStreamBody.read(content.length).toString();
    // console.log(`Downloaded blob content: "${downloadedContent}"`);

    // await blockBlobURL.delete(aborter)
    // console.log(`Block blob "${blobName}" is deleted`);

    // await containerURL.delete(aborter);
    // console.log(`Container "${containerName}" is deleted`);
};

function BlockBlobURLFrom(containerURL, filename) {
    var blockBlobURL = BlockBlobURL.fromContainerURL(containerURL, filename);
    return blockBlobURL;
}

function containerUrlFrom() {
    var containerName = "bittrade2015";
    var credentials = new SharedKeyCredential(STORAGE_ACCOUNT_NAME, ACCOUNT_ACCESS_KEY);
    var pipeline = StorageURL.newPipeline(credentials);
    var serviceURL = new ServiceURL('https://' + STORAGE_ACCOUNT_NAME + '.blob.core.windows.net', pipeline);

    var containerURL = ContainerURL.fromServiceURL(serviceURL, containerName);
    return containerURL;
}
//execute().then(() => console.log("Done")).catch((e) => console.log(e));
//# sourceMappingURL=index.js.map