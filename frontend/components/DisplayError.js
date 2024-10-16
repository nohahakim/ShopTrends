export default function DisplayError({ error }) {
  if (!error) return null;
  if (error.graphQLErrors) {
    return error.graphQLErrors.map((err, i) => (
      <DisplayError key={i} error={err} />
    ));
  }
  if (error.networkError) return <p>Error: {error.networkError.message}</p>;
  return <p>Error: {error.message}</p>;
}
