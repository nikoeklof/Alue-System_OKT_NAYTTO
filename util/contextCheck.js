const { AuthenticationError } = require('apollo-server');

module.exports = (user, rank) => {
    if (!user)
        throw new AuthenticationError("Unauthorized access")

    if (rank == 1 && !user.rank.worker && !user.rank.admin)
        throw new AuthenticationError("User has to be worker or admin")

    if (rank == 2 && !user.rank.admin)
        throw new AuthenticationError("User has to be admin")

    return user
}