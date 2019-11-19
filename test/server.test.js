var express = require('express');
var router = express.Router();

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');


const db = require('../config/keys').testMongoURI;
mongoose.connect(db);

const Posts = require('../models/Posts');


//chai configuration
chai.use(chaiHttp);
chai.should();


describe("Posts", () => {
    Posts.collection.drop();

  beforeEach((done) => {
    var newPost = new Posts({
        "title": "i need psp",
        "postBody": "where can i get a portable psp",
        "author": "alexander"
    });
    newPost.save(function(err) {
      done();
    });
  });
  afterEach(function(done){
    Posts.collection.drop();
    done();
  });

        it("should get all post on api/post/ GET", (done) => {
            chai.request('http://localhost:5000')
            .get('/api/posts')
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('title');
                res.body[0].should.have.property('author');
                res.body[0].title.should.equal('i need psp');
                res.body[0].author.should.equal('alexander');
                done();
            });
        });

        it("it should get a single post on api/posts/<id> GET");

        it("it should add a single post on api/posts/ POST", (done) => {
            chai.request('http://localhost:5000')
            .post('/api/posts')
            .send({"title": "i need nba 2k19", "postBody": "where can i get nba 2k19 OBB file", "author": "alexswiss"})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('postBody');
                res.body.should.have.property('author');
                res.body.should.have.property('_id');
                res.body.title.should.equal('i need nba 2k19');
                res.body.author.should.equal('alexswiss');
                done();

            })
        });

        it("it should get update a single post on api/posts/<id> PUT");
        it("it should delete a single post on api/posts/<id> DELETE");

});