
exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success'
    })
}

exports.getOneUser = (req, res) => {
    res.status(200).json({
        status: 'success'
    })
}

exports.createUser =  (req, res) => {
        res.status(201).json({
            status: 'success'
        })
}

exports.updateUser = (req, res) => {
    res.status(200).json({
        status: 'success'
    })
}

exports.deleteUser =  (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}