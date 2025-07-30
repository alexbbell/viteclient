import React, { type FormEvent, useState } from 'react'
import { authUrl } from '../../../config'
import { type ILoginData } from '../LangMaster/BLLangMaster'
import { saveUserToken } from './../../../store/langSlice'
import axios from 'axios'
import { useAppDispatch } from '../../../hooks'
import { useLocalStorage } from 'usehooks-ts'
import { useNavigate } from 'react-router-dom'

export default function Login (): JSX.Element {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState<ILoginData>({ username: '', password: '' })
  const [, setTokenAuth] = useLocalStorage('userToken', '')
  const [errorAuth, setErrorAuth] = useState('')
  const dispatch = useAppDispatch()
  async function loginUser (): Promise<void> {
    axios.post(authUrl, credentials,
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        // setToken(res.data)
        if (res.data?.status === 'Failed to login') {
          setErrorAuth(`Failed to login  ${res.data?.status as string}`)
        } else {
          console.log('res.data', res.data)
          dispatch(saveUserToken({ accessToken: res.data }))
          setTokenAuth(res.data)
          setErrorAuth('')
          console.log('ok redirect')
          navigate('/en/lngmngr/', { replace: true })
        }
      })
      .catch((error) => {
        console.error(error)
        dispatch(saveUserToken({ accessToken: '' }))
        setTokenAuth('')
        setErrorAuth(`Login failed,   ${error.message as string}`)
      })
  }

  function handleSubmit (e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()
    void loginUser()
  }

  return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={ handleSubmit }>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => {
                      setCredentials({
                        ...credentials,
                        username: e.target.value
                      })
                    }
                  }
                     />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" autoComplete='true' onChange={e => {
                      setCredentials({
                        ...credentials,
                        password: e.target.value
                      })
                    }
                  } />
                </label>
                <div>{errorAuth}</div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
  )
}
