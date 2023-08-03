import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Prompotopia",
  description: "Discover and share ai prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>

          <main>
            <Nav></Nav>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
