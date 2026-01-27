function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-500 text-sm py-4 px-8 text-center border-t border-gray-800 shadow-[0_-2px_4px_rgba(0,0,0,0.4)] mt-auto">
      <p className="my-1">
        &copy; {currentYear} Ily Flicks. All rights reserved.
      </p>
      <p className="my-1 flex items-center justify-center gap-1">
        Developed by
        <a
          href="https://ilyaslhouari.netlify.app/"
          target='_blank'
          rel="noopener noreferrer"
          className="
            relative
            inline-block
            px-1
            font-bold
            bg-clip-text text-transparent bg-ily-gradient
            transition-transform duration-300 ease-in-outx
            group
          "
        >
          ILYAS LHOUARI
          <span className="
            absolute
            left-0
            bottom-0
            w-full
            h-[1px]
            bg-ily-gradient
            transform
            scale-x-0
            origin-center
            transition-transform
            duration-300
            ease-out
            group-hover:scale-x-95"
          ></span>
        </a>
      </p>
    </footer>
  );
}

export default Footer;