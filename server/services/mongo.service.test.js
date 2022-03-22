const mongodbService = require('./mongo.service');

describe('Test Database Connectivity Service', () => {

    jest.useFakeTimers();
    beforeAll(done => {
        done();
    });

    test('Test connection', () => {
        mongodbService.dbConnect();
    })
    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongodbService.disconnect();
        done();
    })
})