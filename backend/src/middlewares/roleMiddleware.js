const permit = (...role) => {
    return (req, res, next) => {
        if (role.includes(req.user.role)) {
            next()
        } else {
            res.status(403).json({message: 'Forbidden'});
        }
    }
}

export default permit;