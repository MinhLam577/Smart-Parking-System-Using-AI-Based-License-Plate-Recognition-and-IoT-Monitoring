const requireAdmin = async (req, res, next) => {
    // verify user is authenticated
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ error: 'Authorization token required' });
    }
    const token = authorization.split(' ')[1];
    try {
        //role
      const { _id} = jwt.verify(token, process.env.SECRET);
  
      req.user = await User.findOne({ _id }).select('_id role');
  
      if (!req.user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      // Check if user is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Access forbidden. Admin permission required' });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ error: 'Request is not authorized' });
    }
  };
  module.exports = requireAdmin