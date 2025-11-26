import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="nf-container">
      <div className="nf-content">
        <h1 className="nf-title">404</h1>
        <h2 className="nf-subtitle">Page non trouvée</h2>
        <p className="nf-text">
          Désolé, la page que vous recherchez n'existe pas.
        </p>
        <a href="/" className="nf-button">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
