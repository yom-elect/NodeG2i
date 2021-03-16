const auth = async (req, res, next) => {
  try {
    let token = req.cookies.w_auth;
    if (!token)
      return res.json({
        isAuth: false,
        error: true,
        message: "Visit the /generateToken to Validate this request"
      });
    req.token = token;
    next();
  } catch (err) {
    return res.json({
      isAuth: false,
      error: true,
    });
  }
};

module.exports = { auth };
