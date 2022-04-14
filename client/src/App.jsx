import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <main className="container">
        Hello main
      </main>
      <div className="container">
        <Footer />
      </div>
    </>
  );
}

export default App;
