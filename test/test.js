const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const io = require('socket.io-client');
const http = require('http');
const server = require('../server');  // Assuming your main server file is named server.js
const socketURL = 'http://localhost:3000';

let socket;

describe('WebSocket Server', () => {
    before((done) => {
        server.listen(3000, () => {
            console.log('Test server running on port 3000');
            done();
        });
    });

    after((done) => {
        server.close(() => {
            console.log('Test server stopped');
            done();
        });
    });

    it('should serve static files', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.headers['content-type']).to.include('text/html');
                done();
            });
    });

    it('should connect and disconnect a socket', (done) => {
        socket = io.connect(socketURL, {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Test client connected');
            socket.disconnect();
        });

        socket.on('disconnect', () => {
            console.log('Test client disconnected');
            done();
        });
    });

    it('should broadcast messages to all clients', (done) => {
        const client1 = io.connect(socketURL, {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
        });

        const client2 = io.connect(socketURL, {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
        });

        client1.on('connect', () => {
            client1.emit('message', 'Hello, World!');
        });

        client2.on('message', (msg) => {
            expect(msg).to.equal('Hello, World!');
            client1.disconnect();
            client2.disconnect();
            done();
        });
    });
});
