// @flow 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { SiteRequests } from './SiteRequests/SiteRequests';
import Login from '../Login/Login';
import type { ITokenApiModel } from '../LangMaster/BLLangMaster';
import { useLangStore } from '../../../zstore';
// import { saveUserToken } from '../../../store/langSlice';
// import { useAppDispatch } from '../../../hooks';


 const Admin = () => {
  const [tokens, setTokens] = React.useState<ITokenApiModel>( );
  const setUserToken = useLangStore(s => s.setUserToken)!;

  React.useEffect( () => {
    const lsTokens: string | null = localStorage.getItem('userToken')
    let tkns: ITokenApiModel = {}
    if (lsTokens !== null && lsTokens !== '') {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tkns = JSON.parse(lsTokens)
      setTokens(tkns)
    }
  },[])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,     // 1 мин данные считаются свежими
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

    return (
        <div>
        <QueryClientProvider client={queryClient}>
        <h1>Admin panel</h1>
        {
          !tokens || (tokens.accessToken == null || tokens.accessToken === '') ?
            <Login /> :        
            <>            
            <button style={{ position: 'absolute', right: '30px' }} onClick={() => {
                    localStorage.removeItem( 'userToken')
                          setUserToken({ accessToken: '' })
                          setTokens({})

                        }}>Logout</button>
            
            <SiteRequests />
            </>

        }
        </QueryClientProvider>        
        </div>
    );
};

export default Admin;