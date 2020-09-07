const permit = (...role) => {
    console.log(role)
    return (req, res, next) => {
        console.log(role)
        if (role.includes(req.user.role)) {
            next()
        } else {
            res.status(403).json({message: 'Forbidden'});
        }
    }
}

export default permit;