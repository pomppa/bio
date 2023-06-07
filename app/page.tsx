import Link from "next/link";

export default function Page() {
  return (
    <>
      <h2>👋 hello ツ </h2>
      <h4>my name is tuomas</h4>
      <pre>
        currently at{" "}
        <a href="https://www.vaimo.com/" target="_blank">
          vaimo
        </a>
        , prev at{" "}
        <a href="https://www.solteq.com/" target="_blank">
          solteq
        </a>
      </pre>
      <pre>
        i code sometimes, check my{" "}
        <a href="https://github.com/pomppa/" target="_blank">
          github
        </a>
      </pre>
      <pre>
        follow me on{" "}
        <a href="https://www.instagram.com/pomppa/" target="_blank">
          instagram
        </a>
      </pre>
      <pre>
        connect on{" "}
        <a href="https://www.linkedin.com/in/anakkalatuomas" target="_blank">
          linkedin
        </a>
      </pre>
      <div className="links">
        <small>my top tracks</small>
        <br></br>
        <big>
          <Link href="spotify/top">spotify top</Link>
        </big>
      </div>
    </>
  );
}
