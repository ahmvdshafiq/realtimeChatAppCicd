import { server, io } from '../app.mjs';
import { expect } from 'chai';
import ioClient from 'socket.io-client';

let clientSocket1, clientSocket2;

describe('WebSocket Server', function() {
    this.timeout(20000);  // Set timeout to 20 seconds

    before((done) => {
        server.listen(3001, () => {
            console.log('Test server running on port 3001');
            setTimeout(done, 1000);  // Delay to ensure the server is fully initialized
        });
    });

    after((done) => {
        // Close the client sockets first
        clientSocket1 && clientSocket1.disconnect();
        clientSocket2 && clientSocket2.disconnect();
        
        // Ensure the server is running before closing it
        if (server.listening) {
            io.close();  // Close Socket.IO server
            server.close(done);  // Close HTTP server
        } else {
            done();  // Server is not running, just complete the after hook
        }
    });

    it('should serve static files', (done) => {
        // Static file serving logic can go here
        done();
    });

    it('should connect and disconnect a socket', function(done) {
        this.timeout(15000);  // Set specific timeout for this test
        clientSocket1 = ioClient('http://localhost:3001');

        clientSocket1.on('connect', () => {
            console.log('Client 1 connected');
            clientSocket1.disconnect();
        });

        clientSocket1.on('disconnect', () => {
            console.log('Client 1 disconnected');
            done();
        });

        clientSocket1.on('connect_error', (err) => {
            console.error('Connection error:', err);
            done(err);
        });
    });

    it('should broadcast messages to all clients', function(done) {
        this.timeout(15000);
        clientSocket1 = ioClient('http://localhost:3001');
        clientSocket2 = ioClient('http://localhost:3001');

        clientSocket2.on('message', (msg) => {
            try {
                console.log('Message received by Client 2:', msg);
                expect(msg).to.equal('Hello, world!');
                clientSocket1.disconnect();
                clientSocket2.disconnect();
                done();
            } catch (err) {
                done(err);
            }
        });

        clientSocket1.on('connect', () => {
            console.log('Client 1 connected, sending message');
            clientSocket1.emit('message', 'Hello, world!');
        });

        clientSocket1.on('connect_error', done);
        clientSocket2.on('connect_error', done);
    });
});
