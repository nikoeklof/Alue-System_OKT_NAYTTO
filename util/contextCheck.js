const { AuthenticationError } = require('apollo-server');

module.exports = (user, rank) => {
    if (!user)
        throw new AuthenticationError("User has been deleted")

    if (rank == 1 && !user.rank.worker)
        throw new AuthenticationError("User has to be worker")

    if (rank == 2 && !user.rank.admin)
        throw new AuthenticationError("User has to be admin")

    return user
}