import BookForm from "./components/BookForm";
import BookView from "./components/BookView";

function App() {
  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center text-primary">Books Library App</h1>
        <div className="row">
          <div className="col-md-6">
            <BookForm />
          </div>
          <div className="col-md-6">
            <BookView />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
