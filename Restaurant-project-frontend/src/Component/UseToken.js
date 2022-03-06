
export function getUserToken(){
    const isUserPresent = localStorage.getItem('userToken')
    if(isUserPresent){
        return JSON.parse(localStorage.getItem('userToken'))
    }
    else{
      return null
    }
}

export function saveUserToken(userToken){
    localStorage.setItem('userToken', JSON.stringify(userToken));
}

export function deleteUserToken(){
    localStorage.clear()
}

