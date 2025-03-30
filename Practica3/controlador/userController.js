const User = require('../modelos/User');

exports.listUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
};

exports.showForm = (req, res) => {
    res.render('form', { user: null });
};

exports.createUser = (req, res) => {
    User.create(req.body, err => {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.editUser = (req, res) => {
    User.getById(req.params.id, (err, results) => {
        if (err) throw err;
        res.render('form', { user: results[0] });
    });
};

exports.updateUser = (req, res) => {
    User.update(req.params.id, req.body, err => {
        if (err) throw err;
        res.redirect('/');
    });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).send('ID no proporcionado');
    }

    User.delete(id, (err) => {
        if (err) {
            console.error('Error al eliminar:', err);
            return res.status(500).send('Error al eliminar usuario');
        }
        res.redirect('/');
    });
};
exports.searchUser = (req, res) => {
    const { id } = req.query;
    
    if (!id) {
        return res.redirect('/');
    }

    User.getById(id, (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).send('Error al buscar usuario');
        }

        if (results.length === 0) {
            return res.send('No se encontró ningún usuario con ese ID');
        }

        res.render('index', { users: results });
    });
};
