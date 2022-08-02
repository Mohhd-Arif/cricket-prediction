const models = require('../models');
const Op = models.Sequelize.Op;

exports.createUser = async (UserData) => {

    return await models.Users.create(UserData);
}

exports.updateData = async (UserData) => {
    return await User.findOneAndUpdate({emailId:UserData.emailId},{ $set: UserData }, { new: true }).lean();
}

exports.findByUserIdAndGetWalletDetails = async (id) => {
    return await User.findOne({ '_id': id })
    .select('wallet')
        .lean();
}

exports.checkUser = async (mobile_number) => {
    console.log("check user"+mobile_number);
    return await User.findOne({ mobile_number: mobile_number }).lean();

}

exports.getTokenById = async (userId) => {
    console.log(userId);
    return await models.Product.findAll();
}

exports.getLoggedInUserDetailsById = async (userId) => {
    return await User.findOne({ '_id': userId })
        .lean();
}

exports.findByMobileDetails = async (mobile_number) => {
    return await User.findOne({'mobile_number': mobile_number })
    .select('_id name emailid mobile_number dodo_type gender otp_verified is_registered')
        .lean();
}

exports.updateLoggedIn = async (user_id,token) => {
    
        return await User.findByIdAndUpdate(user_id, { $set: { 'last_logged_in': new Date(), 'token_session': token } }, { safe: true, upsert: true, new: false });
    
}

exports.findUser = async (mobile_number) => {
    
    return await models.Users.find({ email: mobile_number })

}

exports.findUserByEmail = async (mobile_number) => {
    return await models.Users.findOne({ email: mobile_number })
}

exports.findActiveUserByMobileNumber = async (mobile_number) => {
    return await User.findOne({ 'status':'active', mobile_number: mobile_number }).lean()
}

exports.findByIdAndUpdate = async (id, data) => {
    return await User.findByIdAndUpdate(id, { $set: data }, { safe: true, upsert: false, new: false });
}
exports.findReferralCode = async (referral_code) => {
    
    return await User.find({ 'referral_code': referral_code })
    .lean();

}
exports.findByMobileAndOTP = async (mobile_number) => {
    return await User.findOne({ 'mobile_number': mobile_number })
        .lean();
}

exports.findUserByProfileName = async (profile_name) => {
    return await User.findOne({ 'status':'active', 'profile_name': profile_name })
        .select('_id profile_name')
        .lean();
}

exports.findUserByReferrelCodeName = async (referral_code) => {
    return await User.findOne({ 'referral_code': referral_code })
        .select('_id profile_name referral_code')
        .lean();
}

exports.updateVerifiedUserLogin = async (id, token_session) => {
    return await User.findByIdAndUpdate(id, { $set: { 'otp_verified': true , token_session, 'last_logged_in': new Date()  } }, { safe: true, upsert: false, new: false });
}

exports.findUserByIdAndUpdateData = async (id, user_data) => {
    return await User.findByIdAndUpdate(id, { $set: user_data }, { safe: true, upsert: true, new: false });
}

exports.updateOTPVerified = async (user_id, otp) => {
    return await User.findByIdAndUpdate(user_id, { $set: { otp_verified: true , 'otp': otp } }, { safe: true, upsert: true, new: false });
}
exports.checkName = async (name) => {
    
    return await User.find({ name: name })

}

exports.updateOtp = async (phoneNumber, otp) => {
    console.log("phoneNumber" + phoneNumber);
    return await User.updateOne({ phoneNumber: phoneNumber }, { $set: { otp: otp } });
    
}

exports.checkVerificationCode = async (userId, verificationCode) => {
    return await User.find({ '_id': userId, 'verificationCode': verificationCode })
        .select('_id')
        .lean();
}

exports.updateIsOtpverified = async (userId, userRole) => {
    console.log("userId" + userId);
    return await User.findByIdAndUpdate(userId, { $set: { 'otpVerified': 'true' } }, { safe: true, new: true });
}

exports.updateIsregistered = async (userId) => {
    return await User.findByIdAndUpdate(userId, {
        $set: {
            'isregistered': 'true'
        }
    }, { safe: true, new: true });
}


var nameList = [
    'Time','Past','Future','Dev',
    'Fly','Flying','Soar','Soaring','Power','Falling',
    'Fall','Jump','Cliff','Mountain','Rend','Red','Blue',
    'Green','Yellow','Gold','Demon','Demonic','Panda','Cat',
    'Kitty','Kitten','Zero','Memory','Trooper','XX','Bandit',
    'Fear','Light','Glow','Tread','Deep','Deeper','Deepest',
    'Mine','Your','Worst','Enemy','Hostile','Force','Video',
    'Game','Donkey','Mule','Colt','Cult','Cultist','Magnum',
    'Gun','Assault','Recon','Trap','Trapper','Redeem','Code',
    'Script','Writer','Near','Close','Open','Cube','Circle',
    'Geo','Genome','Germ','Spaz','Shot','Echo','Beta','Alpha',
    'Gamma','Omega','Seal','Squid','Money','Cash','Lord','King',
    'Duke','Rest','Fire','Flame','Morrow','Break','Breaker','Numb',
    'Ice','Cold','Rotten','Sick','Sickly','Janitor','Camel','Rooster',
    'Sand','Desert','Dessert','Hurdle','Racer','Eraser','Erase','Big',
    'Small','Short','Tall','Sith','Bounty','Hunter','Cracked','Broken',
    'Sad','Happy','Joy','Joyful','Crimson','Destiny','Deceit','Lies',
    'Lie','Honest','Destined','Bloxxer','Hawk','Eagle','Hawker','Walker',
    'Zombie','Sarge','Capt','Captain','Punch','One','Two','Uno','Slice',
    'Slash','Melt','Melted','Melting','Fell','Wolf','Hound',
    'Legacy','Sharp','Dead','Mew','Chuckle','Bubba','Bubble','Sandwich','Smasher','Extreme','Multi','Universe','Ultimate','Death','Ready','Monkey','Elevator','Wrench','Grease','Head','Theme','Grand','Cool','Kid','Boy','Girl','Vortex','Paradox'
  ]; 
  
  function randName(){
      finalName = nameList[Math.floor( Math.random() * nameList.length )];
      finalName += nameList[Math.floor( Math.random() * nameList.length )];
      if ( Math.random() > 0.5 ) {
      finalName += nameList[Math.floor( Math.random() * nameList.length )];
  }
      return finalName;
  };


exports.generateRandomName = async () => {
    const newName = randName();
 
 return newName;
}

exports.getTopUsersListForUserExploreScreen = async (query) => {
    return await User.aggregate([
        { $match: query },
        { $sort: { createdAt: 1 } },
        { $limit: 10 },
        { $project : {
            "_id" : 1.0,
            "name" : 1.0,
            "profile_name" : 1.0,
            "profile_avatar" : 1.0,
            "winnings" : "$wallet.total_winnings",
          }
      },
      ])
  }

  exports.getMyBalance = async (query) => {
    return await User.aggregate([
        { $match: query },      
        { $project : {
            "_id" : 1.0,
            "Balance" : "$wallet.account_balance",
            "currency" : "$wallet.currency",
            "total_cash_bonus" : "$wallet.total_cash_bonus",
            "winnings" : "$wallet.total_winnings",
          }
      },
      ])
  }

