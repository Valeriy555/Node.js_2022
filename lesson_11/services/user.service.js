const { User } = require('../dataBase');

module.exports = {
    findUsers: (params = {}) => {
        return User.find(params);
    },

    findUsersWithPagination: async (query = {}) => {
        const {page = 1, perPage = 5, ...otherFilters } = query;

        const searchObject = {};

        if (otherFilters.search){
            Object.assign(searchObject,{
                $or: [
                    {name: {$regex: otherFilters.search, $options: 'i'}},
                    {email: {$regex: otherFilters.search, $options: 'i'}}
                ]
            })
        }


        const skip = (page - 1) * perPage;

        const users = await User.find(searchObject).skip(skip).limit(perPage);
        const usersCount = await User.countDocuments(searchObject);

        return {
            page,
            perPage,
            data: users,
            count: usersCount
        }
    },


    findOneUser: (params = {}) => {
        return User.findOne(params);
    },

    createUser: (user) => {
        return User.create(user);
    },

    updateOneUser: (params, userData, options = { new: true }) => {
        return User.findOneAndUpdate(params, userData, options);

    },

    deleteOneUser: (params) => {
        return User.deleteOne(params);
    },
};