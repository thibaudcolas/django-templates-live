import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header
      className={`grid grid-cols-2 2xl:grid-cols-3 bg-dark-turquoise border-b-8 border-snake-green text-white print:text-dark-blue shadow-md xl:shadow-xl p-4 print:pt-0 print:pb-2`}
    >
      <h1 className="2xl:col-span-2">
        Web Accessibility ♥ Python
        <br className="2xl:hidden" />
        <span className="inline-block relative top-1 pe-2 ms-4 me-2">
          <Image src="/illustrations/snake.svg" alt="" width={48} height={48} />
        </span>
        <small className="text-pale-blue print:text-dark-turquoise font-serif">
          PyCon US 2021
        </small>
      </h1>
      <div className="grid grid-flow-col-dense text-pale-blue print:text-dark-turquoise">
        <nav className="flex gap-4 2xl:gap-8 2xl:justify-end items-baseline">
          <Link href="/#curlylint">
            <a className="print:hidden 2xl:hidden">Curlylint</a>
          </Link>
          <Link href="/#kontrasto">
            <a className="print:hidden 2xl:hidden">Kontrasto</a>
          </Link>
          {/* <Link href="/#why">
            <a className="print:hidden">Why</a>
          </Link> */}
          <span className="print:hidden 2xl:hidden">|</span>
          <span className="print:text-2xl print:font-bold">
            <span className="text-white print:text-gray-mid-dark">Link: </span>
            <a href="https://thib.me/pycon-ftw">thib.me/pycon-ftw</a>
          </span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
