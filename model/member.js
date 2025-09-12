const mongoose = require('mongoose');

const memberSchema2 = new mongoose.Schema({
  timestamp: String,
  formId: String,
  businessName: String,
  yearOfEstablishment: String,
  businessCategory: String,
  listOfServicesOffered: String,
  businessRegistrationNumber: String,
  businessPhoneNumber: String,
  businessEmailAddress: String,
  businessWebsite: String,
  anyOneSocialMediaProfileOptional: String,
  genderIdentity: String,
  businessAddress: String,
  businessState: String,
  businessDistrict: String,
  aboutYourBusiness: String,
  whatSetsYouApartFromCompetitors: String,

  serviceLocation1Country: String,
  serviceLocation1State: String,
  serviceLocation1District: String,

  serviceLocation2Country: String,
  serviceLocation2State: String,
  serviceLocation2District: String,

  serviceLocation3Country: String,
  serviceLocation3State: String,
  serviceLocation3District: String,

  serviceLocation4Country: String,
  serviceLocation4State: String,
  serviceLocation4District: String,

  serviceLocation5Country: String,
  serviceLocation5State: String,
  serviceLocation5District: String,

  serviceLocation6Country: String,
  serviceLocation6State: String,
  serviceLocation6District: String,

  serviceLocation7Country: String,
  serviceLocation7State: String,
  serviceLocation7District: String,

  serviceLocation8Country: String,
  serviceLocation8State: String,
  serviceLocation8District: String,

  serviceLocation9Country: String,
  serviceLocation9State: String,
  serviceLocation9District: String,

  serviceLocation10Country: String,
  serviceLocation10State: String,
  serviceLocation10District: String,

  annualTurnoverIn: String,
  personPhoto: String,
  relPhoto: String,
  pdf: String,
  whatDoYouExpectFromRifah: String,
  passwordForLogin: String
});

module.exports = mongoose.model('Member2', memberSchema2);
