const Member2 = require("../model/member");

// ✅ Add Member (sync with Google Sheet)
const addMember = async (req, res) => {
  try {
    const secret = req.headers["x-webhook-secret"];
    if (secret !== process.env.WEBHOOK_SECRET) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    // 🔹 Expecting the same fields as your Google Sheet's Appscript
          const {
          timestamp,
          formId,
          businessName,
          yearOfEstablishment,
          businessCategory,
          listOfServicesOffered,
          businessRegistrationNumber,
          businessPhoneNumber,
          businessEmailAddress,
          businessWebsite,
          anyOneSocialMediaProfileOptional,
          genderIdentity,
          businessAddress,
          businessState,
          businessDistrict,
          aboutYourBusiness,
          whatSetsYouApartFromCompetitors,

          serviceLocation1Country,
          serviceLocation1State,
          serviceLocation1District,

          serviceLocation2Country,
          serviceLocation2State,
          serviceLocation2District,

          serviceLocation3Country,
          serviceLocation3State,
          serviceLocation3District,

          serviceLocation4Country,
          serviceLocation4State,
          serviceLocation4District,

          serviceLocation5Country,
          serviceLocation5State,
          serviceLocation5District,

          serviceLocation6Country,
          serviceLocation6State,
          serviceLocation6District,

          serviceLocation7Country,
          serviceLocation7State,
          serviceLocation7District,

          serviceLocation8Country,
          serviceLocation8State,
          serviceLocation8District,

          serviceLocation9Country,
          serviceLocation9State,
          serviceLocation9District,

          serviceLocation10Country,
          serviceLocation10State,
          serviceLocation10District,

          annualTurnoverIn,
          personPhoto,
          relPhoto,
          pdf,
          whatDoYouExpectFromRifah,
          passwordForLogin,
          salt
        } = req.body;



    // if (!emailAddress) {
    //   return res.status(400).json({ message: "Email is required" });
    // }

      // ➕ Insert new member 
      const member = await Member2.create({
            timestamp,
          formId,
          businessName,
          yearOfEstablishment,
          businessCategory,
          listOfServicesOffered,
          businessRegistrationNumber,
          businessPhoneNumber,
          businessEmailAddress,
          businessWebsite,
          anyOneSocialMediaProfileOptional,
          genderIdentity,
          businessAddress,
          businessState,
          businessDistrict,
          aboutYourBusiness,
          whatSetsYouApartFromCompetitors,

          serviceLocation1Country,
          serviceLocation1State,
          serviceLocation1District,

          serviceLocation2Country,
          serviceLocation2State,
          serviceLocation2District,

          serviceLocation3Country,
          serviceLocation3State,
          serviceLocation3District,

          serviceLocation4Country,
          serviceLocation4State,
          serviceLocation4District,

          serviceLocation5Country,
          serviceLocation5State,
          serviceLocation5District,

          serviceLocation6Country,
          serviceLocation6State,
          serviceLocation6District,

          serviceLocation7Country,
          serviceLocation7State,
          serviceLocation7District,

          serviceLocation8Country,
          serviceLocation8State,
          serviceLocation8District,

          serviceLocation9Country,
          serviceLocation9State,
          serviceLocation9District,

          serviceLocation10Country,
          serviceLocation10State,
          serviceLocation10District,

          annualTurnoverIn,
          personPhoto,
          relPhoto,
          pdf,
          whatDoYouExpectFromRifah,
          passwordForLogin,
          salt
});

   
    res.json({ message: "✅ Member synced successfully", member });
    console.log("data got from appscript")
  } catch (err) {
    console.error("❌ Sync Error:", err);
    res.status(500).json({ error: err.message });
  }
};



// Fetch all members
const getMembers = async (req, res) => {
  try {
    const members = await Member2.find().sort({ timestamp: -1 }); // newest first
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch single member by ID
const getMemberById = async (req, res) => {
  try {
    const member = await Member2.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addMember, getMembers, getMemberById };
