'use client'

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  )
}
export function ClientIdForm() {
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
        />
      <div className="relative mt-6">
        
        <input
          type="text"
          placeholder="Client ID"
          aria-label="Client ID"
          className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="button"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
            onClick={() => {
              alert('hi')
            }}
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}
