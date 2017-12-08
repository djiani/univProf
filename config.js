exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/univProfdb';
exports.TEST_DATABASE_URL = (
                              process.env.TEST_DATABASE_URL ||
                              'mongodb://localhost/univProfdb');
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY ;

exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID ;
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
exports.S3_BUCKET = process.env.S3_BUCKET;
exports.S3_REGION = process.env.S3_REGION;
exports.EMAIL = process.env.EMAIL || 'camunivprof@gmail.com';
exports.EMAIL_PASS = process.env.EMAIL_PASS ;
