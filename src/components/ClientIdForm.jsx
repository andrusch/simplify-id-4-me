'use client'
import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 6"  aria-hidden="true" {...props}>
      <path
        fill="white"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  )
}

const clientOptions = (client_id) => { return {
  client_id,
  usePkce: true,
  scope: 'openid profile'
}};

const ClientIdForm = (props) => {
  const { onTokenUpdate } = props;
  const [oidcUrl, setOidcUrl] = useState('');
  const [clientId, setClientId] = useState('');
  const [token, setToken] = useState(undefined);
  useEffect(() => {
    const cachedOidcUrl = sessionStorage.getItem('OIDC_URL');
    if (cachedOidcUrl)
      setOidcUrl(cachedOidcUrl);    
    const cachedClientId = sessionStorage.getItem('CLIENT_ID');
    if (cachedClientId)
      setClientId(cachedClientId);
  }, []);
  const checkForToken = useCallback(async () => {      
    if (window.location.search.match(/\?code=/gi) && oidcUrl && clientId) {
      const { OidcClient } = await import('@pingidentity-developers-experience/ping-oidc-client-sdk')
      const oidcClient = await OidcClient.initializeFromOpenIdConfig(oidcUrl, clientOptions(clientId));
      if (token)
        console.log('refreshing token');
      if (await oidcClient.hasToken()) {      
        const tokenResponse = await oidcClient.getToken();
        const userInfo = await oidcClient.fetchUserInfo();
        setToken({tokenResponse, userInfo});
        onTokenUpdate({ tokenResponse, userInfo});
      }
  }
  }, [token, clientId, oidcUrl, setToken, onTokenUpdate]);
  useEffect(() => {    
    checkForToken();
  }, [token, checkForToken]);
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
        Enter a Client ID to get started
      </h2>
      <p className="mt-4 text-sm text-neutral-700">
        Enter a PKCE enable OAUTH Client ID to get started. If you do not have
        one, use something like AWS Cognito to create one.
      </p>
      <input
          type="text"
          placeholder="OpenID Configuration URL"
          aria-label="OpenID Configuration URL"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
          defaultValue={oidcUrl}
          onBlur={(x) => {
            sessionStorage.setItem('OIDC_URL', x.target.value);
            setOidcUrl(x.target.value);
          }}
        />
      <div className="relative mt-6">        
        <input
          type="text"
          placeholder="Client ID"
          aria-label="Client ID"
          defaultValue={clientId}
          onBlur={(x) => { 
            sessionStorage.setItem('CLIENT_ID', x.target.value); 
            setClientId(x.target.value); 
          }}
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="button"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
            onClick={async () => {              
                const { OidcClient } = await import('@pingidentity-developers-experience/ping-oidc-client-sdk')
    
              // // Initialize the library using an authentication server's well-known endpoint. Note this takes in the base url of the auth server, not the well-known endpoint itself. '/.well-known/openid-configuration' will be appended to the url by the SDK.
              const oidcClient = await OidcClient.initializeFromOpenIdConfig(oidcUrl, clientOptions(clientId));
              // // // Used to authorize a user. Note this will use window.location.assign, thus redirecting the user after the url is generated.
              oidcClient.authorize(/* optional login_hint */);
            }}
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export default ClientIdForm;