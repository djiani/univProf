exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/univProfdb';
exports.TEST_DATABASE_URL = (
                              process.env.TEST_DATABASE_URL ||
                              'mongodb://localhost/univProfdb');
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '365d';

exports.AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || 'AKIAI3URK4C3ZXH4EKUA';
exports.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || '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';
exports.S3_BUCKET = process.env.S3_BUCKET;
exports.S3_REGION = process.env.S3_REGION;
