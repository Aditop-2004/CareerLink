import jwt from "jsonwebtoken";
//it is a middleware to check whether the user is loginned or not (to check kar lo ki uska token valid hai ya nhi)
//har middleware me next() jarur aata hai ek parameter ke taur pe aur use ham hamesha last me jarur lagate hai
const isAuthenticated = async (req, res, next) => {
  try {
    console.log("hello");
    const token = req.cookies.token; //agar ham cookieparser na use karte to req.cookies ko access nhi kar pate
    if (!token) {
      return res.status(401).json({
        message: "user not authenticated",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId; //this is the id of the user loginned jo ki token ke andar save ki thi at the time of login
    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
