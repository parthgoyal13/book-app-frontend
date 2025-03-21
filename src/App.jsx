import BookForm from "./components/BookForm";
import BookView from "./components/BookView";

function App() {
  return (
    <>
      <div>
        <h1>Books Library App</h1>
        <br />
        <BookForm />
        <BookView />
      </div>
    </>
  );
}

export default App;
