import '../app/main.css'; 

export default function PageLoader() {
  return (
    <div className="page-loader">
      <div className="spinner"></div>
      <h3>Loading Velox...</h3>
      <p>Please wait</p>
    </div>
  );
}
