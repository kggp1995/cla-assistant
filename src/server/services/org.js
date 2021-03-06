require('../documents/org');
let mongoose = require('mongoose');
let Org = mongoose.model('Org');

let selection = function (args) {
    let selectArguments = args.orgId ? { orgId: args.orgId } : { org: args.org };

    return selectArguments;
};

module.exports = {
    create: function (args, done) {
        Org.create({
            orgId: args.orgId,
            org: args.org,
            gist: args.gist,
            token: args.token,
            excludePattern: args.excludePattern,
            sharedGist: !!args.sharedGist,
            minFileChanges: args.minFileChanges,
            minCodeChanges: args.minCodeChanges
        }, function (err, org) {
            done(err, org);
        });
    },

    get: function (args, done) {
        Org.findOne(selection(args), function (err, org) {
            if (!err && !org) {
                err = 'Organization not found in Database';
            }
            done(err, org);
        });
    },

    getMultiple: function (args, done) {
        Org.find({ orgId: { $in: args.orgId } }, done);
    },

    getOrgWithSharedGist: function (gist, done) {
        Org.find({ gist: gist, sharedGist: true }, done);
    },

    remove: function (args, done) {
        Org.findOneAndRemove(selection(args), done);
    }
};
