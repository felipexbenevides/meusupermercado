if (Meteor.isClient) {

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    //process.env.MAIL_URL = 'smtp://postmaster%40meteorize.mailgun.org:YOURPASSWORD@smtp.mailgun.org:587';
  });
}
