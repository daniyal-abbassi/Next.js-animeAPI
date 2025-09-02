import Image from "next/image";
import BootstrapExample from "./components/BootstrapExample";

export default function Home() {
  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center p-4">
      <main className="text-center">
        <Image
          className="mb-4"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <ol className="list-group list-group-numbered mb-4">
          <li className="list-group-item">
            Get started by editing{" "}
            <code className="bg-light text-dark px-2 py-1 rounded">
              app/page.tsx
            </code>
            .
          </li>
          <li className="list-group-item">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="d-flex gap-3 justify-content-center flex-column flex-sm-row">
          <a
            className="btn btn-primary btn-lg"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
              className="me-2"
            />
            Deploy now
          </a>
          <a
            className="btn btn-outline-secondary btn-lg"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      
      {/* Bootstrap Example Component */}
      <BootstrapExample />
      
      <footer className="mt-5">
        <div className="d-flex gap-4 flex-wrap justify-content-center">
          <a
            className="text-decoration-none d-flex align-items-center gap-2"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Learn
          </a>
          <a
            className="text-decoration-none d-flex align-items-center gap-2"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Examples
          </a>
          <a
            className="text-decoration-none d-flex align-items-center gap-2"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Go to nextjs.org →
          </a>
        </div>
      </footer>
    </div>
  );
}
