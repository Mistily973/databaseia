type AuthAnimationsProps = {
  mode?: "login" | "signup"
  className?: string
}

const cells = Array.from({ length: 12 })

export default function AuthAnimations({
  mode = "login",
  className = "",
}: AuthAnimationsProps) {
  const isSignup = mode === "signup"

  return (
    <div
      className={`auth-animation ${className}`}
      aria-hidden="true"
      data-mode={mode}
    >
      <div className="auth-animation__glow auth-animation__glow--one" />
      <div className="auth-animation__glow auth-animation__glow--two" />

      <div className="auth-animation__orbit auth-animation__orbit--outer">
        <span />
      </div>
      <div className="auth-animation__orbit auth-animation__orbit--inner">
        <span />
      </div>

      <div className="auth-animation__flow">
        <div className="auth-animation__card auth-animation__sheet">
          <div className="auth-animation__sheet-top">
            <span className="auth-animation__file-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 3h7l4 4v14H7V3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 3v5h4M10 12h5M10 15h5M10 18h3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span>ventas.xlsx</span>
          </div>
          <div className="auth-animation__grid">
            {cells.map((_, index) => (
              <i key={index} style={{ animationDelay: `${index * 70}ms` }} />
            ))}
          </div>
        </div>

        <div className="auth-animation__connector">
          <span />
          <span />
          <span />
        </div>

        <div className="auth-animation__card auth-animation__database">
          <div className="auth-animation__db-icon">
            <svg viewBox="0 0 48 48" fill="none">
              <ellipse
                cx="24"
                cy="11"
                rx="14"
                ry="6"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M10 11v12c0 3.3 6.3 6 14 6s14-2.7 14-6V11M10 23v12c0 3.3 6.3 6 14 6s14-2.7 14-6V23"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div>
            <strong>{isSignup ? "Tu espacio" : "Base lista"}</strong>
            <small>{isSignup ? "Creado en segundos" : "148 registros"}</small>
          </div>
          <span className="auth-animation__status" />
        </div>
      </div>

      <div className="auth-animation__message">
        <span className="auth-animation__spark">
          <svg viewBox="0 0 20 20" fill="none">
            <path
              d="M10 2c.5 4.7 3.3 7.5 8 8-4.7.5-7.5 3.3-8 8-.5-4.7-3.3-7.5-8-8 4.7-.5 7.5-3.3 8-8Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <span>
          {isSignup ? "Tu cuenta está lista" : "¿Cuánto vendimos hoy?"}
        </span>
        <i />
      </div>

      <div className="auth-animation__particle auth-animation__particle--one" />
      <div className="auth-animation__particle auth-animation__particle--two" />
      <div className="auth-animation__particle auth-animation__particle--three" />


    </div>
  )
}
