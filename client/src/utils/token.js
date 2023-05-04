import jwt_decode from "jwt-decode"

export const decryptToken = () => {
  const token = localStorage.getItem("token")
  return jwt_decode(token)
}
