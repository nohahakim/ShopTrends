// This is client side config only - don't put anything in here that shouldn't be public!
// export const endpoint = `http://localhost:3000/api/graphql`;
export const prodEndpoint = `https://shoptrends-pgkd.onrender.com/api/graphql`;
// frontend/config.js

export const endpoint =
  process.env.NODE_ENV === "development"
    ? `http://localhost:3000/api/graphql`
    : `https://shoptrends-pgkd.onrender.com/api/graphql`;

export const perPage = 4;
