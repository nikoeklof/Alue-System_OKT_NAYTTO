module.exports = (user, hasToBeAdmin) => {
    if (!user)
        throw new AuthenticationError("Not authenticated")

    if (hasToBeAdmin && !user.admin)
        throw new AuthenticationError("User has to be admin")

    return user
}