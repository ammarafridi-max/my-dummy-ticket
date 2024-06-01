// import React, { createContext, useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// const CurrencyContext = createContext();

// const conversionRates = {
//   AED: 1,
//   OMR: 0.1,
//   SAR: 1,
//   USD: 0.27,
// };

// const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState("AED");
//   const navigate = useNavigate();

//   const changeCurrency = useCallback(
//     (newCurrency, shouldNavigate = true) => {
//       if (currency !== newCurrency) {
//         setCurrency(newCurrency);
//         if (shouldNavigate) {
//           switch (newCurrency) {
//             case "AED":
//               navigate("/ae", { replace: true });
//               break;
//             // case "OMR":
//             //   navigate("/om", { replace: true });
//             //   break;
//             case "SAR":
//               navigate("/sa", { replace: true });
//               break;
//             case "USD":
//               navigate("/us", { replace: true });
//               break;
//             default:
//               navigate("/ae", { replace: true });
//           }
//         }
//       }
//     },
//     [currency, navigate]
//   );

//   const convertPrice = (priceInAED) => {
//     return priceInAED * conversionRates[currency];
//   };

//   useEffect(() => {
//     const path = window.location.pathname;
//     switch (path) {
//       // case "/om":
//       //   setCurrency("OMR");
//       //   break;
//       case "/sa":
//         setCurrency("SAR");
//         break;
//       case "/us":
//         setCurrency("USD");
//         break;
//       case "/ae":
//       default:
//         setCurrency("AED");
//         break;
//     }
//   }, []);

//   return (
//     <CurrencyContext.Provider
//       value={{ currency, changeCurrency, convertPrice }}
//     >
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export { CurrencyContext, CurrencyProvider };
