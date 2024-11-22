export const IdTokenData = (props: { idTokenClaims: any }) => {
  return (
    <div className="data-area-div">
      <p>
        See below the claims in your <strong> ID token </strong>. For more information, visit:{' '}
        <span>
          <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/id-tokens#claims-in-an-id-token">
            docs.microsoft.com
          </a>
        </span>
      </p>
    </div>
  );
};
