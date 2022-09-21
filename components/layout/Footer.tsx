import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-dark-turquoise border-b-8 border-snake-green text-white print:text-dark-blue shadow-md xl:shadow-xl p-4 pb-2 print:pt-0 grid grid-cols-12 gap-8">
      <p className="max-w-none col-span-12 md:col-span-9">
        <strong>Web Accessibility ♥ Python</strong> – PyCon US 2021. Code
        MIT-licensed on GitHub (
        <a href="https://github.com/thibaudcolas/accessibility-loves-python">
          thibaudcolas/accessibility-loves-python
        </a>
        ). Text contents available as{" "}
        <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>.
        Emoji credits: <a href="https://github.com/mozilla/fxemoji">FxEmojis</a>
        . Live site hosted on <a href="https://vercel.com/">Vercel</a>. Link:{" "}
        <a href="https://thib.me/pycon-ftw">thib.me/pycon-ftw</a>.
        <br />
        Thank you to Nick, Dan, Jake, Helen, Kyle, Helen for their feedback.
      </p>
      <div className="flex-1 col-span-3 content-end flex flex-row items-end">
        <div>
          <span className="text-white print:text-gray-mid-dark">By&nbsp;</span>
          &nbsp;<a href="https://github.com/thibaudcolas">Thibaud&nbsp;Colas</a>
        </div>
        <div className="align-middle -mb-4 justify-self-end">
          <Image
            src="/illustrations/vector-tails.svg"
            alt=""
            width={64}
            height={64}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
