export default function CodeBlock() {
  const personal = {
    "name": "Tuomas Änäkkälä",
    "website": "https://www.pomppa.xyz",
    "description": "for fun",
    "socials": [
      {
        "name": "LinkedIn",
        "url": "https://www.linkedin.com/in/anakkalatuomas"
      },
      {
        "name": "GitHub",
        "url": "https://github.com/pomppa"
      },
    ],
  };

  const jsonString = JSON.stringify(personal, null, 2);

  return (
    <pre>
      <code>
        {jsonString}
      </code>
    </pre>
  );
}
