import * as q from './queries'
import { useQuery, useMutation } from '@apollo/client'

export const GetAllUsers = () => useQuery(q.ALL_USERS)
export const GetAllAreas = () => useQuery(q.ALL_AREAS)

export const GetUserCount = () => useQuery(q.USER_COUNT)
export const GetAreaCount = () => useQuery(q.AREA_COUNT)

export const Me = () => useQuery(q.ME)

const updateAreas = (cache, response) => {
  const newArea = Object.entries(response.data)[0][1]
  cache.updateQuery({ query: q.ALL_AREAS }, ({ allAreas }) => {
    return {
      allAreas: allAreas.map(area => {
        return area === newArea ? newArea : area
      })
    }
  })
}

const updateUsers = (cache, response) => {
  const newUser = Object.entries(response.data)[0][1]
  cache.updateQuery({ query: q.ALL_USERS }, ({ allUsers }) => {
    return {
      allUsers: allUsers.map(user => {
        return user === newUser ? newUser : user
      })
    }
  })
}

export const CreateUser = () => useMutation(q.CREATE_USER, {
  update: (cache, response) => {
    cache.updateQuery({ query: q.ALL_USERS }, ({ allUsers }) => {
      return {
        allUsers: allUsers.concat(response.data.createUser),
      }
    })
  }
})

export const CreateArea = () => useMutation(q.CREATE_AREA, {
  update: (cache, response) => {
    cache.updateQuery({ query: q.ALL_AREAS }, ({ allAreas }) => {
      return {
        allAreas: allAreas.concat(response.data.createArea),
      }
    })
  }
})

export const MakeRequest = () => useMutation(q.MAKE_REQUEST, {
  update: (cache, response) => updateAreas(cache, response)
})

export const RemoveRequests = () => useMutation(q.REMOVE_REQUESTS, {
  update: (cache, response) => updateAreas(cache, response)
})

export const DenyLoanRequest = () => useMutation(q.DENY_LOAN_REQUEST, {
  update: (cache, response) => updateAreas(cache, response)
})

export const ToggleUserAdmin = () => useMutation(q.TOGGLE_USER_ADMIN, {
  update: (cache, response) => updateUsers(cache, response)
})

export const ToggleUserWorker = () => useMutation(q.TOGGLE_USER_WORKER, {
  update: (cache, response) => updateUsers(cache, response)
})

export const ToggleUserDisabled = () => useMutation(q.TOGGLE_USER_DISABLED, {
  update: (cache, response) => updateUsers(cache, response)
})

export const EditPassword = () => useMutation(q.EDIT_USER_PASSWORD, {
  update: (cache, response) => updateUsers(cache, response)
})

export const EditEmail = () => useMutation(q.EDIT_USER_EMAIL, {
  update: (cache, response) => updateUsers(cache, response)
})

export const EditEmailAsAdmin = () => useMutation(q.EDIT_USER_EMAIL_AS_ADMIN, {
  update: (cache, response) => updateUsers(cache, response)
})

export const EditUserAbout = () => useMutation(q.EDIT_USER_ABOUT, {
  update: (cache, response) => updateUsers(cache, response)
})

export const AcceptAreaRequest = () => useMutation(q.ALLOW_AREA_REQUEST, {
  update: (cache, response) => updateAreas(cache, response)
})

export const ReturnArea = () => useMutation(q.RETURN_SHARED_AREA, {
  update: (cache, response) => updateAreas(cache, response)
})

export const EditArea = () => useMutation(q.EDIT_AREA, {
  update: (cache, response) => updateAreas(cache, response)
})

export const DeleteArea = () => useMutation(q.DELETE_AREA, {
  update: (cache, response) => {
    cache.updateQuery({ query: q.ALL_AREAS }, ({ allAreas }) => {
      return {
        allAreas: allAreas.filter(
          area => area.id !== response.data.deleteArea.id
        )
      }
    })
  }
})

export const DeleteUser = () => useMutation(q.DELETE_USER, {
  update: (cache, response) => {
    cache.updateQuery({ query: q.ALL_USERS }, ({ allUsers }) => {
      return {
        allUsers: allUsers.filter(
          user => user.id !== response.data.deleteUser.id
        )
      }
    })
  }
})

export const UserLogin = () => useMutation(q.LOGIN, {
  refetchQueries: [ { query: q.ME } ]
})