import { useState } from 'react';
export const SuccessMessage = () => {
    const [oidcUrl, setOidcUrl] = useState(sessionStorage.getItem('OIDC_URL') ?? '');
    const [clientId, setClientId] = useState(sessionStorage.getItem('CLIENT_ID') ?? '');
    return (
      <>
        <h2 className="font-display text-sm font-semibold tracking-wider text-neutral-950">
          Look through your token response.
        </h2>
        <p className="mt-4 text-sm text-neutral-700">
          Scroll down to learn more about your token response.        
        </p>
        <p className="mt-4 text-sm text-neutral-700">
          OpenId Connect: <strong className="font-semibold text-neutral-950">{oidcUrl}</strong>
        </p>
        <p className="mt-4 text-sm text-neutral-700">
          Client Id: <strong className="font-semibold text-neutral-950">{clientId}</strong>
        </p>      
      </>
    )
  }