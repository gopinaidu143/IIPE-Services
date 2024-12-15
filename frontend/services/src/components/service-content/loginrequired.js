
  
  
// export default function LoginRequired() {
//     const redirectToHome = () => {
//       window.location.href = '/';
//     };
  
//     return (
//       <main>
//         <h1 id="login-title">Login Required</h1>
//         <p id="login-message">You need to log in to access this service.</p>
//         <button id="home-button" onClick={redirectToHome}>Go to Home Page</button>

//       </main>
//     );
//   }
  

export default function LoginRequired() {
    const redirectToHome = () => {
      window.location.href = '/';
    };
  
    return (
      <main>
        <h1 id="login-title">Login Required</h1>
        <p id="login-message">You need to log in to access this service.</p>
        <div id="button-container">
          <button id="home-button" onClick={redirectToHome}>Go to Home Page</button>
        </div>
  
        <style jsx>{`
          #login-title {
            font-size: 2.5rem;
            font-weight: 700;
            color: rgb(0, 0, 0);
            margin-bottom: 1rem;
            text-align: center;
          }

          #login-message {
            font-size: 1.25rem;
            color: #4a5568;
            margin-bottom: 2rem;
            text-align: center;
          }

          #button-container {
            display: flex;
            justify-content: center;
            width: 100%;
          }

          #home-button {
            padding: 0.75rem 1.5rem;
            background-color: rgb(56, 51, 51);
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            transition: background-color 0.3s ease;
          }

          #home-button:hover {
            background-color: rgb(0, 0, 0);
          }
        `}</style>
      </main>
    );
}

  