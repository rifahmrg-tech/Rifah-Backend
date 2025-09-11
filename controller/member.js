const Member = require("../model/member");

// ✅ Add Member (sync with Google Sheet)
const addMember = async (req, res) => {
  try {
    const secret = req.headers["x-webhook-secret"];
    if (secret !== process.env.WEBHOOK_SECRET) {
      return res.status(403).json({ message: "Unauthorized request" });
    }

    // 🔹 Expecting the same fields as your Google Sheet's Appscript
    const {
            Timestamp,
            FormId,
            BusinessName,
            YearOfEstablishment,
            BusinessCategory,
            ListOfServicesOffered,
            BusinessRegistrationNumber,
            BusinessPhoneNumber,
            BusinessEmailAddress,
            BusinessWebsite,
            AnyOneSocialMediaProfileOptional,
            GenderIdentity,
            BusinessAddress,
            BusinessState,
            BusinessDistrict,
            AboutYourBusiness,
            WhatSetsYouApartFromCompetitors,
            ServiceLocation1Country,
            ServiceLocation1State,
            ServiceLocation1District,
            ServiceLocation2Country,
            ServiceLocation2State,
            ServiceLocation2District,
            ServiceLocation3Country,
            ServiceLocation3State,
            ServiceLocation3District,
            ServiceLocation4Country,
            ServiceLocation4State,
            ServiceLocation4District,
            ServiceLocation5Country,
            ServiceLocation5State,
            ServiceLocation5District,
            ServiceLocation6Country,
            ServiceLocation6State,
            ServiceLocation6District,
            ServiceLocation7Country,
            ServiceLocation7State,
            ServiceLocation7District,
            ServiceLocation8Country,
            ServiceLocation8State,
            ServiceLocation8District,
            ServiceLocation9Country,
            ServiceLocation9State,
            ServiceLocation9District,
            ServiceLocation10Country,
            ServiceLocation10State,
            ServiceLocation10District,
            AnnualTurnoverIn,
            personphoto,
            relphoto,
            pdf,
            WhatDoYouExpectFromRIFAH,
            PasswordForLogin,
            Salt
        } = req.body;


    // if (!emailAddress) {
    //   return res.status(400).json({ message: "Email is required" });
    // }

      // ➕ Insert new member 
      const member = await Member.create({
            Timestamp,
            FormId,
            BusinessName,
            YearOfEstablishment,
            BusinessCategory,
            ListOfServicesOffered,
            BusinessRegistrationNumber,
            BusinessPhoneNumber,
            BusinessEmailAddress,
            BusinessWebsite,
            AnyOneSocialMediaProfileOptional,
            GenderIdentity,
            BusinessAddress,
            BusinessState,
            BusinessDistrict,
            AboutYourBusiness,
            WhatSetsYouApartFromCompetitors,
            ServiceLocation1Country,
            ServiceLocation1State,
            ServiceLocation1District,
            ServiceLocation2Country,
            ServiceLocation2State,
            ServiceLocation2District,
            ServiceLocation3Country,
            ServiceLocation3State,
            ServiceLocation3District,
            ServiceLocation4Country,
            ServiceLocation4State,
            ServiceLocation4District,
            ServiceLocation5Country,
            ServiceLocation5State,
            ServiceLocation5District,
            ServiceLocation6Country,
            ServiceLocation6State,
            ServiceLocation6District,
            ServiceLocation7Country,
            ServiceLocation7State,
            ServiceLocation7District,
            ServiceLocation8Country,
            ServiceLocation8State,
            ServiceLocation8District,
            ServiceLocation9Country,
            ServiceLocation9State,
            ServiceLocation9District,
            ServiceLocation10Country,
            ServiceLocation10State,
            ServiceLocation10District,
            AnnualTurnoverIn,
            personphoto,
            relphoto,
            pdf,
            WhatDoYouExpectFromRIFAH,
            PasswordForLogin,
            Salt
});

   
    res.json({ message: "✅ Member synced successfully", member });
    console.log("data got from appscript")
  } catch (err) {
    console.error("❌ Sync Error:", err);
    res.status(500).json({ error: err.message });
  }
};



module.exports = {addMember}